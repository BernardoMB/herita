import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { IUser } from 'shared/models/IUser';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    public createUser(user: IUser): Observable<IUser> {
        return this.http.post('http://localhost:300/api/user', user)
            .map(res => res.json())
            .catch(err => Observable.throw(err));
    }

    public updateUser(user: IUser): Observable<IUser> {
        return this.http.patch(`http://localhost:300/api/user/${user._id}`, user)
            .map(res => res.json())
            .catch(err => Observable.throw(err));
    }

    public deleteUser(user: IUser): Observable<string> {
        return this.http.delete(`http://localhost:300/api/user/${user._id}`)
            .map(res => res.json())
            .catch(err => Observable.throw(err));
    }

    public login(user: IUser): Observable<IUser> {
        console.log('Sending request');
        return this.http.post('http://localhost:300/api/users/login', user)
            .map(res => {
                console.log(res);
                return res;
            })
            .catch(err => Observable.throw(err));
    }

}
