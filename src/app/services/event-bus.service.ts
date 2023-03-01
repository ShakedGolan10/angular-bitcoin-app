
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private eventSubject = new Subject<any>();

  constructor() { }

  publish(event: any) {
    this.eventSubject.next(event);
  }

  subscribe(handler: (event: any) => void) {
    this.eventSubject.subscribe(handler);
  }
}