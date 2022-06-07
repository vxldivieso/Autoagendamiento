import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ejecutivo',
  templateUrl: './contact.component.html',
  styleUrls: ['./wrongdata.component.scss'],
  providers: [
    { provide: Window, useValue: window }
  ]
})
export class EjecutivoComponent implements OnInit, AfterViewInit {
  order!: number;
  token!: string;
  constructor(private route : ActivatedRoute, private window:Window) {
    this.order = this.route.snapshot.params['order'];
    this.token = this.route.snapshot.params['token'];
  }

  ngOnInit(): void { 
  }
  ngAfterViewInit(): void {
    this.window.scrollTo(0, 0);
  }
  
}

@Component({
  selector: 'app-saveprocess',
  templateUrl: './saveprocess.component.html',
  styleUrls: ['./wrongdata.component.scss'],
  providers: [
    { provide: Window, useValue: window }
  ]
})
export class SaveProcessComponent implements OnInit, AfterViewInit {
  order!: number;
  token!: string;
  constructor(private route : ActivatedRoute, private window:Window) {
    this.order = this.route.snapshot.params['order'];
    this.token = this.route.snapshot.params['token'];
  }

  ngOnInit(): void { 
  }
  ngAfterViewInit(): void {
    this.window.scrollTo(0, 0);
  }
  
}

@Component({
  selector: 'app-modifycontact',
  templateUrl: './modifycontact.component.html',
  styleUrls: ['./wrongdata.component.scss'],
  providers: [
    { provide: Window, useValue: window }
  ]
})
export class ModifyContactComponent implements AfterViewInit{ 
  order!: number;
  token!: string;
  constructor(private route : ActivatedRoute, private window : Window) {
    this.order = this.route.snapshot.params['order'];
    this.token = this.route.snapshot.params['token'];
  }

  ngAfterViewInit(): void {
    this.window.scrollTo(0, 0);
  }
}



