import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../models/user-model';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { EventBusService } from '../services/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private eventBus: EventBusService) { }
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
    this.router.navigateByUrl('/')
  }

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe(user => this.user$ = user)
    this.userService.checkLoggedinUser()
  }

  goToContacts(ev: MouseEvent) {
    if (this.user$) this.router.navigateByUrl('/contact')
    else this.eventBus.publish({ type: 'not-login', data: { message: 'you\'ve got to login first!' } })
  }

}
