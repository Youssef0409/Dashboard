import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from 'src/services/chart.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-audit-qualite',
  templateUrl: './audit-qualite.component.html',
  styleUrls: ['./audit-qualite.component.scss']
})
export class AuditQualiteComponent {
  data: any;
  missions: any[] = [];
  selectedMission: string = 'all';
  constructor(private chartService: ChartService,private sanitizer: DomSanitizer
    ,private route: ActivatedRoute,private localStorageService: LocalStorageService) {}


    ngOnInit(): void {
      this.fetchMissionStats();

}


fetchMissionStats(): void {
  this.chartService.audit_quality().subscribe(
    data => {
      
      this.missions = data.missions;
      this.updateChart(data.missions, 'all');
      
    },
    error => {
      console.error('Error fetching mission stats', error);
    }
  );
}
onMissionChange(event: any): void {
  this.selectedMission = event.target.value;
  this.updateChart(this.missions, this.selectedMission);
}
updateChart(data: any[], missionName: string): void {
  const chartDom = document.getElementById('main5')!;
  const myChart = echarts.init(chartDom);

  const filteredMissions = missionName === 'all'
  ? data
  : data.filter(mission => mission.mission_name === missionName);

  const seriesData: echarts.SeriesOption[] = filteredMissions.map(mission => ({
    type: 'bar',
    data: [
      mission.tests_stats.alltests, mission.tests_stats.achieved_tests, mission.tests_stats.achieved_tests_percentage,
      mission.tests_stats.reviewed_tests, mission.tests_stats.reviewed_tests_percentage,
      mission.tests_stats.all_comments, mission.tests_stats.replied_comments, mission.tests_stats.replied_comments_percentage
    ],
    coordinateSystem: 'polar',
    name: mission.mission_name,
    stack: 'a',
    emphasis: {
      focus: 'series'
    }
  }));

  const legendData = filteredMissions.map(mission => mission.mission_name);

  const option: echarts.EChartsOption = {
    angleAxis: {
      type: 'category',
      data: [
        'All Tests', 'Achieved Tests', 'Achieved Tests Percentage',
        'Reviewed Tests', 'Reviewed Tests Percentage', 'All Comments',
        'Replied Comments', 'Replied Comments Percentage'
      ]
    },
    radiusAxis: {},
    polar: {},
    series: seriesData,
    toolbox: {
      feature: {
        saveAsImage: {}
       
    }},
    legend: {
      show: true,
      data: legendData
    }
  };

  myChart.setOption(option);
}
}