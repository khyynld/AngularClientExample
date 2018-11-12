import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-delete-Student',
  templateUrl: './delete-Student.component.html',
  styleUrls: ['./delete-Student.component.scss']
})
export class DeleteStudentComponent implements OnInit {

  modalHeader: string;
  objectRow: any;

  id: string;

  constructor(
    private _svService: StudentsService,
    private activeModal: NgbActiveModal,
  ) { }

  closeModal() {
    this.activeModal.close('close');
  }

  ngOnInit() {
    this.dataInitial();
  }

  dataInitial(){
    this.id = this.objectRow.id;
  }
  
  onSubmit(){
    let body = {
      stID: this.id
    }
    this._svService.deleteStudent(JSON.stringify(body)).subscribe((data: any) => {
      this.activeModal.close('deleteOk');
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        throw new Error('Client side Error');
      }
      else {
        throw new Error('Client side Error');
      }
    }
    );
  }
}
