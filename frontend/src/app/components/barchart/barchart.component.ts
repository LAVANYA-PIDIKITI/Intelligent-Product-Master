import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  chartOptions: any;

  ngOnInit() {
    axios.get<any>('http://127.0.0.1:3003/sprint-progress/6')
      .then(response => {
        const sprintData = response.data;

        this.chartOptions = {
          animationEnabled: true,
          axisY2: {
            title: "Activity Count",
            includeZero: true,
            labelFormatter: this.addSymbols
          },
          axisY: {
            title: "Number of Issues / Documents / Commits",
            includeZero: true,
            labelFormatter: this.addSymbols
          },
          legend: {
            cursor: "pointer",
            itemclick: (e: any) => {
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              } else {
                e.dataSeries.visible = true;
              }
              e.chart.render();
            }
          },
          data: [
            {
              type: "bar",
              showInLegend: true,
              legendText: "Sprint Progress",
              dataPoints: [
                { y: sprintData[0].remainingWork, label: sprintData[0].name }
              ]
            }
          ]
        };
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  addSymbols = (e: any) => {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
    if (order > suffixes.length - 1)
      order = suffixes.length - 1;
    var suffix = suffixes[order];
    return (e.value / Math.pow(1000, order) + suffix);
  }
}
