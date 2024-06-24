import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from 'src/services/chart.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import * as echarts from 'echarts';
import { ResizableDirective, ResizeEvent } from 'angular-resizable-element';

const storedUserToken = localStorage.getItem('userToken');
const storedOrgId = localStorage.getItem('orgId');
const storedUserId = localStorage.getItem('userId');
@Component({
  selector: 'app-mission-auditor',
  templateUrl: './mission-auditor.component.html',
  styleUrls: ['./mission-auditor.component.scss']
})
export class MissionAuditorComponent implements OnInit{
 
  data: any;
 
  constructor(private chartService: ChartService,private sanitizer: DomSanitizer
    ,private route: ActivatedRoute,private localStorageService: LocalStorageService) {}


    ngOnInit(): void {
      this.fetchMissionStats();

}


fetchMissionStats(): void {

  this.chartService.auditors_missions().subscribe(
    data => {
      if (data && typeof data === 'object') {
        console.log('Response Keys:', Object.keys(data));
        this.updateChart(data);
      } else {
        console.error('Unexpected API response format:', data);
      }
    },
    error => {
      console.error('Error fetching BU count', error);
    }
  );
}


onResizeEnd(event: ResizeEvent): void {
  // Handle resize event
  console.log('New size:', event.rectangle.width, event.rectangle.height);
}
updateChart(data: any): void {
  const chartDom = document.getElementById('main1')!;
  const myChart = echarts.init(chartDom);

  const option = {
    legend: {},
    tooltip: {},
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    dataset: {
      source: [
        ['product',  'Planifié','En cours', 'terminé'],
        
      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
  };
  data.forEach((item: any) => {
    option.dataset.source.push([item.user_name, item.planifie, item.en_cours, item.termine]);
  });

  option && myChart.setOption(option);
}
}
