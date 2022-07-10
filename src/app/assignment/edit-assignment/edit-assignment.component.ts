import { Component,Input, OnInit } from '@angular/core';
import {Observable} from 'rxjs'
import { AssignmentApiService } from 'src/app/assignment-api.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

  assignmentList$!:Observable<any[]>;
  statusList$!:Observable<any[]>;
  assignmentTypesList$!:Observable<any[]>;

  constructor(private service:AssignmentApiService,private toast: NgToastService) { }


  @Input() assignment: any;
  taskName: string = "";
  id: number = 0;
  taskStatus: string = "";
  description: string = "";
  taskTypeId!: number;
  taskArchiveId!: number;
  start!:string;
  end!:string;
  repetitionTask: string = "";

  ngOnInit(): void{
  this.taskName = this.assignment.taskName;
  this.id = this.assignment.id;
  this.taskStatus = this.assignment.taskStatus;
  this.description = this.assignment.description;
  this.start = this.assignment.start;
  this.end = this.assignment.end;
  this.taskTypeId = this.assignment.taskTypeId;
  this.taskArchiveId = this.assignment.taskArchiveId;
  this.repetitionTask = this.assignment.repetitionTask;
  this.statusList$ = this.service.getTaskStatusList();
  this.assignmentList$ = this.service.getAssignmentList();
  this.assignmentTypesList$ = this.service.getTaskTypeList();
  }

  updateAssignment() {
    var assignment = {
    id:this.id,
    taskName:this.taskName,
    taskStatus:this.taskStatus,
    description:this.description,
    repetitionTask: this.repetitionTask,
    taskTypeId: this.taskTypeId,
    taskArchiveId: this.taskArchiveId,
    start: this.start,
    end: this.end
    }
    var id:number = this.id;
    this.service.updateAssignment(id,assignment).subscribe(res => {
    var closeModalBtn = document.getElementById('edit-modal-close');
    if(closeModalBtn){
    closeModalBtn.click();
  }
  this.toast.success({detail:"SUCCESS",summary:'Your task updated successfuly'});
  })
}
 
}
