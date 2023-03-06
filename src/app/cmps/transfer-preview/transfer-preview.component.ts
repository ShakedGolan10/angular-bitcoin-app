import { Component, Input } from '@angular/core';
import { Move } from 'src/app/models/user-model';

@Component({
  selector: 'transfer-preview',
  templateUrl: './transfer-preview.component.html',
  styleUrls: ['./transfer-preview.component.scss']
})
export class TransferPreviewComponent {
  @Input() move !: Move
}
