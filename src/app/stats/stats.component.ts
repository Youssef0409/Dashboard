import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from 'src/services/chart.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { Location } from '@angular/common';
import * as echarts from 'echarts';

import { interval } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
const storedUserToken = localStorage.getItem('userToken');
const storedOrgId = localStorage.getItem('orgId');
const storedUserId = localStorage.getItem('userId');
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent  implements OnInit {
  longText = `sqdqsd`;
  userToken: string | null = null;
  orgId: string | null = null;
  userId: string | null = null;
  dashboardUrl: any;
  currentDateTime: Date;
  baCount:any;
  cards: { bgClass: string; icon: string; title: string; value: any; }[];
  ProcessCount: any;
  Risks: any;
  constructor(private chartService: ChartService,private sanitizer: DomSanitizer,private route: ActivatedRoute,private localStorageService: LocalStorageService,location:Location) {  this.currentDateTime = new Date();
  }
  currentDate = new Date();
  formattedDate = this.currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  formattedTime = this.currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

 
  onUpdate(event: any) {
    // Handle update logic if needed
    console.log('Cards updated:', this.cards);
  }
  buCount: any;
 

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.currentDateTime = new Date();
      this.updateFormattedDateTime();
      
    });
    
    this.chartService.getBACount().subscribe(
      data => {
        this.baCount = data;
        
        this.updateCards();
      },
      error => {
        console.error('Error fetching BA count', error);
      }
    );
   


    this.chartService.getBUCount().subscribe(
      data => {
        this.buCount = data;
        
      
      },
      error => {
        console.error('Error fetching BU count', error);
      }
    );


    this.chartService.getProcessCount().subscribe(
      data => {
        this.ProcessCount = data;
        
        this.updateCards();
      },
      error => {
        console.error('Error fetching ProcessCount ', error);
      }
    );
    
    this.chartService.getRisksCount().subscribe(
      data => {
        this.Risks = data;
        
        this.updateCards();
      },
      error => {
        console.error('Error fetching Risks ', error);
      }
    );

  }

  updateCards() {
    this.cards = [
      { bgClass: 'l-bg-orange-dark', icon: 'fas fa-clock', title: this.formattedDate, value: this.formattedTime },
      { bgClass: 'l-bg-blue-dark', icon: 'fas fa-microchip', title: 'Macro Process', value: this.baCount },
      { bgClass: 'l-bg-green-dark', icon: 'fas fa-microchip', title: 'Process', value: this.ProcessCount },
      { bgClass: 'l-bg-cherry', icon: 'fas fa-exclamation-triangle', title: 'Risques', value: this.Risks }
    ];
  }

  updateFormattedDateTime(): void {
    this.formattedDate = this.currentDateTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.formattedTime = this.currentDateTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });

    if (this.cards.length > 0) {
      this.cards[0].title = this.formattedDate;
      this.cards[0].value = this.formattedTime;
    }
  
  }
  
}
