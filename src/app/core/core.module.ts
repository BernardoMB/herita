import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// My components
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './containers/main/main.component';
import { LoginComponent } from './containers/login/login.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
// Material components
import { MaterialComponentsModule } from '../material-components.module';
// Services
import { AuthGuard } from './services/auth.guard';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
// Nice features
import { CookieModule } from 'ngx-cookie';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ToastyModule } from 'ng2-toasty';
import { DndModule } from 'ng2-dnd';
import { Ng2CompleterModule } from 'ng2-completer';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Material components
    MaterialComponentsModule,
    // My components
    SharedModule,
    // Nice features
    CookieModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    ToastyModule.forRoot(),
    DndModule.forRoot(),
    Ng2CompleterModule,
  ],
  declarations: [
    MainComponent,
    LoginComponent,
    NotFoundComponent,
    SignUpComponent],
  exports: [
    MainComponent,
    LoginComponent,
    NotFoundComponent,
    // Nice features
    CookieModule,
    SlimLoadingBarModule,
    ToastyModule,
    DndModule,
    Ng2CompleterModule
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
      providers: [AuthGuard, UserService]
    };
  }

}
