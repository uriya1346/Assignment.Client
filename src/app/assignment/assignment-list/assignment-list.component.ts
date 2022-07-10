import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentApiService } from 'src/app/assignment-api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {

  assignmentList$!:Observable<any[]>;
  tempList$!:Observable<any[]>;
  assignmentTypesList$!:Observable<any[]>;
  assignmentTypesList:any=[];

    // Map to display data asso Map<k, v> foreign keys
    assignmentTypesMap:Map<number, string> = new Map();
    constructor(private service: AssignmentApiService,private toast: NgToastService) { }

    ngOnInit(): void {
      this.service.updateArchiveList();
      this.assignmentList$ = this.service.getAssignmentList();
      this.assignmentTypesList = this.service.getTaskTypeList();
      this.refreshAssignmentsTypesMap();
      this.loading = false;
    }
    
    // Varibles (properties)
    modalTitle:string = "";
    activateAddEditAssignmentComponent:boolean = false;
    assignment:any;
    archiveListFlag:boolean = false;
    loading: boolean = true;
    selectedRows: Array<any> = [];
    index: number = 0;
    
    modalAdd(){
      this.assignment ={
        id:0,
        name: null,
        description: null,
        status:null,
        taskTypeId:null
      }
      this.activateAddEditAssignmentComponent = true;
    }
  
    modalEdit(item:any){
      this.assignment = item;
      this.activateAddEditAssignmentComponent = true;
    }
  
    modalClose(){
      this.activateAddEditAssignmentComponent = false;
      this.assignmentList$ = this.service.getAssignmentList();
    }

    deleteTask(item:any){
      if(confirm(`Are you sure you want to delete ${item.name} task?`))
      this.service.daleteAssignment(item.id).subscribe(res =>{
      this.toast.success({detail:"SUCCESS",summary:'Your task deleted successfully'});
      this.assignmentList$ =this.service.getAssignmentList();
      })
    }
  
    updateSat(item:any){
      item.taskStatus = "SAT"
      this.service.updateAssignment(item.id,item).subscribe();
    } 

    updateUnsat(item:any){
      item.taskStatus = "UNSAT"
      this.service.updateAssignment(item.id,item).subscribe();
    } 

    sendPullArchive(item:any){
      if(item.taskArchiveId == 2 ){
        item.taskArchiveId = 1
        this.service.updateAssignment(item.id,item).subscribe(res =>{
          this.toast.success({detail:"SUCCESS",summary:'Task sended to archive successfully'});
          if(this.archiveListFlag) {
            this.assignmentList$ =this.service.getAssignmentListWithArchive();  
          }
          else this.assignmentList$ =this.service.getAssignmentList();
          })
        }
      else {
        item.taskArchiveId = 2
        this.service.updateAssignment(item.id,item).subscribe(res =>{
          this.toast.success({detail:"SUCCESS",summary:'Task pulled from archive successfully'});
          this.assignmentList$ =this.service.getAssignmentListWithArchive();  
        })
      }
    }
    
    refreshAssignmentsTypesMap(){
      this.service.getTaskTypeList().subscribe(data => {
        this.assignmentTypesList = data;
        for(let i=0; i<data.length; i++){
        this.assignmentTypesMap.set(this.assignmentTypesList[i].id,this.assignmentTypesList[i].taskTypeName);
        }
      })
    }
  
    toggleArchiveList(){
      //GET all tasks with arcive
      // (Pull)
      if(!this.archiveListFlag){
        this.assignmentList$ = this.service.getAssignmentListWithArchive();
        this.archiveListFlag = true;
      }
      // (Push)
      //GET all tasks without archive
      else{
         this.assignmentList$ = this.service.getAssignmentList();
         this.archiveListFlag = false;
      }
  }
  
// i chose to use setTimeout because i tried to use an async function to update assignmentList$ after the loop, but it didn't work(i'm sure there is a better way, but i couldn't solve it)
  deleteMany(){
    if(confirm(`Are you sure you want to delete all this selected tasks?`)){
    this.selectedRows.forEach((currentValue,index) => {
      this.service.daleteAssignment(currentValue.id).subscribe()
    });
    setTimeout(function() {
      window.location.reload()
    }, 500);  }
}

 sendManyToArchive() { 
   if(confirm(`Are you sure you want to send all this selected tasks to archive?`)){
       this.selectedRows.forEach((currentValue, index) => {
       currentValue.taskArchiveId = 1;
       this.service.updateAssignment(currentValue.id, currentValue).subscribe();
      });
    }
    setTimeout(function() {
      window.location.reload()
    }, 500);

  }

}
  