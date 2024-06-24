import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

import * as echarts from 'echarts';
import { LoadingService } from "src/services/loading.service";
import { Observable, mapTo, startWith, timer } from "rxjs";



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  loadingTimeoutDuration: number = 10000; // Timeout duration in milliseconds
  loading$: Observable<boolean>;
  loadingTimeout$: Observable<boolean>;
  userToken: string | null = null;
  orgId: string | null = null;
  userId: string | null = null;

  constructor(private route: ActivatedRoute,private location: Location,private loadingService: LoadingService) { }

  ngOnInit(): void {
    console.log('Current URL:', window.location.href);
    this.loading$ = this.loadingService.loading$;
    this.loadingTimeout$ = timer(this.loadingTimeoutDuration).pipe(
      mapTo(false), // After timeout, emit false to hide loading screen
      startWith(true) // Start with true to initially show loading screen
    );

    this.route.params.subscribe(params => {
      console.log('Route Params:', params); // Check console for route parameters
      const userToken = params['userToken'];
      const orgId = params['orgId'];
      const userId = params['userId'];
      console.log('User Token:', userToken); // Check console for individual parameters
      console.log('Org ID:', orgId);
      console.log('User ID:', userId);
      localStorage.setItem('userToken', userToken);
localStorage.setItem('orgId', orgId);
localStorage.setItem('userId', userId);
    });


  
    
  }
}