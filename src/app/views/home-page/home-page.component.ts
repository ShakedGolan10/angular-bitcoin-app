import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';
import { BitCoinService } from 'src/app/services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private bitcoinService: BitCoinService, private userService: UserService) { }

  subscription!: Subscription
  user$!: UserModel

  ngOnInit(): void {
    this.bitcoinRate = this.bitcoinService.getRate()
    this.userService.getUser()
    this.subscription = this.userService.user$.subscribe(user => { this.user$ = user })
  }



  bitcoinRate!: any



}

// constructor(private userService: UserService) { }
// subscription!: Subscription
// user$!: UserModel


// ngOnInit(): void {

//   this.userService.getUser()

//   this.subscription = this.userService.user$.subscribe(user => { this.user$ = user })
// }
