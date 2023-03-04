import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventBusService } from 'src/app/services/event-bus.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent {

  constructor(private eventBus: EventBusService, private userService: UserService) { }



  @Output() close = new EventEmitter()

  login: boolean = true
  errorMsg: string = ''

  onCloseModal(ev: MouseEvent) {
    ev.stopPropagation()
    this.close.emit()
  }

  onLogin(form: NgForm) {
    console.log(form.value)
    this.eventBus.publish({ type: 'login', data: { message: 'you\'ve loggedin' } })
    this.userService.login(form.value)
    form.reset()
  }

  onSignup(form: NgForm) {
    console.log(form.value)
    if (form.value.password !== form.value.passwordValidate) {
      this.errorMsg = 'Your passwords dont match! try again'
    } else {
      this.errorMsg = ''
      delete form.value.passwordValidate
      this.userService.signup(form.value)
      form.reset()
    }
  }

  changeState() {
    this.login = !this.login
  }


}
