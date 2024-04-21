import { Component } from '@angular/core';

@Component({
  selector: 'app-pareto',
  templateUrl: './pareto.component.html',
  styleUrls: ['./pareto.component.css']
})
export class ParetoComponent {
  chart: any;
  
  getChartInstance(chart: object) {
    this.chart = chart;
    this.createPareto();
  }
 
  createPareto() {
    let dps = [];
    let chart = this.chart;
    let yValue, yTotal = 0, yPercent = 0;
    for(let i = 0;  i < chart.data[0].dataPoints.length;  i++)
      yTotal += chart.data[0].dataPoints[i].y;
      for(let i = 0;  i < chart.data[0].dataPoints.length;  i++){
        yValue = chart.data[0].dataPoints[i].y;
        yPercent += (yValue / yTotal * 100);
        dps.push({label: chart.data[0].dataPoints[i].label, y: yPercent});
      }
      chart.addTo("data",{type:"line", yValueFormatString: "0.##\"%\"", dataPoints: dps});
      chart.data[1].set("axisYType", "secondary", false);
      chart.axisY[0].set("maximum", Math.round(yTotal / 20) * 20);
      chart.axisY2[0].set("maximum", 100);
  }
 
  chartOptions = {
    theme: "light2",
    axisX: {
      labelAngle: 0
    },
    axisY: {
      title: "Count",
      lineColor: "#6d78ad",
      tickColor: "#6d78ad",
      labelFontColor: "#6d78ad",
      gridThickness: 0,
      lineThickness: 1
    },
    axisY2: {
      title: "Cumulative Percent",
      suffix: "%",
      gridThickness: 0,
      lineColor: "#51cda0",
      tickColor: "#51cda0",
      labelFontColor: "#51cda0",
      lineThickness: 1
    },
    data: [{
      dataPoints: [
        { label: "Bug Reports", y: 23 },
        { label: "Documentation Issues", y: 15 },
        { label: "Integration Problems", y: 11 },
        { label: "Performance Bottlenecks", y: 10 },
        { label: "Feature Requests", y: 7 },
        { label: "Security Vulnerabilities", y: 5 },
        { label: "User Interface Problems", y: 4 },
      ]
    }]
  }
}
