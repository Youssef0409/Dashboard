import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, catchError, tap, throwError } from 'rxjs';
const storedUserToken = localStorage.getItem('userToken');
const storedOrgId = localStorage.getItem('orgId');
const storedUserId = localStorage.getItem('userId');
@Injectable({
  providedIn: 'root'
})


export class ChartService {
  handleError: (err: any, caught: Observable<any>) => ObservableInput<any>;
  

  constructor(private http: HttpClient) {}
  API_URL = 'http://127.0.0.1:8000/api/';


getBUCount(): Observable<any> {
  const storedUserToken = localStorage.getItem('userToken');
const storedOrgId = localStorage.getItem('orgId');
const storedUserId = localStorage.getItem('userId');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/bu?org=${storedOrgId}`, { headers, responseType: 'text' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}

getBACount(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/macroprocess?org=${storedOrgId}`, { headers, responseType: 'text' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}


getProcessCount(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/process?org=${storedOrgId}`, { headers, responseType: 'text' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}



getCurrentMissionStats(token: any,org:any): Observable<any> {
  
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.API_URL}stats/currentMissions?org=${org}`, { headers, responseType: 'text' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}

getRisksCount(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/risks?org=${storedOrgId}`, { headers, responseType: 'text' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}


getUsersCount(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/users?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}

getControlsCount(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/controls?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}


getTestsCount(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/tests?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}

getOrganisationsCount(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/organisations?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}

getMissionsOrgsStats(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/missions_orgs_stats?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}

getRiskMapStats(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/riskmap?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}


getMissionsStats(org: any, token: any, start_date?: string, end_date?: string): Observable<any> {
  let url = `${this.API_URL}stats/missions_stats?org=${org}`;
  
  

  if (start_date && end_date) {
    url += `&start_date=${start_date}&end_date=${end_date}`;
  }
  console.log(url);
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get(url, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}


auditors_missions(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/auditors_missions?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}

getEffecincyMissionStats(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/efficacite_controles_missions?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}



audit_quality(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/audit_quality?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}

risks_stats(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/risks_stats?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}


getValidationRappor(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/validation_rapport?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}


annual_planning(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/planning_annual?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}

getImpactExternalMission(): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${storedUserToken}`);
  return this.http.get(`${this.API_URL}stats/impact_constat?org=${storedOrgId}`, { headers, responseType: 'json' }).pipe(
    tap((response: any) => console.log('Raw Response:', response)),
    catchError(this.handleError)
  );
}


}
