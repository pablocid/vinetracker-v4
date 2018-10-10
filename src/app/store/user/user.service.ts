import { Injectable } from '@angular/core';
import { UserStore } from './user.store';
import { StitchService } from '../../services/mongodb-stitch/mongodb-stitch.service';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private userStore: UserStore,
    private stitchS: StitchService
  ) {
    this.stitchS.isLoggedIn$.subscribe(x => {
      this.userStore.setState(s => {
        return { ...s, isLogin: x };
      });
    });
  }

  async auth(credentials: { email: string, password: string }) {

    try {
      await this.stitchS.auth(credentials);
      const userInfo = await this.stitchS.infoUser();
      // console.log('userInfo', userInfo);
      this.userStore.setState( state => {
        return {...state,  ...userInfo };
      });
    } catch (error) {
      this.stitchS.logout();
      throw error.message;
    }

  }

  logout() {
    this.stitchS.logout();
  }

}
