import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { IUser } from '../../../shared/models/IUser';
import { environment } from '../../../environments/environment';
import { ILoginModel } from '../containers/login/login.component';
import { CookieService } from 'ngx-cookie';
import * as moment from 'moment';

@Injectable()
export class UserService {
    private url: string;

    // Subject nextea cosas
    public passLoginError = new Subject<[string, number]>();
    public passSignUpError = new Subject<[string, number]>();

    constructor(private http: Http, private cookieService: CookieService) { 
        this.url = environment.url;
    }

    public login(credentials: ILoginModel): Observable<any> {
        return this.http.post(`${this.url}/api/users/login`, credentials)
            .map((response: any) => {
                // response.status 200
                console.log('User service: response status', response.status);
                const token = response.headers.get('x-auth');
                console.log('PENEEEE:', response.headers);
                console.log('User service: got token from server', token);
                console.log('User service: placing token in local storage');
                localStorage.setItem('x-auth', token);
                this.passLoginError.next(['', 0]); // 0: no error; 1: error
                const user: IUser = JSON.parse(response._body);
                console.log('Placing user cookie');
                this.cookieService.putObject('userId', user._id.toString(), {
                    expires: moment().hours(23).minute(59).second(59).toDate()
                });
                return user;
            })
            .catch(responseBadStatus => {
                // response.status other than 200
                console.log('User service: response status', responseBadStatus.status);
                const errmsg = responseBadStatus._body;
                this.passLoginError.next([errmsg, 1]);
                return Observable.throw(errmsg);
            });
    }

    public loginByIdAndToken(loginObject: { userId: string, token: string }): Observable<any> {
        return this.http.post(`${this.url}/api/users/loginByIdAndToken`, loginObject)
            .map((response: any) => {
                // response.status 200
                console.log('User service: response status', response.status);
                const token = response.headers.get('x-auth');
                console.log('User service: got token from server', token);
                console.log('User service: placing token in local storage');
                localStorage.setItem('x-auth', token);
                this.passLoginError.next(['', 0]); // 0: no error; 1: error
                const user: IUser = JSON.parse(response._body);
                console.log('Placing user cookie');
                this.cookieService.putObject('userId', user._id.toString(), {
                    expires: moment().hours(23).minute(59).second(59).toDate()
                });
                return user;
            })
            .catch(responseBadStatus => {
                // response.status other than 200
                console.log('User service: response status', responseBadStatus.status);
                const errmsg = responseBadStatus._body;
                this.passLoginError.next([errmsg, 1]);
                return Observable.throw(errmsg);
            });
    }

    public logout(user: IUser): Observable<string> {
        return this.http.delete(`${this.url}/api/user/me/token/${user._id}`)
            .map(res => res.json())
            .catch(err => Observable.throw(err));
    }

    public createUser(user: IUser): Observable<IUser> {
        console.log('User service: about to post user', user);
        return this.http.post(`${this.url}/api/user`, user)
            .map((response: any) => {
                // response.status 200
                console.log('User service: response status:', response.status);
                this.passSignUpError.next(['', 0]); // Se nextea 0 porque no hay error.
                const createdUser: IUser = JSON.parse(response._body);
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
            .map(res => res.json())
            .catch(err => Observable.throw(err));
    }
    
}
