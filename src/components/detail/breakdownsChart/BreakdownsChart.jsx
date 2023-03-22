import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { LineElement, PointElement, LinearScale, CategoryScale, Chart, BarElement } from "chart.js";
import './BreakdownsChart.css';
import BreakdownsChartControls from "./breakdownsChartControls/BreakdownsChartControls";
import { Utils } from '../../../../src/helpers'

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function BreakdownsChart(props) {
  const [mode, setMode] = React.useState('dayOfWeek');
  const [chartData, setChartData] = React.useState({
    labels: [],
    datasets: [{
      id: 'amount',
      data: [],
      borderColor: 'rgba(50, 50, 200, 0.8)',
      tension: 0.3,
      pointStyle: false
    }]
  });

  // Initialize chart-js
  Chart.register(CategoryScale);
  Chart.register(LinearScale);
  Chart.register(PointElement);
  Chart.register(LineElement);
  Chart.register(BarElement);

  React.useEffect(() => {
    function generateChartData() {
      let labels = [];
      let amountData = [];

      if (mode === 'dayOfWeek') {
        for (let i = 0; i < 7; i++) {
          const breakdown = props.breakdowns.dayOfWeekBreakdowns.find(b => b.dayOfWeek === i + 1);
          labels.push(DAYS_OF_WEEK[i]);
          amountData.push(breakdown?.averageAmount ?? 0);
        }
      } else if (mode === 'dayOfMonth') {
        for (let i = 0; i < 31; i++) {
          const breakdown = props.breakdowns.dayOfMonthBreakdowns.find(b => b.dayOfMonth === i + 1);
          labels.push(i + 1);
          amountData.push(breakdown?.averageAmount ?? 0);
        }
      } else if (mode === 'month') {
        for (let i = 0; i < 12; i++) {
          const breakdown = props.breakdowns.monthBreakdowns.find(b => b.month === i + 1);
          const month = new Date();
          month.setMonth(i);
          labels.push(month.toLocaleString('en-us', { month: 'long' }));
          amountData.push(breakdown?.averageAmount ?? 0);
        }
      } else {
        Utils.log('error, mode should not equal: ' + mode);
      }
      setChartData({
        labels: labels,
        datasets: [{
          id: 'amount',
          data: amountData,
          backgroundColor: 'rgba(50, 50, 200, 0.8)',
          tension: 0.3,
          pointStyle: false
        }]
      });
    }
    generateChartData();
  }, [mode])

  return (
    <div>
      <div className="detail-chart-wrapper">
        <Bar datasetIdKey="id" data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
      <div className="detail-chart-controls-wrapper">
        <BreakdownsChartControls mode={mode} handleChangeMode={(mode) => setMode(mode)}/>
      </div>
    </div>
  );
}