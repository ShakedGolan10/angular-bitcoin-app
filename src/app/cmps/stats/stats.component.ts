import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MarketPrice } from 'src/app/models/graph.model';
import { BitCoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor(private bitcoinService: BitCoinService) { }
  prices$!: Observable<MarketPrice>
  ngOnInit(): void {
    this.prices$ = this.bitcoinService.getMarketPrice()
  }

}