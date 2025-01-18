import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamundaService {

  constructor(private http: HttpClient) { }

  startProcess(name: string): Observable<string> {
    const url = `http://localhost:8088/camunda/start-process/${name}`;
    return this.http.post<any>(url, null, { responseType: 'text' as 'json'});
  }


  completeTask(variables?: any): Observable<any> {
    const url = 'http://localhost:8088/camunda/task/complete';

    return this.http.post<any>(url, variables || {}, { responseType: 'text' as 'json'});
  }

  changeTaskStatus(processInstanceId: string, taskDefinitionKey: string, assignee?: string): Observable<string> {
    let params = new HttpParams()
      .set('processInstanceId', processInstanceId)
      .set('taskDefinitionKey', taskDefinitionKey);

    if (assignee) {
      params = params.set('assignee', assignee);
    }

    return this.http.put('http://localhost:8088/camunda/task/change-status', null, { params, responseType: 'text' });
  }

  getAllTasks(): Observable<string> {
    return this.http.get('http://localhost:8088/camunda/tasks', { responseType: 'text' });
  }

  setTaskVariables(taskDefinitionKey: string, processInstanceId: string, variables: any): Observable<string> {
    return this.http.put('http://localhost:8088/camunda/task/set-variables', variables, {
      params: {
        taskDefinitionKey,
        processInstanceId
      },
      responseType: 'text'
    });
  }
}
