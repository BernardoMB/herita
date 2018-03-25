import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IApplicationState } from './../../store/models/app-state';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<IApplicationState>, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select(state => state.uiState.user)
            .switchMap(currentUser => {
                if (!!currentUser) {
                    return Observable.of(true);
                }
                this.router.navigate(['/login']);
                return Observable.of(false);
            });
    }

}
