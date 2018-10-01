import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../../../shared/models/IUser';
import { environment } from '../../../environments/environment';
import { ILoginModel } from '../containers/login/login.component';
import { CookieService } from 'ngx-cookie';
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
    private url: string;

    // Subject nextea cosas
    public passLoginError = new Subject<[string, number]>();
    public passSignUpError = new Subject<[string, number]>();

    public expirationTime = moment().hours(23).minute(59).second(59).toDate();

    constructor(private http: HttpClient, private cookieService: CookieService) {
        this.url = environment.url;
    }

    public login(credentials: ILoginModel): Observable<IUser> {
        return this.http.post<{ user: IUser }>(`${this.url}/api/users/login`, credentials, {
            observe: 'response'
        }).map(response => {
            // response.status 200
            console.log('User service: response status', response.status);
            const token = response.headers.get('x-auth');
            console.log('User service: got token from server', token);
            console.log('User service: placing token in local storage');
            localStorage.setItem('x-auth', token);
            console.log('x-auth in local storage', localStorage.getItem('x-auth'));
            this.passLoginError.next(['', 0]); // 0: no error; 1: error
            const user: IUser = response.body.user;
            console.log('Placing userId cookie');
            this.cookieService.putObject('userId', user._id.toString(), {
                expires: this.expirationTime
            });
            return user;
        }).catch(responseBadStatus => {
            // response.status other than 200
            console.log('User service: response status', responseBadStatus.status);
            const errmsg = responseBadStatus._body;
            this.passLoginError.next([errmsg, 1]);
            return Observable.throw(errmsg);
        });
    }

    public loginByIdAndToken(loginObject: { userId: string, token: string }): Observable<IUser> {
        return this.http.post<{ user: IUser }>(`${this.url}/api/users/loginByIdAndToken`, loginObject, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-auth': loginObject.token
            }),
            observe: 'response'
        }).map(response => {
            // response.status 200
            console.log('User service: response status', response.status);
            const token = response.headers.get('x-auth');
            console.log('User service: got token from server', token);
            console.log('User service: placing token in local storage');
            localStorage.setItem('x-auth', token);
            this.passLoginError.next(['', 0]); // 0: no error; 1: error
            const user: IUser = response.body.user;
            console.log('Placing userId cookie');
            this.cookieService.putObject('userId', user._id.toString(), {
                expires: this.expirationTime
            });
            return user;
        }).catch(responseBadStatus => {
            // response.status other than 200
            console.log('User service: response status', responseBadStatus.status);
            const errmsg = responseBadStatus._body;
            this.passLoginError.next([errmsg, 1]);
            return Observable.throw(errmsg);
        });
    }

    public logout(user: IUser): Observable<any> {
        const token = localStorage.getItem('x-auth');
        return this.http.delete(`${this.url}/api/user/me/token/${user._id}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-auth': token
            })
        }).map(response => response).catch(err => Observable.throw(err));
    }

    public createUser(user: IUser): Observable<IUser> {
        return this.http.post<{ user: IUser }>(`${this.url}/api/user`, user, {
            observe: 'response'
        }).map(response => {
            // response.status 200
            console.log('User service: response status:', response.status);
            this.passSignUpError.next(['', 0]); // 0: no error; 1: error
            const createdUser = response.body.user;
            return createdUser;
        }).catch(responseBadStatus => {
            // response.status other than 200
            console.log('User service: bad response status:', responseBadStatus.status);
            const errmsg = responseBadStatus._body;
            console.log('User service: Error message:', errmsg);
            this.passSignUpError.next([errmsg, 1]);
            return Observable.throw(errmsg);
        });
    }

    public updateUser(user: IUser): Observable<IUser> {
        return this.http.patch(`${this.url}/api/user/${user._id}`, user)
            .map(res => res)
            .catch(err => Observable.throw(err));
    }

}
