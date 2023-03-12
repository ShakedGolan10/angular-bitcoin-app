import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { onInitEffects } from '@ngrx/effects/src/lifecycle_hooks';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';
import { EventBusService } from 'src/app/services/event-bus.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  constructor(private userService: UserService, private router: Router, private eventBus: EventBusService) { }
  authModal: boolean = false
  subscription!: Subscription
  user$!: UserModel

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe(user => this.user$ = user)
    this.userService.checkLoggedinUser()
    console.log(this.user$)
  }
  onOpenModal() {
    this.authModal = true
  }
  onCloseModal() {
    this.authModal = false
  }

  onLogout() {
    this.userService.logout()
    this.router.navigateByUrl('/')
  }

  goToContacts() {
    if (this.user$) this.router.navigateByUrl('/contact')
    else this.eventBus.publish({ type: 'not-login', data: { message: 'you\'ve got to login first!' } })
  }
}
