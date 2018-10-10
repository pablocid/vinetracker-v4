import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface UserState {
  id: string;
  email: string;
  pic: string;
  isLogin: boolean;
  role: string;
}

export function createInitialState(): UserState {
  return {
    id: undefined,
    email: undefined,
    pic: undefined,
    isLogin: false,
    role: undefined
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {

  constructor() {
    super(createInitialState());
  }

}

