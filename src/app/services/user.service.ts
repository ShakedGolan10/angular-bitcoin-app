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
    signupUser = { ...signupUser, _id: this.makeId(), password: CryptoJS.AES.encrypt(signupUser.password, this.key, { iv: this.iv }).toString(), moves: [], coins: +signupUser.coins }
    this.save(signupUser)
    this.saveLocalUser(signupUser)

  }

  public checkIfUsernameTaken(userName: string): boolean {
    let users = this.getUsers()
    let checkIfUsernameTaken = users.find(currUser => currUser.userName === userName)
    if (checkIfUsernameTaken) return false
    else return true
  }

  public addMove(contact: Contact, amount: number) {
    const user: UserModel | any = this.getUser()
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

  public getUser(): UserModel {
    return JSON.parse(sessionStorage.getItem(this.STORAGE_KEY_LOGGEDIN_USER) as string)
  }

  private saveLocalUser(user: UserModel) {
    sessionStorage.setItem(this.STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    this._setUser(user)
  }

  private save(user: UserModel): void {
    let users = this.getUsers()
    let userIdx = users.findIndex(currUser => user._id === currUser._id)
    if (userIdx !== -1) {
      users[userIdx] = user
      this.saveToStorage(this.USER_STORAGE_KEY, users)
    } else {
      users.push(user)
      this.saveToStorage(this.USER_STORAGE_KEY, users)
      this.saveLocalUser(user)
    }
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