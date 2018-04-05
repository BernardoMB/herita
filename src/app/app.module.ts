import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// NgRx
import { NgRxModule } from './store/ngrx.module';
// Nice features
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ToastyModule } from 'ng2-toasty';
import { DndModule } from 'ng2-dnd'; // Drag and drop
import { Ng2CompleterModule } from 'ng2-completer';
import { CoreModule } from './core/core.module';
import { CookieModule } from 'ngx-cookie';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Angular material animations support
    BrowserAnimationsModule,
    //NoopAnimationsModule, // Uncoment this line if device is too slow to render animations properly
    // My modules
    CoreModule.forRoot(),
    // NgRx
    NgRxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }