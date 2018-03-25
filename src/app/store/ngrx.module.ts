import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers/app-reducer';
import { EffectsModule } from '@ngrx/effects';
import { TestEffectService } from './effects/test-effect.service';

@NgModule({
    declarations: [ ],
    imports: [
        // Register reducers
        StoreModule.forRoot(reducers),
        // Register effects
        EffectsModule.forRoot([
            TestEffectService
        ])
    ],
    providers: [],
    exports: [
        StoreModule,
        EffectsModule
    ]
})
export class NgRxModule {}
