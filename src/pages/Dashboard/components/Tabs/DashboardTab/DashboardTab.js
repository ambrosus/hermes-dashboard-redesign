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
  getTimestampSubDays,
  getTimestampSubHours,
  getTimestampSubMonths,
} from '../../../../../utils/datetime';
import {
  getTimeRangeCountAggregateForOrganization,
  getTimeRangeCountAggregate,
  getTimeRangeCountForOrganization,
  getTimeRangeCount,
} from '../../../../../utils/analytisService';
import { debugLog } from '../../../../../utils/debugLog';
import { useLocation } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const DashboardTab = () => {
  const { pathname } = useLocation();
  const [total, setTotal] = useState(null);
  const [display, setDisplay] = useState('asset');
  const [groupBy, setGroupBy] = useState('7d');
  const [data, setData] = useState(null);
  let Dlabels = [];
  let Ddata = [];

  useEffect(() => {
    generateDiagram(groupBy);
  }, [groupBy, display]);

  const formattingGroup = (type) => {
    switch (type) {
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
  const getGroup = (type) => {
    switch (type) {
      case '24h':
        return 'hour';
      case '12m':
        return 'month';
      default:
        return 'day';
    }
  };
  const getStartEnd = (type) => {
    let start = 0;
    let end = 0;

    switch (type) {
      case '24h':
        start = getTimestampSubHours(24);
        break;

      case '7d':
        start = getTimestampSubDays(7);
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

  const generateDiagram = async (type) => {
    debugLog('generateDiagram render');
    Dlabels = [];
    Ddata = [];
    try {
      const [start, end] = getStartEnd(type);
      //TODO sessionStorage.getItem('GET_ACCOUNT')
      const totalCount =
        pathname !== '/dashboard/node'
          ? await getTimeRangeCountForOrganization(
              9,
              display,
              start,
              end,
              getGroup(type),
            )
          : await getTimeRangeCount(display, start, end, getGroup(type));
      console.log('totalCount', totalCount.count);
      setTotal(totalCount.count);
      const timeSeries =
        pathname !== '/dashboard/node'
          ? await getTimeRangeCountAggregateForOrganization(
              9,
              display,
              start,
              end,
              getGroup(type),
            )
          : await getTimeRangeCountAggregate(
              display,
              start,
              end,
              getGroup(type),
            );

      timeSeries.count.map((stat) => {
        Dlabels.push(
          moment(stat.timestamp * 1000).format(formattingGroup(type)),
        );
        Ddata.push(stat.count);
      });

      setData({
        data: {
          labels: Dlabels,
          datasets: [
            {
              data: Ddata,
              backgroundColor: '#4A38AE',
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
            },
            scales: {
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
      });
    } catch (e) {
      alert('in generateDiagram error', e);
    }
  };
  return (
    <div className="dashboard-tab">
      <div className="organization-container__heading">Dashboard</div>
      <TabOptions
        type={display}
        setType={setDisplay}
        period={groupBy}
        setPeriod={setGroupBy}
      />
      <div className="space-25" />
      {total && (
        <>
          <div className="total-for-period">
            Total for the selected period: {total}
          </div>
          <div className="space-10" />
        </>
      )}
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
