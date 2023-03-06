import { Component, Input } from '@angular/core';
import { Move } from 'src/app/models/user-model';

@Component({
  selector: 'transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss']
})
export class TransferListComponent {
  @Input() moves !: Move[]

}
