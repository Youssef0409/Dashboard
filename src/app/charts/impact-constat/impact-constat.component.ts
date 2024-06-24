import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from 'src/services/chart.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-impact-constat',
  templateUrl: './impact-constat.component.html',
  styleUrls: ['./impact-constat.component.scss']
})
export class ImpactConstatComponent {
  selectedCategory = 'financier';
  selectedStatus = 'all';
  chartData: any;
  constructor(private chartService: ChartService,private sanitizer: DomSanitizer
    ,private route: ActivatedRoute,private localStorageService: LocalStorageService) {}


    ngOnInit(): void {
      this.fetchMissionStats();

}

fetchMissionStats(): void {
  this.chartService.getImpactExternalMission().subscribe(
    data => {
      
      this.chartData = data;
      this.updateChart();
      
    },
    error => {
      console.error('Error fetching mission stats', error);
    }
  );
}  
selectedFilterOption = 'all'; // Initialize with 'all' as default

updateChart(): void {if (!this.chartData) {
  return;
}
  const chartDom = document.getElementById('main10')!;
  const myChart = echarts.init(chartDom);
  let seriesData = [];

  if (this.selectedStatus === 'all' || this.selectedStatus === 'test_status') {
    seriesData.push(
      { value: this.chartData[`${this.selectedCategory}_test_status_non_regularise`], name: 'Non Regularise' },
      { value: this.chartData[`${this.selectedCategory}_test_status_regularise`], name: 'Regularise' },
      { value: this.chartData[`${this.selectedCategory}_test_status_partial`], name: 'Partial' }
    );
  }

  if (this.selectedStatus === 'all' || this.selectedStatus === 'criticite') {
    seriesData.push(
      { value: this.chartData[`${this.selectedCategory}_criticite_low`], name: 'Low' },
      { value: this.chartData[`${this.selectedCategory}_criticite_medium`], name: 'Medium' },
      { value: this.chartData[`${this.selectedCategory}_criticite_high`], name: 'High' }
    );
  }

  const options = {
    title: {
      text: `${this.selectedCategory.charAt(0).toUpperCase() + this.selectedCategory.slice(1)} - ${this.selectedStatus.charAt(0).toUpperCase() + this.selectedStatus.slice(1)}`,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    toolbox: {
      feature: {
        saveAsImage: {}
       
    }},
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: `${this.selectedCategory.charAt(0).toUpperCase() + this.selectedCategory.slice(1)} - ${this.selectedStatus.charAt(0).toUpperCase() + this.selectedStatus.slice(1)}`,
        type: 'pie',
        radius: '50%',
        data: seriesData,
        
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