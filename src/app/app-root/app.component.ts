import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../models/user-model';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { EventBusService } from '../services/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
