import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from 'src/services/chart.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { Location } from '@angular/common';
import * as echarts from 'echarts';

import { interval } from 'rxjs';
const storedUserToken = localStorage.getItem('userToken');
const storedOrgId = localStorage.getItem('orgId');
const storedUserId = localStorage.getItem('userId');
@Component({
  selector: 'app-mission-stats',
  templateUrl: './mission-stats.component.html',
  styleUrls: ['./mission-stats.component.scss']
})
export class MissionStatsComponent implements OnInit{
  currentMissions: any;
  data: any;
  startDate: any;
  endDate: any;
  constructor(private chartService: ChartService,private sanitizer: DomSanitizer
    ,private route: ActivatedRoute,private localStorageService: LocalStorageService,location:Location) {}


    ngOnInit(): void {
      const today = this.formatDate(new Date());
    this.startDate = today;
    this.endDate = today;
      
    this.fetchMissionStats();

}
onDateChange(): void {
  this.fetchMissionStats();
}
fetchMissionStats(): void {

  this.chartService.getMissionsStats(storedOrgId,storedUserToken,this.startDate,this.endDate).subscribe(
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
formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

updateChart(data: any): void {
  const chartDom = document.getElementById('main')!;
  const myChart = echarts.init(chartDom);

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    series: [
      {
        name: 'Mission Stats',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: data.all_missions_count, name: 'All Missions' },
        //  { value: data.progressing_mission_count, name: 'Progressing Missions'},
          { value: data.planned_mission_count, name: 'Planned Missions' },
          
          { value: data.closed_mission_count, name: 'Closed Missions' }
        ]
      }
    ]
  };

  option && myChart.setOption(option);
}
}