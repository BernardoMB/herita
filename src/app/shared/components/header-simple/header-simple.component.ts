import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-simple',
  templateUrl: './header-simple.component.html',
  styleUrls: ['./header-simple.component.scss']
})
export class HeaderSimpleComponent implements OnInit {

  public showExternalContent: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  public onGoToHomePage(): void {
    this.router.navigate(['/']);   
  }

  public toggleExternalContent(): void {
    if (this.showExternalContent) {
      this.showExternalContent = false;
    } else {
      this.showExternalContent = true;
    }
  }

}
