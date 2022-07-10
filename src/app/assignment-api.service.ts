import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentApiService {

  readonly assignmentAPiUrl = "https://localhost:5001/api"

  constructor(private http:HttpClient) { }

  // Assignments
  getAssignmentList():Observable<any[]>{ // Without archive
    return this.http.get<any>(this.assignmentAPiUrl+ '/AppAssignments')
  }
  getAssignmentListWithArchive():Observable<any[]>{ // With archive
    return this.http.get<any>(this.assignmentAPiUrl+ '/AppAssignments/withArchive')
  }
  addAssignment(data:any){
    return this.http.post(this.assignmentAPiUrl+ '/AppAssignments',data)
  }
  updateAssignment(id:number|string, data:any){
    return this.http.put(this.assignmentAPiUrl+ `/AppAssignments/${id}`,data)
  }
  daleteAssignment(id:number|string){
    return this.http.delete(this.assignmentAPiUrl+ `/AppAssignments/${id}`)
  }
  // Type
  getTaskTypeList():Observable<any[]>{
    return this.http.get<any>(this.assignmentAPiUrl+ '/TaskTypes')
  }
  // Status
  getTaskStatusList():Observable<any[]>{
    return this.http.get<any>(this.assignmentAPiUrl+ '/TaskStatusOptions')
  }
  // Archive 
  updateArchiveList(){
     this.http.get(this.assignmentAPiUrl+ `/AppAssignments/updateArchive`).subscribe();
  }

}
