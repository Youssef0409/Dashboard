import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from 'src/services/chart.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-annual-planning',
  templateUrl: './annual-planning.component.html',
  styleUrls: ['./annual-planning.component.scss']
})
export class AnnualPlanningComponent implements OnInit{
  chartOptions: any;

  constructor(private chartService: ChartService,private sanitizer: DomSanitizer
    ,private route: ActivatedRoute,private localStorageService: LocalStorageService) {}


    ngOnInit(): void {
      this.fetchMissionStats();

}

fetchMissionStats(): void {
  this.chartService.annual_planning().subscribe(
    data => {
      
      
      this.updateChart(data);
      
    },
    error => {
      console.error('Error fetching mission stats', error);
    }
  );
}  
updateChart(data: { en_cours: number, termine: number, planifie: number }): void {
  const chartDom = document.getElementById('main9')!;
  const myChart = echarts.init(chartDom);

  const options = {
    title: {
      left: 'center'
    },
    toolbox: {
      feature: {
        saveAsImage: {}
       
    }},
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Tasks',
        type: 'pie',
        radius: '50%',
        data: [
          { value: data.en_cours, name: 'En Cours' },
          { value: data.termine, name: 'Terminé' },
          { value: data.planifie, name: 'Planifié' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  myChart.setOption(options);
}
}
