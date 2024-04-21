import { Component } from '@angular/core';
@Component({
  selector: 'app-areachart',
  templateUrl: './areachart.component.html',
  styleUrl: './areachart.component.css'
})
export class AreachartComponent {
  chartOptions = {
    animationEnabled: true,
    axisX: {
      interval: 30,
      intervalType: "day",
      valueFormatString: "D MMM",
      labelFontColor: "rgb(0,75,141)",
      minimum: new Date(2022, 0, 1) // Start date of IPM usage
    },
    axisY: {
      title: "Number of Tasks",
      interlacedColor: "#EBF2FA",
      tickColor: "azure",
      titleFontColor: "#4f81bc",
      valueFormatString: "#,###"
    },
    data: [{ 
      name: 'Tasks Completed',
      type: "area",
      markerSize: 8,
      dataPoints: [
        { x: new Date(2022, 0, 1), y: 0 },
        { x: new Date(2022, 3, 1), y: 5 },
        { x: new Date(2022, 6, 1), y: 15 },
        { x: new Date(2022, 9, 1), y: 30 },
        { x: new Date(2023, 0, 1), y: 35 },
        { x: new Date(2023, 3, 1), y: 40 },
        { x: new Date(2023, 6, 1), y: 45 },
        { x: new Date(2023, 9, 1), y: 56 }
      ]
    }]
  };
}