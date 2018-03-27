import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { IUser } from '../../../shared/models/IUser';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
    private url: string;

    constructor(private http: Http) { 
        this.url = environment.url;
    }

    public createUser(user: IUser): Observable<IUser> {
        return this.http.post(`${this.url}/api/user`, user)
            .map(res => res.json())
            .catch(err => Observable.throw(err));
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
                return res;
            })
            .catch(res => {
                //return Observable.throw(err)
                return Observable.of(res);
            });
    }

}
