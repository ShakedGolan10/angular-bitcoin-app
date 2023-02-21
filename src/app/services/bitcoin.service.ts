import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitCoinService {

  constructor(private http: HttpClient) { }

  public getRate() {

    let bitcoinRate = localStorage.getItem('bitcoinRateDB')
    if (!bitcoinRate) return this.http.get<{ answer: number }>('https://blockchain.info/tobtc?currency=USD&value=1')
      .pipe(
        map((res) => {
          localStorage.setItem('bitcoinRateDB', JSON.stringify(res.answer))

          return res.answer
        })
      )
    else return bitcoinRate
  }

}