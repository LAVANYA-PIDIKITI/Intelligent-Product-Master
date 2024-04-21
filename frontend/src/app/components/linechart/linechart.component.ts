import { Component } from '@angular/core';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent {
  chartOptions = {
    animationEnabled: true,
    theme: "light2",
    axisX: {
      valueFormatString: "MMM",
      intervalType: "month",
      interval: 1
    },
    axisY: {
      title: "Feature Count",
      suffix: ""
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: function(e: any){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else{
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [
      {
        type:"line",
        name: "Features Developed",
        showInLegend: true,
        yValueFormatString: "#",
        dataPoints: [    
          { x: new Date(2021, 0, 1), y: 10 },
          { x: new Date(2021, 1, 1), y: 15 },
          { x: new Date(2021, 2, 1), y: 20 },
          { x: new Date(2021, 3, 1), y: 25 },
          { x: new Date(2021, 4, 1), y: 30 },
          { x: new Date(2021, 5, 1), y: 35 },
          { x: new Date(2021, 6, 1), y: 40 },
          { x: new Date(2021, 7, 1), y: 45 },
          { x: new Date(2021, 8, 1), y: 50 },
          { x: new Date(2021, 9, 1), y: 55 },
          { x: new Date(2021, 10, 1), y: 60 },
          { x: new Date(2021, 11, 1), y: 65 }
        ]
      }
    ]
  };
}
