import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../alert/alert.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  modalHeader: string
  contentAlert: string;
  iconAlert: string;
  objectRow: any;

  id: string;
  name: string;
  classs: string;
  phonenumber: string;
  address: string;

  constructor(
    private _svService: StudentsService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  closeModal() {
    this.activeModal.close('close');
  }

  ngOnInit() {
    this.dataInitial();
  }

  dataInitial() {
    this.id = this.objectRow.id;
    this.name = this.objectRow.name;
    this.classs = this.objectRow.classs;
    this.phonenumber = this.objectRow.phonenumber;
    this.address = this.objectRow.address;
  }

  onSubmit() {
    let body = {
      stID: this.id,
      name: this.name,
      class: this.classs,
      phonenumber: this.phonenumber,
      address: this.address,
    }
    this._svService.editStudent(JSON.stringify(body)).subscribe((data: any) => {
      this.activeModal.close('editOk');
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        throw new Error('Client side Error');
      }
      else {
        this.activeModal.close();
        let infoOfAlert = {
          content: 'Có lỗi xảy ra, vui lòng kiểm tra và thử lại sau !',
          icon: 'fa fa-exclamation-triangle',
          success: false,
        }
        this.alertMessage(infoOfAlert);
        console.log(err);
      }
    }
    );
  }

  alertMessage(infoOfAlert) {
    const activeModal = this.modalService.open(AlertComponent, { size: 'sm', container: 'nb-layout', backdrop: 'static', keyboard: false });
    activeModal.componentInstance.contentAlert = infoOfAlert.content;
    activeModal.componentInstance.objectAlert = infoOfAlert;
  }
}
