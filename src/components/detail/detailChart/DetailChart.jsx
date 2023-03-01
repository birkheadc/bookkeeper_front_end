import React from "react";
import { Line } from "react-chartjs-2";
import { LineElement, PointElement, LinearScale, CategoryScale, Chart } from "chart.js";
import './DetailChart.css';
import DetailChartControls from "./detailChartControls/DetailChartControls";

export default function DetailChart(props) {

  const [mode, setMode] = React.useState('day');
  const [chartData, setChartData] = React.useState({
    labels: [],
    datasets: [{
      id: 'gross',
      data: [],
      borderColor: 'rgba(50, 50, 200, 0.8)',
      tension: 0.3,
      pointStyle: false
    }, {
      id: 'net',
      data: [],
      borderColor: 'rgba(0, 0, 0, 0.8)',
      tension: 0.3,
      pointStyle: false
    }]
  });

  // Initialize chart-js
  Chart.register(CategoryScale);
  Chart.register(LinearScale);
  Chart.register(PointElement);
  Chart.register(LineElement);

  React.useEffect(() => {
    // The code ahead is a nightmare, turn back now if you value your life.
    function generateChartData() {

      let labels = [];
      let grossData = [];
      let netData = [];
  
      if (mode === 'month') {
        let currentMonth = new Date(props.report.reports[0].date).toLocaleString('default', { month: 'long' });
        let currentGross = 0;
        let currentExpense = 0;

        for (let i = 0; i < props.report.reports.length; i++) {
          const report = props.report.reports[i];
          const reportMonth = new Date(report.date).toLocaleString('default', { month: 'long' });
          if (reportMonth !== currentMonth || i === props.report.reports.length - 1) {
            labels.push(currentMonth + " '" + new Date(report.date).getFullYear().toString().slice(2));
            currentMonth = reportMonth;
            grossData.push(currentGross);
            netData.push(currentGross - currentExpense);
            currentGross = 0;
            currentExpense = 0;
          }
          for (let j = 0; j < report.earnings.length; j++) {
            currentGross += report.earnings[j].amount;
          }
          for (let j = 0; j < report.expenses.length; j++) {
            currentExpense += report.expenses[j].amount;
          }
        }

        setChartData({
          labels: labels,
          datasets: [
            {
              id: 'gross',
              data: grossData,
              borderColor: 'rgba(50, 50, 200, 0.8)',
              tension: 0.3,
              pointStyle: false
            },
            {
              id: 'net',
              data: netData,
              borderColor: 'rgba(0, 0, 0, 0.8)',
              tension: 0.3,
              pointStyle: false
            }
          ]
        });
        return;
      }


      const span = (mode === 'week' ? 7 : 1);

      let currentGross = 0;
      let currentExpense = 0;

      for (let i = 0; i < props.report.reports.length; i++) {
        const report = props.report.reports[i];
        for (let j = 0; j < report.earnings.length; j++) {
          currentGross += report.earnings[j].amount;
        }
        for (let j = 0; j < report.expenses.length; j++) {
          currentExpense += report.expenses[j].amount;
        }
        if ((i+1) % span === 0) {
          labels.push((mode === 'week' ? '~' : '') + report.date.slice(0, 10));
          grossData.push(currentGross);
          netData.push(currentGross - currentExpense);
          currentGross = 0;
          currentExpense = 0;
        }
      }
  
      setChartData({
        labels: labels,
        datasets: [
          {
            id: 'gross',
            data: grossData,
            borderColor: 'rgba(50, 50, 200, 0.8)',
            tension: 0.3,
            pointStyle: false,
            pointHitRadius: 1000
          },
          {
            id: 'net',
            data: netData,
            borderColor: 'rgba(0, 0, 0, 0.8)',
            tension: 0.3,
            pointStyle: false
          }
        ]
      });
    }
    generateChartData();
  }, [mode]);

  return (
    <div>
      <div className="detail-chart-wrapper">
        <Line datasetIdKey="id" data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
      <div className="detail-chart-controls-wrapper">
        <DetailChartControls mode={mode} handleChangeMode={(mode) => setMode(mode)}/>
      </div>
    </div>
  );
}