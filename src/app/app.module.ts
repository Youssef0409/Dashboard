import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './charts/test/test.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSidebarModule, NbButtonModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { NbCardModule } from '@nebular/theme';
import { ChartPlanActionComponent } from './charts/chart-plan-action/chart-plan-action.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatsComponent } from './stats/stats.component';
import { MissionStatsComponent } from './charts/mission-stats/mission-stats.component';
import { FormsModule } from '@angular/forms';
import { MissionAuditorComponent } from './charts/mission-auditor/mission-auditor.component';
import { EfficaciteControleComponent } from './charts/efficacite-controle/efficacite-controle.component';
import { RisquesComponent } from './charts/risques/risques.component';
import { AuditQualiteComponent } from './charts/audit-qualite/audit-qualite.component';
import { CartographiqueRisquesComponent } from './charts/cartographique-risques/cartographique-risques.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { ResizableModule } from 'angular-resizable-element';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RapportValidationComponent } from './charts/rapport-validation/rapport-validation.component';
import { ImpactConstatComponent } from './charts/impact-constat/impact-constat.component';
import { AnnualPlanningComponent } from './charts/annual-planning/annual-planning.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoadingInterceptor } from 'src/services/interceptor/loading.service';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ChartPlanActionComponent,
    DashboardComponent,
    StatsComponent,
    MissionStatsComponent,
    MissionAuditorComponent,
    EfficaciteControleComponent,
    RisquesComponent,
    AuditQualiteComponent,
    CartographiqueRisquesComponent,
    RapportValidationComponent,
    ImpactConstatComponent,
    AnnualPlanningComponent,
    LoadingSpinnerComponent,
    LoadingComponent
  ],
  imports: [
    NbCardModule ,
    NbThemeModule.forRoot({name: 'default'}),
    BrowserAnimationsModule,
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Add FormsModule to imports
    DragDropModule,
    SortablejsModule.forRoot({ animation: 150 }) ,// Ensure you are importing SortablejsModule correctly
    ResizableModule
   
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
