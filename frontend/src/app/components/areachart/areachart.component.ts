import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-areachart',
  templateUrl: './areachart.component.html',
  styleUrls: ['./areachart.component.css']
})
export class AreachartComponent implements OnInit {
  public chartOptions: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://127.0.0.1:3003/issues-created-over-time/KAN')
      .subscribe(response => {
        const labels = response.labels;
        const data = response.data;

        this.chartOptions = {
          series: [
            {
              name: 'Tasks Created',
              data: data
            }
          ],
          chart: {
            height: 350,
            type: 'area'
          },
          xaxis: {
            categories: labels,
          }
        };
      });
  }
}
