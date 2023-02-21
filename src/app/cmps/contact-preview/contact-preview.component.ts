import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent {

  constructor(private router: Router) { }

  @Input() contact!: Contact
  @Output() remove = new EventEmitter()

  onRemoveContact(ev: MouseEvent) {
    ev.stopPropagation()
    this.remove.emit(this.contact._id)
  }

  onEditContact(ev: MouseEvent) {
    ev.stopPropagation()
    this.router.navigate(['contact/edit', this.contact._id])
  }
}
