import './polyfills.ts';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/takeLast';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/zip';

// Angular Material gestures suppot
import 'hammerjs';

import { AppModule } from './app/app.module';
import { Observable } from 'rxjs/Observable';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const debuggerOn = !environment.production;

Observable.prototype.debug = function(message: string) {
    return this.do(
        nextValue => {
            if (debuggerOn) {
                console.log(message, nextValue)
            }
        },
        error => {
            if (debuggerOn) {
                console.error(message, error)
            }
        },
        () => {
            if (debuggerOn) {
                console.error("Observable completed - ", message)
            }
        }
    );
};

declare module 'rxjs/Observable' {
    interface Observable<T> {
        debug: (...any) => Observable<T>
    }
}

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
