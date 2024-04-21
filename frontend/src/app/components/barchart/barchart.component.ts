import { Component } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent {
  addSymbols = (e: any) => {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
    if (order > suffixes.length - 1)
      order = suffixes.length - 1;
    var suffix = suffixes[order];
    return (e.value / Math.pow(1000, order) + suffix);
  }

  chartOptions = {
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
        legendText: "Issues in JIRA",
        dataPoints: [
          { y: 1500, label: "To Do" },
          { y: 800, label: "In Progress" },
          { y: 1200, label: "Done" }
        ]
      },
      {
        type: "bar",
        axisYType: "secondary",
        showInLegend: true,
        legendText: "Documents in Confluence",
        dataPoints: [
          { y: 2500, label: "Wiki Pages" },
          { y: 1800, label: "Blog Posts" },
          { y: 1000, label: "Attachments" }
        ]
      },
      {
        type: "bar",
        axisYType: "secondary",
        showInLegend: true,
        legendText: "Commits in Bitbucket",
        dataPoints: [
          { y: 3000, label: "Master Branch" },
          { y: 1500, label: "Feature Branches" }
        ]
      }
    ]
  };
}
