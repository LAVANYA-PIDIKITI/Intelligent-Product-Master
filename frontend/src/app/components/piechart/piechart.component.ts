import { Component } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent {
  chartOptions = {
    animationEnabled: true,
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}%",
      yValueFormatString: "#,###.##'%'",
      dataPoints: [
        { y: 40, name: "Development" },
        { y: 20, name: "Testing" },
        { y: 15, name: "Design" },
        { y: 10, name: "Documentation" },
        { y: 15, name: "Other" } // Other activities like meetings, planning, etc.
      ]
    }]
  };
}
