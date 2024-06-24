import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';
import { ChartService } from 'src/services/chart.service';
import { LocalStorageService } from 'src/services/local-storage.service';
const storedUserToken = localStorage.getItem('userToken');
const storedOrgId = localStorage.getItem('orgId');
const storedUserId = localStorage.getItem('userId');
@Component({
  selector: 'app-efficacite-controle',
  templateUrl: './efficacite-controle.component.html',
  styleUrls: ['./efficacite-controle.component.scss']
})
export class EfficaciteControleComponent implements OnInit{
  selectedFilter: string = 'all'; // Default filter option
  data: any;
 
  constructor(private chartService: ChartService,private sanitizer: DomSanitizer
    ,private route: ActivatedRoute,private localStorageService: LocalStorageService) {}


    ngOnInit(): void {
      this.fetchMissionStats();

}


fetchMissionStats(): void {
  this.chartService.getEffecincyMissionStats().subscribe(
    data => {
      if (data && Array.isArray(data)) {
        console.log('Response Length:', data.length);
        this.data = data; // Store data for future use
        this.updateChart(this.data); // Display all missions by default
      } else {
        console.error('Unexpected API response format:', data);
      }
    },
    error => {
      console.error('Error fetching mission stats', error);
    }
  );
}

onFilterChange(event: any): void {
  this.selectedFilter = event.target.value;
  this.updateChart(this.data); // Update the chart with the new filter option
}

updateChart(data: any[]): void {
  const chartDom = document.getElementById('main2')!;
  const myChart = echarts.init(chartDom);

  // Filter the data based on the selected filter option
  let filteredData = this.data;
  if (this.selectedFilter === 'closed') {
    filteredData = data.filter(item => item.mission_status === 'closed');
  } else if (this.selectedFilter === 'progressing') {
    filteredData = data.filter(item => item.mission_status === 'progressing');
  }

  const yAxisData = filteredData.map((item: { mission_name: any }) => item.mission_name);
  const testsEfficacesData = filteredData.map((item: { tests_efficaces: any }) => item.tests_efficaces);
  const testsNonEfficacesData = filteredData.map((item: { tests_non_efficaces: any }) => item.tests_non_efficaces);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: yAxisData // Use the mission names
    },
    series: [
      {
        name: 'Tests Efficaces',
        type: 'bar',
        stack: 'total',
        color: '#5470c6',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: testsEfficacesData // Use the tests efficaces data
      },
      {
        name: 'Tests Non Efficaces',
        type: 'bar',
        stack: 'total',
        color: '#ee6666',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: testsNonEfficacesData // Use the tests non efficaces data
      }
    ]
  };

  // Set the option for the chart
  myChart.setOption(option);
  
}

}