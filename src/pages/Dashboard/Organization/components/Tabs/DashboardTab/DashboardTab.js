import React from 'react';
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
      display: true,
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

export const data = {
  labels: labels.map((month) => month.month),
  datasets: [
    {
      label: 'Label',
      data: labels.map((month) => {
        console.log(faker.datatype.number({ min: 0, max: month.days }));
        return faker.datatype.number({ min: 0, max: month.days });
      }),
      backgroundColor: '#4A38AE',
    },
  ],
};

const DashboardTab = () => (
  <div className="dashboard-tab">
    <div className="organization-container__heading">DashboardTab</div>
    <div className="dashboard-tab__options">
      <div className="sort-by-type">
        <button type="button">Assets</button>
        <button type="button">Events</button>
      </div>
      <div className="sort-by-period">
        <button type="button">Day</button>
        <button type="button">Week</button>
        <button type="button">Month</button>
        <button type="button">Year</button>
      </div>
    </div>
    <div>
      {' '}
      <Bar options={options} data={data} />
    </div>
  </div>
);

export default DashboardTab;
