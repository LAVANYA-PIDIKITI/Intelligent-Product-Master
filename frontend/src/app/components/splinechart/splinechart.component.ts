import { Component } from '@angular/core';

@Component({
	selector: 'app-splinechart',
	templateUrl: './splinechart.component.html',
	styleUrls: ['./splinechart.component.css']
  })
  export class SplinechartComponent {
  chartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    axisX: {
      title: "Month",
      interval: 1,
      intervalType: "month",
      valueFormatString: "MMM YYYY"
    },
    axisY: {
      title: "Number of Bugs Fixed",
      minimum: 0,
      interval: 10
    },
    data: [{
      type: "spline",
      xValueFormatString: "MMM YYYY",
      yValueFormatString: "#",
      dataPoints: [
        { x: new Date(2022, 0, 1), y: 12 },
        { x: new Date(2022, 0, 15), y: 8 },
        { x: new Date(2022, 1, 1), y: 8 },
        { x: new Date(2022, 1, 15), y: 15 },
        { x: new Date(2022, 2, 1), y: 15 },
        { x: new Date(2022, 2, 15), y: 10 },
        { x: new Date(2022, 3, 1), y: 10 },
        { x: new Date(2022, 3, 15), y: 18 },
        { x: new Date(2022, 4, 1), y: 18 },
        { x: new Date(2022, 4, 15), y: 14 },
        { x: new Date(2022, 5, 1), y: 14 },
        { x: new Date(2022, 5, 15), y: 20 },
        { x: new Date(2022, 6, 1), y: 20 },
        { x: new Date(2022, 6, 15), y: 16 },
        { x: new Date(2022, 7, 1), y: 16 },
        { x: new Date(2022, 7, 15), y: 22 },
        { x: new Date(2022, 8, 1), y: 22 },
        { x: new Date(2022, 8, 15), y: 19 },
        { x: new Date(2022, 9, 1), y: 19 },
        { x: new Date(2022, 9, 15), y: 25 },
        { x: new Date(2022, 10, 1), y: 25 }
      ]
    }]
  };
}
