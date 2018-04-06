import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetsComponent } from './containers/budgets.component';

@NgModule({
  imports: [
    CommonModule,
    BudgetsRoutingModule
  ],
  declarations: [BudgetsComponent]
})
export class BudgetsModule { }
