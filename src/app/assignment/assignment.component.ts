import { Component, OnInit } from '@angular/core';
import { AssignmentApiService } from 'src/app/assignment-api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  constructor(private service: AssignmentApiService,private toast: NgToastService) { }

  ngOnInit(): void {
  }

}
