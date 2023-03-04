import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs';
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

  onCloseModal(ev: MouseEvent | void) {
    ev?.stopPropagation()
    this.close.emit()
  }

  async onLogin(form: NgForm) {
    try {
      this.userService.login(form.value)
      form.reset()
      this.eventBus.publish({ type: 'login', data: { message: 'you\'ve loggedin' } })
      this.onCloseModal()
    } catch (err) {
      this.eventBus.publish({ type: 'login', data: { message: 'the password or username is incorrect' } })
      this.errorMsg = 'Incorrect username or password'
      setTimeout(() => {
        this.errorMsg = ''
      }, 2500);
    }

  }

  onSignup(form: NgForm) {
    if (form.value.password !== form.value.passwordValidate) {
      this.errorMsg = 'Your passwords dont match! try again'
      setTimeout(() => {
        this.errorMsg = ''
      }, 2500);
      return
    }
    if (!this.userService.checkIfUsernameTaken(form.value.userName)) {
      this.errorMsg = 'Sorry, this username is already taken'
      setTimeout(() => {
        this.errorMsg = ''
      }, 2500);
      return
    }

    this.errorMsg = ''
    delete form.value.passwordValidate
    this.userService.signup(form.value)
    form.reset()
    this.onCloseModal()
  }

  changeState() {
    this.login = !this.login
  }


}
