import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './core/containers/main/main.component';
import { LoginComponent } from './core/containers/login/login.component';
import { RegisterComponent } from './core/containers/register/register.component';
import { NotFoundComponent } from './core/containers/not-found/not-found.component';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
