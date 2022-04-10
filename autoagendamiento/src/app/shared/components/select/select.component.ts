import { Component, OnInit } from '@angular/core';


interface Region {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'select-region',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  regiones: Region[] = [
    {value:0,viewValue: 'Arica - Parinacota'},
    {value:1,viewValue: 'Tarapacá'},
    {value:2,viewValue: 'Antofagasta'},
    {value:3,viewValue: 'Atacama'},
    {value:4,viewValue: 'Coquimbo'},
    {value:5,viewValue: 'Valparaíso'},
    {value:6,viewValue: 'Región Metropolitana'},
    {value:7,viewValue: 'OHiggins'},
    {value:8,viewValue: 'Maule'},
    {value:9,viewValue: 'Ñuble'},
    {value:10,viewValue: 'Biobío'},
    {value:11,viewValue: 'Araucanía'},
    {value:12,viewValue: 'Los Ríos'},
    {value:13,viewValue: 'Los Lagos'},
    {value:14,viewValue: 'Aysén'},
    {value:15,viewValue: 'Magallanes'},

  ]

}
