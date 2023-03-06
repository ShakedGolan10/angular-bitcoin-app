import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Move, UserModel } from 'src/app/models/user-model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  user !: UserModel
  moves !: Move[]
  constructor(
    private contactService: ContactService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


  updateMoves() {
    this.user = this.userService.getUser()
    this.moves = this.user.moves.filter(move => move.toId === this.contact._id)

  }


  contact!: Contact
  subscription!: Subscription

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.contact = data['contact']
      this.user = this.userService.getUser()
      this.moves = this.user.moves.filter(move => move.toId === this.contact._id)
    })
  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }

}
