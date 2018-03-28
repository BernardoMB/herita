import { Component, OnInit } from '@angular/core';
import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'pf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public userLoggedIn: boolean = false;

  constructor(private store: Store<IApplicationState>) {
    this.store.select(state => state.uiState.user).subscribe(user => {
      if (user) this.userLoggedIn = true;
    });
  }

  ngOnInit() {
  }

}
