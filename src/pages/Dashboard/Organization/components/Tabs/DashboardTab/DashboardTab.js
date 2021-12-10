import React, { useState } from 'react';
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
import faker from 'faker';
import Utils from 'moment';

import TabOptions from './components/TabOptions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
};
const labels = [
  { month: 'January', days: faker.datatype.number({ min: 0, max: 31 }) },
  { month: 'February', days: faker.datatype.number({ min: 0, max: 28 }) },
  { month: 'March', days: faker.datatype.number({ min: 0, max: 31 }) },
  { month: 'April', days: faker.datatype.number({ min: 0, max: 30 }) },
  { month: 'May', days: faker.datatype.number({ min: 0, max: 31 }) },
  { month: 'June', days: faker.datatype.number({ min: 0, max: 30 }) },
  { month: 'July', days: faker.datatype.number({ min: 0, max: 31 }) },
  { month: 'August', days: faker.datatype.number({ min: 0, max: 31 }) },
  { month: 'September', days: faker.datatype.number({ min: 0, max: 30 }) },
  { month: 'October', days: faker.datatype.number({ min: 0, max: 31 }) },
  { month: 'November', days: faker.datatype.number({ min: 0, max: 30 }) },
  { month: 'December', days: faker.datatype.number({ min: 0, max: 31 }) },
];

const DashboardTab = () => {
  const [activePeriod, setActivePeriod] = useState('7d');
  const [groupBy, setGroupBy] = useState('7d');
  // group: ['24h', '7d', 'mtd', '28d', '12m'],
 const format=()=> {
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
  }
    const getGroup=()=> {
        switch (groupBy) {
            case '24h':
                return 'hour';
            case '12m':
                return 'month';
            default:
                return 'day';
        }
    }
  //mock
  const handlePeriod = (period) => {
    switch (period) {
      case '24h':
        return 1;
      case '7d':
        return 7;
      case '28d':
        return 30;
      case '12m':
        return 365;
    }
  };

  const data = {
    labels: labels.map((month) => month.month),
    datasets: [
      {
        label: 'Assets',
        data: labels.map(() => {
          return faker.datatype.number({
            min: 0,
            max: handlePeriod(activePeriod),
          });
        }),
        backgroundColor: '#4A38AE',
      },
      {
        label: 'Events',
        data: labels.map(() => {
          return faker.datatype.number({ min: 0, max:  handlePeriod(activePeriod)});
        }),
        backgroundColor: '#9dd58d',
      },
    ],
  };
  return (
    <div className="dashboard-tab">
      <div className="organization-container__heading">DashboardTab</div>
      <TabOptions period={activePeriod} setPeriod={setActivePeriod} />
      <div className="space-25" />
      <Bar
        options={options}
        data={data}
        style={{
          boxShadow: '0px 4px 12px rgba(55, 29, 199, 0.15)',
          borderRadius: 12,
          padding: 20,
        }}
      />
    </div>
  );
};

export default DashboardTab;
