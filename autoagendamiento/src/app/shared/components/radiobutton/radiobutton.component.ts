import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss']
})
export class RadiobuttonComponent implements OnInit {
  isTrue = false;
  constructor() { }

  ngOnInit(): void {
  }

  onTrueorFalse(value: boolean): void{
    this.isTrue = value;
  }

}
