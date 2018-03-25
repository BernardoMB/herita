import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// My components
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './containers/main/main.component';
import { LoginComponent } from './containers/login/login.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
// Material components
import { MaterialComponentsModule } from '../material-module.module';
// Services
import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './containers/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Material components
    MaterialComponentsModule,
    // My components
    SharedModule
  ],
  declarations: [
    MainComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent],
  exports: [
    MainComponent,
    LoginComponent,
    NotFoundComponent
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule ) {
    if (parentModule) {
      throw new Error ('Error, core module already exists.');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [AuthGuard]
    };
  }

}
