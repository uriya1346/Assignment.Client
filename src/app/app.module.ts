import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgToastModule } from 'ng-angular-popup'
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CheckboxModule} from 'primeng/checkbox';

import { AppComponent } from './app.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentApiService } from './assignment-api.service';
import { AssignmentListComponent } from './assignment/assignment-list/assignment-list.component';
import { AddAssignmentComponent } from './assignment/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignment/edit-assignment/edit-assignment.component';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentComponent,
    AssignmentListComponent,
    AddAssignmentComponent,
    EditAssignmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
    TableModule,
    ButtonModule,
    BrowserAnimationsModule,  
    CheckboxModule
  ],
  providers: [AssignmentApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
