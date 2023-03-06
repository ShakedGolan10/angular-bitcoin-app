import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { UserModel } from 'src/app/models/user-model';
import { EventBusService } from 'src/app/services/event-bus.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent {

  amount!: number
  @Input() contact !: Contact
  @Input() user !: UserModel
  @Output() updateMoves = new EventEmitter()


  constructor(private userService: UserService, private eventBus: EventBusService) { }


  onSendTransfer() {
    if (this.user.coins < this.amount) {
      this.eventBus.publish({ type: 'transfer-failed', data: { message: 'You dont have enough coins' } })
      this.amount = 0
    }
    else {
      this.userService.addMove(this.contact, this.amount)
      this.amount = 0
      this.updateMoves.emit()
    }

  }
}
