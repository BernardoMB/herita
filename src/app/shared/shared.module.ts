import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSimpleComponent } from './components/header-simple/header-simple.component';
import { MaterialComponentsModule } from '../material-components.module';

@NgModule({
  imports: [
    CommonModule,
    // Angular material components
    MaterialComponentsModule
  ],
  declarations: [HeaderSimpleComponent],
  exports: [
    HeaderSimpleComponent
  ]
})
export class SharedModule { }
