import { Component,OnInit } from '@angular/core';
import {Observable} from 'rxjs'
import { AssignmentApiService } from 'src/app/assignment-api.service';
import { NgToastService } from 'ng-angular-popup';
import { FormGroup,FormControl,Validators } from '@angular/forms'

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  addAsignmentForm = new FormGroup({
    taskName: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
    description: new FormControl('',[Validators.minLength(2),Validators.maxLength(99)]),
    taskTypeId: new FormControl('',[Validators.required]),
    start:new FormControl(Date,[Validators.required]),
    end:new FormControl('0001-01-01T00:00:00'),
    repetitionTask: new FormControl('',[Validators.required]),
    taskStatus: new FormControl('UNSAT'),
    taskArchiveId: new FormControl(2)
  })

  assignmentTypesList$!:Observable<any[]>;

  constructor(private service:AssignmentApiService,private toast: NgToastService) { }

  // Form errors
  get taskName(){
    return this.addAsignmentForm.get('taskName');
  }
  get taskStatus(){
    return this.addAsignmentForm.get('taskStatus');
  }
  get description(){
    return this.addAsignmentForm.get('description');
  }
  get taskTypeId(){
    return this.addAsignmentForm.get('taskTypeId');
  }
  get start(){
    return this.addAsignmentForm.get('start');
  }
  get repetitionTask(){
    return this.addAsignmentForm.get('repetitionTask');
  }

  
  ngOnInit(): void{
  this.assignmentTypesList$ = this.service.getTaskTypeList();
  }

  addAssignment() {
    this.service.addAssignment(this.addAsignmentForm.value).subscribe(res => {
    var closeModalBtn = document.getElementById('add-modal-close');
    if(closeModalBtn){
    closeModalBtn.click();
  }
  this.toast.success({detail:"SUCCESS",summary:'Your task added successfuly'});
  })
}
 
}
