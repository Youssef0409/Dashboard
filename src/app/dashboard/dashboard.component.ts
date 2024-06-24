import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
//@ts-ignore
import * as html2pdf from 'html2pdf.js';
//@ts-ignore
import * as FileSaver from 'file-saver';

import { Document, Paragraph, Packer, TextRun } from 'docx';
import { LoadingService } from 'src/services/loading.service';
import { RisquesComponent } from '../charts/risques/risques.component';




interface Item {
  title: string;
  component: string;
  fullWidth: boolean;
  isHidden?: boolean;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loadingTimeout: number = 5000; // Timeout duration in milliseconds

  @ViewChild('content') contentElement: ElementRef;
  userToken: string | null = null;
  orgId: string | null = null;
  userId: string | null = null;

  constructor(private router: Router,private route: ActivatedRoute,private location: Location,private elementRef: ElementRef,private loadingService: LoadingService) { }

  ngOnInit(): void {
    console.log('Current URL:', window.location.href);
    

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
  title = `Affectation de l'équipe d'audit`;
  title1 =`Plan d'audit annuel - Suivi Avancement`;
  items: Item[] = [
    { title: `Affectation de l'équipe d'audit`, component: 'app-mission-auditor', fullWidth: false },
    { title: 'Risques', component: 'app-risques', fullWidth: false },
    { title: 'Efficacité des contrôles (Par mission)', component: 'app-efficacite-controle', fullWidth: true },
    { title: 'Audit Quality', component: 'app-audit-qualite', fullWidth: true },
    { title: `Plan d'audit annuel - Suivi Avancement`, component: 'app-mission-stats', fullWidth: false },
    { title: 'Cartographie des risques', component: 'app-cartographique-risques', fullWidth: false },
    { title: 'Suivi validation des rapports par les audités', component: 'app-rapport-validation', fullWidth: true },
    { title: 'Mission', component: 'app-annual-planning', fullWidth: false },
    { title: 'Impact des constats', component: 'app-impact-constat', fullWidth: false }
  ];
  
  sortableOptions = {
    animation: 150,
    ghostClass: 'sortable-ghost',
    handle: '.card'
  };
  @ViewChild('content', {static:false}) el!: ElementRef
  makePDf() {
    const element = this.el.nativeElement;

  // Customize the PDF dimensions
  const pdf = new jsPDF();

  // Calculate the height of the content
  // Calculate the height of the content
  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Set the height of each page in the PDF
    const pageHeight = 297; // A4 height in mm
    const totalPages = Math.ceil(imgHeight / pageHeight);

    // Add each page to the PDF
    let yPos = 0;
    for (let i = 0; i < totalPages; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, 'PNG', 0, -yPos, imgWidth, imgHeight);
      yPos += pageHeight;
    }

    // Save the PDF
    pdf.save('Dashboard.pdf');
  });
}



}