import { NgModule } from '@angular/core';
// Material components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports: [
    // Material components
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatChipsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule
  ],
  declarations: [],
  exports: [
    // Material components
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatChipsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule
  ]
})
export class MaterialComponentsModule { }
