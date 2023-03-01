import { Component, OnInit } from '@angular/core';
import { EventBusService } from 'src/app/services/event-bus.service';

@Component({
  selector: 'user-msg',
  templateUrl: './user-msg.component.html',
  styleUrls: ['./user-msg.component.scss']
})
export class UserMsgComponent implements OnInit {

  constructor(private eventBus: EventBusService) { }

  message!: string

  ngOnInit(): void {
    this.eventBus.subscribe(event => {
      if (event.data.message) {
        this.message = event.data.message
        setTimeout(() => {
          this.message = ''
        }, 1500);
      }
    })
  }
}
