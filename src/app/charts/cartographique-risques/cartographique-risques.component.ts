import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts/core';
import { ChartService } from 'src/services/chart.service';
import { LocalStorageService } from 'src/services/local-storage.service';

@Component({
  selector: 'app-cartographique-risques',
  templateUrl: './cartographique-risques.component.html',
  styleUrls: ['./cartographique-risques.component.scss']
})
export class CartographiqueRisquesComponent implements OnInit {
  data: any;
  constructor(private chartService: ChartService,private sanitizer: DomSanitizer
    ,private route: ActivatedRoute,private localStorageService: LocalStorageService) {}
    ngOnInit(): void {
      this.chartService.getRiskMapStats().subscribe(
        (response: any) => {
          this.data = response;
   
          this.renderChart();
        },
        (error: any) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  
 
  
    renderChart(): void {
      const heatmapChart = echarts.init(document.getElementById('heatmap'));
  
      const seriesData: any[][] = [];
      this.data.data.forEach((category: { data: any[]; name: any; }) => {
        category.data.forEach((point: { x: any; count: any; }) => {
          seriesData.push([point.x, category.name, point.count]);
        });
      });
  
      const option = {
        tooltip: {
          position: 'top'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          height: '50%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: ['Faible', 'Moyen', 'ElevÃ©'],
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: ['Faible', 'Moyen', 'ElevÃ©'],
          splitArea: {
            show: true
          }
        },
        visualMap: {
          
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
          inRange: {
            color: ['#0eb756', '#ffb200', '#ff0000']
          }
        },

       // visualMap: {
       //   pieces: [
         //   { value: 'Faible', color: '#0eb756' },  // Green for Faible
         //   { value: 'Moyen', color: '#ffb200' },   // Yellow for Moyen
         //   { value: 'Elevé', color: '#ff0000' }    // Red for Elevé
         // ],
       //   calculable: true,
       //   orient: 'horizontal',
        //  left: 'center',
         // bottom: '15%'
      //  },

        series: [{
          name: 'Counts',
          type: 'heatmap',
          data: seriesData,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
  
      heatmapChart.setOption(option);
    }
  
  }