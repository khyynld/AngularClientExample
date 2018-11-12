import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentsService } from '../services/students.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'ngx-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  modalHeader: string;

  id: string;
  name: string;
  classs: string;
  phonenumber: string;
  address: string;

  constructor(
    private activeModal: NgbActiveModal,
    private _svService: StudentsService,
    private modalService: NgbModal
  ) { }

  closeModal() {
    this.activeModal.close('close');
  }

  ngOnInit() {
  }

  onSubmit() {
    let body = {
      stID: this.id,
      name: this.name,
      class: this.classs,
      phonenumber: this.phonenumber,
      address: this.address,
    }
    this._svService.addStudent(JSON.stringify(body)).subscribe(() => {
      this.activeModal.close('addOk');
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
