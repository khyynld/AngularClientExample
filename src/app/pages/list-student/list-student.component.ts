import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AddStudentComponent } from '../add-student/add-student.component';
import { StudentsService } from '../services/students.service';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { DeleteStudentComponent } from '../delete-student/delete-student.component';

@Component({
  selector: 'ngx-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})

export class ListStudentComponent implements OnInit {
  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
      columnTitle: '',
      custom: [
        { name: 'edit', title: '<i class="fa fa-edit"></i>' },
        { name: 'delete', title: '<i class="fa fa-trash-alt"></i>' }],
      position: 'left',
    },
    columns: {
      name: {
        title: 'Fullname',
        type: 'string',
      },
      classs: {
        title: 'Class',
        type: 'string',
      },
      phonenumber: {
        title: 'Phonenumber',
        type: 'string',
      },
      address: {
        title: 'Address',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  listData: any[] = [];

  constructor(
    private _svService: StudentsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._svService.getAllStudent().subscribe((data: any) => {
      data.data.forEach(element => {
        let newItem = {
          id: element.studentData.stID,
          name: element.studentData.name,
          classs: element.studentData.class,
          phonenumber: element.studentData.phonenumber,
          address: element.studentData.address
        }
        this.listData.push(newItem);
      });
      this.source.load(this.listData);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        throw new Error('Client side Error');
      }
      else {
        throw new Error('Client side Error');
      }
    });
  }

  showModalAddStudent() {
    const activeModal = this.modalService.open(AddStudentComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Add new student';
    activeModal.result.then((event) => {
      switch (event) {
        case 'close':
          break;
        case 'addOk':
          while (this.listData.length > 0) {
            this.listData.pop();
          }
          this.getData();
          break;
        default:
      }
    })

  }

  showModalEdit(data: any) {
    const activeModal = this.modalService.open(EditStudentComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Edit student';
    activeModal.componentInstance.objectRow = data;
    activeModal.result.then((event) => {
      switch (event) {
        case 'close':
          break;
        case 'editOk':
          while (this.listData.length > 0) {
            this.listData.pop();
          }
          this.getData();
          break;
        default:
      }
    })
  }

  showModalDelete(data: any) {
    const activeModal = this.modalService.open(DeleteStudentComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Delete student';
    activeModal.componentInstance.objectRow = data;
    activeModal.result.then((event) => {
      switch (event) {
        case 'close':
          break;
        case 'deleteOk':
          while (this.listData.length > 0) {
            this.listData.pop();
          }
          this.getData();
          break;
        default:
      }
    })
  }

  onCustom(event) {
    if (event.action == 'edit') {
      this.showModalEdit(event.data);
    }
    if (event.action == 'delete') {
      this.showModalDelete(event.data);
    }
  }
}
