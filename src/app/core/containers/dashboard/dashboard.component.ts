import { Component, OnInit, ElementRef } from '@angular/core';
import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../../../../shared/models/IUser';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public chart = []; // This will hold our chart info
  public chart2 = []; // This will hold our chart info

  public user: Observable<IUser>;
  public userid;

  constructor(
    private elementRef: ElementRef,
    private store: Store<IApplicationState>,
  ) {
    this.user = this.store.select(state => state.uiState.user);
    this.user.subscribe((user: IUser) => {
      if (user) {
        this.userid = user._id;
      }
    });
  }

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fafafa';
    setTimeout(() => {
      var ctx = document.getElementById("canvas");
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });

      var ctx2 = document.getElementById("canvas2");
      var data2 = {
        datasets: [{
          data: [10, 20, 30],
          backgroundColor: ['rgba(255,99,132,.3)', 'rgba(54,162,235,.3)', 'rgba(255,205,86,.3)'],
          borderColor: ['rgba(255,99,132,1)','rgba(54,162,235,1)','rgba(255,205,86,1)']
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ]
      };
      // For a pie chart
      var myPieChart = new Chart(ctx2, {
        type: 'pie',
        data: data2,
        options: {}
      });

    }, 1);
  }

}
