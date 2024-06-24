import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from 'src/services/chart.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-rapport-validation',
  templateUrl: './rapport-validation.component.html',
  styleUrls: ['./rapport-validation.component.scss']
})
export class RapportValidationComponent {
  data: any;
  
  constructor(private chartService: ChartService,private sanitizer: DomSanitizer
    ,private route: ActivatedRoute,private localStorageService: LocalStorageService) {}


    missions: any[] = [];
     selectedMission: string = 'all';



  ngOnInit(): void {
    this.chartService.getValidationRappor().subscribe(data => {
      this.missions = data.missions;
      this.updateChart(data.missions, 'all');
    });
  }

  onMissionChange(event: any): void {
    this.selectedMission = event.target.value;
    this.updateChart(this.missions, this.selectedMission);
  }

  updateChart(data: any, missionName: string): void {
    const chartDom = document.getElementById('main7')!;
    const myChart = echarts.init(chartDom);

    const filteredMissions = missionName === 'all'
      ? data
      : data.filter((mission: { mission_name: string; }) => mission.mission_name === missionName);

    const xAxisData = filteredMissions.map((mission: { mission_name: any; }) => mission.mission_name);
    const repliedData = filteredMissions.map((mission: { testCommentsReplied: any; }) => mission.testCommentsReplied);
    const notRepliedData = filteredMissions.map((mission: { testCommentsNotReplied: any; }) => mission.testCommentsNotReplied);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
         
      }},
      legend: {
        data: ['Replied', 'Not Replied']
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          rotate: 30, // Rotate the labels to fit more text
          interval: 0, // Show all labels
          formatter: function (value: string) {
            return value.length > 10 ? value.slice(0, 10) + '...' : value; // Truncate long labels with ellipsis
          },
          rich: {
            a: {
              width: 100 // Set the width of each label
            }
          }
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Replied',
          type: 'bar',
          data: repliedData,
          itemStyle: {
            color: '#4caf50'
          }
        },
        {
          name: 'Not Replied',
          type: 'bar',
          data: notRepliedData,
          itemStyle: {
            color: '#f44336'
          }
        }
      ],
      grid: {
        bottom: 80, // Increase bottom margin to avoid cutting off labels
        top: 50, // Adjust as needed to fit the chart title and legend
        left: 50, // Adjust to fit y-axis labels
        right: 50 // Adjust to fit any legend or labels on the right
      }
    };

    myChart.setOption(option);
  }
}