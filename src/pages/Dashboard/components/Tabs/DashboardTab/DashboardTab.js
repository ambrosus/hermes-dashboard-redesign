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
  getTimeRangeCountAggregateForOrganization,
  getTimeRangeCountAggregate,
  getTimeRangeCountForOrganization,
  getTimeRangeCount,
} from '../../../../../utils/analytisService';
import { debugLog } from '../../../../../utils/debugLog';
import { useLocation } from 'react-router-dom';
import { formattingGroup, getGroup, getStartEnd } from 'utils/helpers';

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
              JSON.parse(sessionStorage.getItem('user_account')).organization,
              display,
              start,
              end,
              getGroup(type),
            )
          : await getTimeRangeCount(display, start, end, getGroup(type));
      setTotal(totalCount.count);
      const timeSeries =
        pathname !== '/dashboard/node'
          ? await getTimeRangeCountAggregateForOrganization(
              JSON.parse(sessionStorage.getItem('user_account')).organization,
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
              backgroundColor: '#BFC9E0',
              hoverBackgroundColor: '#BFC9E0C2',
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
      console.log('in generateDiagram error', e);
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
      <div className="total-for-period">
        Total for the selected period: {total}
      </div>
      <div className="space-10" />
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
