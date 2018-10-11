import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UserStore, UserState } from './user.store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {

  constructor(protected store: UserStore) {
    super(store);
  }

  public isLogged(): Observable<boolean> {
    return this.select(s => s.isLogin);
  }

  public userEmail(): Observable<string> {
    return this.select(s => s.email);
  }

}
