import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  message: any;
  constructor() { }

  ngOnInit(): void {
    fromEvent(window, 'eventFromMfe').subscribe((event)=>{
     this.message= 'Received in gallery '+((event as any)['detail']['name']);
    })
  }

}
