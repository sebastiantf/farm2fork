import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trace',
  templateUrl: './trace.component.html',
  styleUrls: ['./trace.component.css']
})
export class TraceComponent implements OnInit {

  public Date1: Date;
  public Date2: Date;
  public Date3: Date;
  public Date4: Date;
  public Date5: Date;

  constructor() { }

  ngOnInit() {
    this.Date1 = new Date(2019, 3, 3, 14, 34);
    this.Date2 = new Date(2019, 3, 2, 14, 34);
    this.Date3 = new Date(2019, 3, 1, 14, 34);
    this.Date4 = new Date(2019, 2, 28, 14, 34);
    this.Date5 = new Date(2019, 2, 27, 14, 34);

  }

}
