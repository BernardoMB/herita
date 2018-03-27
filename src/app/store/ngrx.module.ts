import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/app-reducer';
import { EffectsModule } from '@ngrx/effects';
import { TestEffectService } from './effects/test-effect.service';
import { UserEffectService } from './effects/user-effect.service';
import { CookieService, CookieOptionsProvider } from 'ngx-cookie';

@NgModule({
    declarations: [ ],
    imports: [
        // Register reducers
        StoreModule.forRoot(reducers),
        // Register effects
        EffectsModule.forRoot([
            TestEffectService,
            UserEffectService
        ])
    ],
    providers: [],
    exports: [
        StoreModule,
        EffectsModule
    ]
})
export class NgRxModule {}
