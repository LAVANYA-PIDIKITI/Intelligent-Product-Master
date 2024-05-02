import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  chartOptions: any;

  ngOnInit() {
    axios.get<any>('http://127.0.0.1:3003/heatmap/KAN')
      .then(response => {
        const data = response.data.Unassigned;

        this.chartOptions = {
          series: [{
            name: "Tasks",
            data: Object.values(data)
          }],
          chart: {
            height: 350,
            type: "heatmap"
          },
          dataLabels: {
            enabled: false
          },
          colors: [
            "#F3B415",
            "#F27036"
          ],
          xaxis: {
            type: "category",
            categories: Object.keys(data)
          },
          grid: {
            padding: {
              right: 20
            }
          }
        };
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
