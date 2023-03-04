import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../models/user-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) { }
  authModal: boolean = false
  subscription!: Subscription
  user$!: UserModel

  onOpenModal() {
    this.authModal = true
  }
  onCloseModal() {
    this.authModal = false
  }

  onLogout() {
    this.userService.logout()
  }

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe(user => this.user$ = user)
  }
}
