import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user-model';

const USER: UserModel = {
  _id: 'u01',
  name: 'Ochoa Hyde',
  coins: 100,
  moves: []
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private _user$ = new BehaviorSubject<UserModel>({ _id: '', name: '', coins: 0, moves: [] })
  public user$ = this._user$.asObservable()

  private _setUser(user: UserModel) {
    this._user$.next(user)
  }

  public getUser() {
    this._setUser(USER)

  }

}