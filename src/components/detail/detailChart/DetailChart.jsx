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
      pointStyle: false,
      pointHitRadius: 1000
    }]
  });

  // Initialize chart-js
  Chart.register(CategoryScale);
  Chart.register(LinearScale);
  Chart.register(PointElement);
  Chart.register(LineElement);

  React.useEffect(() => {
    function generateChartData() {

      let labels = [];
      let grossData = [];
      let netData = [];
  
      // Todo: This is wrong. This simply ignores 6/7 days. Instead I want to combine every week / month into one data unit.
      // This looks like a job for all those leetcode algorithms I've been (not) doing (lately).
      const span = (mode === 'week' ? 7 : 1);

      for (let i = 0; i < props.report.reports.length; i+=span) {
        const report = props.report.reports[i];
        labels.push(report.date.slice(0, 10));
        let gross = 0;
        let expense = 0;
        for (let j = 0; j < report.earnings.length; j++) {
          gross += report.earnings[j].amount;
        }
        grossData.push(gross);
        netData.push(gross - expense);
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
          }
        ]
      });
    }
    generateChartData();
  }, [mode]);

  React.useEffect(() => { console.log(chartData) }, [chartData]);

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