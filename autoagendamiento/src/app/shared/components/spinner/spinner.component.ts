import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-spinner',
  template:`
  <div class="overlay" *ngIf="isLoading$ | async">
  <div class="loadingio-spinner-ellipsis-bk91pjo1k59"><div class="ldio-4cz2ivo2727">
<div></div><div></div><div></div><div></div><div></div>
</div></div>
  </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isLoading$ = this.spinner.isLoading$;

  constructor(public spinner : LoadingService) { }

  ngOnInit(): void {
  }

}
