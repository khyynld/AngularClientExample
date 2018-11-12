import { Component, OnInit } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  objectAlert: any;
  contentAlert: string;
  inconAlert: string;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) { }

  closeModal() {
    this.activeModal.close('close');
  }

  ngOnInit() {
  }

}
