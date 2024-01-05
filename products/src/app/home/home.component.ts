import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  product:string='';

  constructor() { }

  ngOnInit(): void {
  }

  sendData() {
    const customEvent = new CustomEvent('eventFromMfe', {detail: {name: this.product}})
    dispatchEvent(customEvent);
    this.product = '';
  }

}
