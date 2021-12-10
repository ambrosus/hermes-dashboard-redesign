import React, { useEffect, useState } from 'react';
/*eslint-disable*/
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';

import TabOptions from './components/TabOptions';
import {
  getTimestamp,
  getTimestampMonthStart,
  getTimestampSubDays,
  getTimestampSubHours,
  getTimestampSubMonths,
} from '../../../../../../utils/datetime';
import { getTimeRangeCountAggregateForOrganization } from '../../../../../../utils/analytisService';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const DashboardTab = () => {
  const [display, setDisplay] = useState('asset');
  const [groupBy, setGroupBy] = useState('24h');
  const [data, setData] = useState(null);
  const isAuth = useSelector((state) => state.auth.isAuth);
  let Dlabels = [];
  let Ddata = [];
  const [timeSeries, setTimeSeries] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    if (isAuth) {
      generateDiagram();
    }
  }, [timeSeries]);

  const formattingGroup = () => {
    switch (groupBy) {
      case '24h':
        return 'HH';
      case '7d':
        return 'DD-MM';
      case '28d':
        return 'DD-MM';
      case '12m':
        return 'MMMM';
      default:
        return 'Y-MM-DD-HH';
    }
  };
  const getGroup = () => {
    switch (groupBy) {
      case '24h':
        return 'hour';
      case '12m':
        return 'month';
      default:
        return 'day';
    }
  };
  const getStartEnd = () => {
    let start = 0;
    let end = 0;

    switch (groupBy) {
      case '24h':
        start = getTimestampSubHours(24);
        break;

      case '7d':
        start = getTimestampSubDays(7);
        break;

      case 'mtd':
        start = getTimestampMonthStart();
        break;

      case '28d':
        start = getTimestampSubDays(28);
        break;

      case '12m':
        start = getTimestampSubMonths(12);
        break;
    }

    end = getTimestamp();

    return [start, end];
  };
  const generateDiagram = async () => {
    Dlabels = [];
    Ddata = [];
    try {
      const [start, end] = getStartEnd();
      //TODO sessionStorage.getItem('GET_ACCOUNT')
      const kakoitoTimeSeries = await getTimeRangeCountAggregateForOrganization(
        9,
        display,
        start,
        end,
        getGroup,
      );
      kakoitoTimeSeries.count.map((stat) => {
        Dlabels.push(moment(stat.timestamp * 1000).format(formattingGroup()));
        Ddata.push(stat.count);
      });
      setTimeSeries({
        labels: Dlabels,
        data: Ddata,
      });
      const canvasData = {
        data: {
          labels: timeSeries.labels,
          datasets: [
            {
              data: timeSeries.data,
              backgroundColor: '#bed0ef',
              hoverBackgroundColor: '#bed0ef',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
              text: 'Chart.js Bar Chart',
            },
            scales: {
              xAxes: [
                {
                  maxBarThickness: 5,
                  gridLines: {
                    display: false,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          },
        },
      };
      if (canvasData) {
        setData(canvasData);
        Dlabels = [];
        Ddata = [];
      }
    } catch (e) {
      alert('in generateDiagram error', e);
    }
  };
  return (
    <div className="dashboard-tab">
      <div className="organization-container__heading">DashboardTab</div>
      <TabOptions
        type={display}
        setType={setDisplay}
        period={groupBy}
        setPeriod={setGroupBy}
      />
      <div className="space-25" />
      {data && (
        <Bar
          data={data.data}
          options={data.options}
          style={{
            boxShadow: '0px 4px 12px rgba(55, 29, 199, 0.15)',
            borderRadius: 12,
            padding: 20,
          }}
        />
      )}
    </div>
  );
};

export default DashboardTab;
