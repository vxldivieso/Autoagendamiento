import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ejecutivo',
  templateUrl: './contact.component.html',
  styleUrls: ['./wrongdata.component.scss']
})
export class EjecutivoComponent implements OnInit {
  order!: number;
  token!: string;
  constructor(private route : ActivatedRoute) {
    this.order = this.route.snapshot.params['order'];
    this.token = this.route.snapshot.params['token'];
  }

  ngOnInit(): void { 
  }
  
}

@Component({
  selector: 'app-saveprocess',
  templateUrl: './saveprocess.component.html',
  styleUrls: ['./wrongdata.component.scss']
})
export class SaveProcessComponent implements OnInit {
  order!: number;
  token!: string;
  constructor(private route : ActivatedRoute) {
    this.order = this.route.snapshot.params['order'];
    this.token = this.route.snapshot.params['token'];
  }

  ngOnInit(): void { 
  }
  
}

@Component({
  selector: 'app-modifycontact',
  templateUrl: './modifycontact.component.html',
  styleUrls: ['./wrongdata.component.scss']
})
export class ModifyContactComponent{
  order!: number;
  token!: string;
  constructor(private route : ActivatedRoute) {
    this.order = this.route.snapshot.params['order'];
    this.token = this.route.snapshot.params['token'];
  }
}



