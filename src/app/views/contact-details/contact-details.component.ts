import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  contact!: Contact
  subscription!: Subscription

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.contact = data['contact']
    })
  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }

}
