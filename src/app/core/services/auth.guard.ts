import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IApplicationState } from './../../store/models/app-state';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<IApplicationState>, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select(state => state.uiState.user)
            .switchMap(currentUser => {
                if (!!currentUser) {
                    console.log('AuthGuard: Found user in uiState', currentUser);
                    console.log('AuthGuard: Enable requested route');
                    return Observable.of(true);
                }
                console.log('AuthGuard: No user in uiState');
                console.log('AuthGuard: Redirecting to login');
                this.router.navigate(['/login']);
                return Observable.of(false);
            });
    }

}
