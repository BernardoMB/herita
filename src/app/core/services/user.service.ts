import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { IUser } from '../../../shared/models/IUser';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
    private url: string;

    // Subject nextea cosas
    public passLoginError = new Subject<[string, number]>();

    constructor(private http: Http) { 
        this.url = environment.url;
    }

    public createUser(user: IUser): Observable<IUser> {
        console.log('User service: about to post user', user);
        return this.http.post(`${this.url}/api/user`, user)
            .map((response) => {
                // response.status 200
                console.log(`User service: response status ${response.status}`);
                // TODO: manipulate response
                const user = {

                }
                return null;
            }).catch(responseBadStatus => {
                console.log(`User service: response status ${responseBadStatus.status}`);
                // TODO: manipulate response
                const err = 'Pene';
                return Observable.throw(err);
            });
    }

    public updateUser(user: IUser): Observable<IUser> {
        return this.http.patch(`${this.url}/api/user/${user._id}`, user)
            .map(res => res.json())
            .catch(err => Observable.throw(err));
    }

    public deleteUser(user: IUser): Observable<string> {
        return this.http.delete(`${this.url}/api/user/${user._id}`)
            .map(res => res.json())
            .catch(err => Observable.throw(err));
    }

    public login(credentials: { username: string, password: string}): Observable<any> {
        return this.http.post(`${this.url}/api/users/login`, credentials)
            .map(res => {
                // response.status 200
                console.log(`User service: response status ${res.status}`);
                return res; // Already an observable.
            })
            .catch(res => {
                // response.status not 200
                console.log(`User service: response status ${res.status}`);
                this.passLoginError.next([res._body, 1]);
                return Observable.of(res); // Conduce al map del effect
                //return Observable.throw(res); // Conduce al catch del effect
            });
    }

}
