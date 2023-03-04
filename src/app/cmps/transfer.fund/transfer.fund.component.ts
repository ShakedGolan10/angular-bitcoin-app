import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transfer.fund',
  templateUrl: './transfer.fund.component.html',
  styleUrls: ['./transfer.fund.component.scss']
})
export class TransferFundComponent {

  amount!: number
  @Input() contact !: Contact
  @Output() updateMoves = new EventEmitter()
  user !: UserModel

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user)
  }

  onSendTransfer() {
    this.userService.addMove(this.contact, this.amount)

    this.amount = 0
    this.updateMoves.emit()
  }
}
