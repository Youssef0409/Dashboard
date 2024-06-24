import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './charts/test/test.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
 // { path: ':userToken/:orgId/:userId', component: TestComponent },
  
 { path: ':userToken/:orgId/:userId', component: DashboardComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { 

  
}
