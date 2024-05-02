import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-columnchart',
  templateUrl: './columnchart.component.html',
  styleUrls: ['./columnchart.component.css']
})
export class ColumnchartComponent implements OnInit {
  chartOptions: any;

  ngOnInit() {
    axios.get('http://127.0.0.1:3003/bug-resolution-time/AG')
      .then(response => {
        const bugData = response.data;

        // Prepare data for dataPoints
        const dataPoints = bugData.map((bug: { key: any; resolutionTimeDays: string; }) => ({
          label: bug.key,
          y: parseFloat(bug.resolutionTimeDays)
        }));

        // Set chart options
        this.chartOptions = {
          title: {
            text: 'Bug Resolution Time'
          },
          animationEnabled: true,
          axisY: {
            title: 'Resolution Time (Days)'
          },
          data: [{
            type: 'column',
            dataPoints: dataPoints
          }]
        };
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
