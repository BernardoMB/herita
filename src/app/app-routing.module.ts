import { NgModule } from '@angular/core';
import { AuthGuard } from './core/services/auth.guard';
import { Routes, RouterModule } from '@angular/router';
//#region Compoents  
  import { MainComponent } from './core/containers/main/main.component';
  import { LoginComponent } from './core/containers/login/login.component';
  import { SignUpComponent } from './core/containers/sign-up/sign-up.component';
  import { NotFoundComponent } from './core/containers/not-found/not-found.component';
//#endregion
//#region Children components
  import { DashboardComponent } from './core/containers/dashboard/dashboard.component';
//#endregion

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard], children: [
    { path: '', component: DashboardComponent },
    { path: 'transactions', loadChildren: 'app/transactions/transactions.module#TransactionsModule' },
    { path: 'budgets', loadChildren: 'app/budgets/budgets.module#BudgetsModule' }
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
