import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
  public chartOptions: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://127.0.0.1:3003/version-release-trends/KAN')
      .subscribe(response => {
        const data = response.map((item: any) => ({
          x: new Date(item.releaseDate),
          y: item.resolvedIssuesCount
        }));

        this.chartOptions = {
          series: [{
            name: 'Resolved Issues Count',
            data: data
          }],
          chart: {
            height: 350,
            type: 'line'
          },
          xaxis: {
            type: 'datetime',
            labels: {
              format: 'dd MMM yyyy'
            }
          },
          yaxis: {
            title: {
              text: 'Resolved Issues Count'
            }
          }
        };
      });
  }
}
