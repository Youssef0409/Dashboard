import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from 'src/services/chart.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import * as echarts from 'echarts';
import { LoadingService } from 'src/services/loading.service';
const storedUserToken = localStorage.getItem('userToken');
const storedOrgId = localStorage.getItem('orgId');
const storedUserId = localStorage.getItem('userId');
@Component({
  selector: 'app-risques',
  templateUrl: './risques.component.html',
  styleUrls: ['./risques.component.scss']
})
export class RisquesComponent implements OnInit{
  data: any;
 
  constructor(private chartService: ChartService,private sanitizer: DomSanitizer
    ,private route: ActivatedRoute,private localStorageService: LocalStorageService,private loadingService: LoadingService) {}


    ngOnInit(): void {
 
      this.fetchMissionStats();

}
fetchMissionStats(): void {

  this.chartService.risks_stats().subscribe(
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


updateChart(data: any): void {
  const chartDom = document.getElementById('main4')!;
  const myChart = echarts.init(chartDom);
  const missionNames = data.missions.map((mission: { mission_name: any }) => mission.mission_name);
  const radarData = data.missions.map((mission: { low_risks: any; medium_risks: any; high_risks: any; mission_name: any; }) => ({
    value: [mission.low_risks, mission.medium_risks, mission.high_risks],
    name: mission.mission_name
  }));

  const option = {
    title: {
   //   text: 'Risk Distribution Across Missions'
    },
    tooltip: {
      trigger: 'item'
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    legend: {
      show: false // Hide legend
    },
    radar: {
      indicator: [
        { name: 'Low Risks', max: 10 },
        { name: 'Medium Risks', max: 10 },
        { name: 'High Risks', max: 35 }
      ],
      center: ['50%', '50%'],
      radius: '70%'
    },
    series: [
      {
        name: 'Risk Distribution',
        type: 'radar',
        data: radarData
      }
    ]
  };

  // Set the option to the chart instance
  myChart.setOption(option);

  // Add select option to filter by mission name
  const select = document.getElementById('missionSelect') as HTMLSelectElement;
  select.innerHTML = ''; // Clear select options

  // Add "All" option
  const allOption = document.createElement('option');
  allOption.value = 'All';
  allOption.text = 'All';
  select.appendChild(allOption);

  // Add other mission options
  missionNames.forEach((name: string) => {
    const option = document.createElement('option');
    option.value = name;
    option.text = name;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    const selectedMission = this.value;
    if (selectedMission === 'All') {
      // Show all missions
      option.series[0].data = radarData;
      myChart.setOption(option);
    } else {
      const filteredData = data.missions.find((mission: { mission_name: string }) => mission.mission_name === selectedMission);
      if (filteredData) {
        const filteredRadarData = [{
          value: [filteredData.low_risks, filteredData.medium_risks, filteredData.high_risks],
          name: filteredData.mission_name
        }];
        option.series[0].data = filteredRadarData;
        myChart.setOption(option);
      }
    }
  });

  if (!select) {
    console.error("Select element not found.");
  }
  
}
}
