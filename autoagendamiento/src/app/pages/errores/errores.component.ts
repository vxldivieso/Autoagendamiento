import {AfterViewInit, Component,OnInit} from '@angular/core';

//Stepper component
/**
 * @title Stepper responsive
 */

@Component({
  selector: 'error-401',
  templateUrl: './401.component.html',
  styleUrls: ['./errores.component.scss'],
  providers: [
    { provide: Window, useValue: window }
  ]
  
})
export class ErrorComponent implements OnInit, AfterViewInit{
  constructor(private window : Window){}
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
      this.window.scrollTo(0, 0);
    }
}

@Component({
  selector: 'error-404',
  templateUrl: './404.component.html',
  styleUrls: ['./errores.component.scss'],
  providers: [
    { provide: Window, useValue: window }
  ]
  
})
export class Error404Component implements OnInit, AfterViewInit{
  constructor(private window : Window){}
    ngOnInit(): void {
        
    }
    ngAfterViewInit(): void {
      this.window.scrollTo(0, 0);
    }
}