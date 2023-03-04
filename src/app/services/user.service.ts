import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { cradentials, emptyUser, Move, UserModel } from '../models/user-model';
import * as sjcl from 'sjcl'
import * as CryptoJS from 'crypto-js'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private key = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef');
  private iv = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef');


  private USER_STORAGE_KEY = 'users'
  private STORAGE_KEY_LOGGEDIN_USER = 'user'
  private _user$ = new Subject<any>
  public user$ = this._user$.asObservable()

  private _setUser(user: UserModel) {
    this._user$.next(user)
  }


  public checkLoggedinUser() {
    if (sessionStorage.length) {
      let user = sessionStorage.getItem(this.STORAGE_KEY_LOGGEDIN_USER)
      this._user$.next(JSON.parse(user!))
      console.log(this.user$)
    }
  }


  private getUsers() {
    return (this.loadFromStorage(this.USER_STORAGE_KEY)) ? this.loadFromStorage(this.USER_STORAGE_KEY) : []
  }

  public login(user: cradentials): void | Error {
    const users = this.getUsers()
    const loggedInUser = users.find(currUser => ((currUser.userName === user.userName) &&
      (CryptoJS.AES.decrypt(currUser.password, this.key, { iv: this.iv }).toString(CryptoJS.enc.Utf8) === user.password)))
    if (loggedInUser) {
      this.saveLocalUser(loggedInUser)
    }
    else {
      throw Error
    }
  }

  public logout() {
    this._user$.next(null)
    sessionStorage.clear()
  }
  public signup(user: emptyUser): any | void {
    let signupUser = user as any
    let users = this.getUsers()
    let checkIfUsernameTaken = users.find(currUser => currUser.userName === user.userName)
    if (!checkIfUsernameTaken) {
      signupUser = { ...signupUser, _id: this.makeId(), password: CryptoJS.AES.encrypt(signupUser.password, this.key, { iv: this.iv }).toString() }
      this.save(signupUser)
      this.saveLocalUser(signupUser)
    } else return Promise.reject('There is a user with that username')
  }

  public addMove(contact: Contact, amount: number) {
    const user: UserModel | any = this.user$
    const move: Move = {
      toId: contact._id,
      to: contact.name,
      at: Date.now(),
      amount: amount
    } as Move

    user.moves.push(move)
    user.coins -= amount
    this.saveLocalUser(user)
    this.save(user)
  }

  private saveLocalUser(user: UserModel) {
    sessionStorage.setItem(this.STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    this._setUser(user)
  }

  private save(user: emptyUser | UserModel): void {
    let users = this.getUsers()

    console.log(user)
    users.push(user)
    this.saveToStorage(this.USER_STORAGE_KEY, users)
    this.saveLocalUser(user)
  }

  saveToStorage(key: string, value: any) {
    const data: any = JSON.stringify(value) || null
    localStorage.setItem(key, data)
  }
  loadFromStorage(key: string): UserModel[] {
    let data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
  }

  makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }
}