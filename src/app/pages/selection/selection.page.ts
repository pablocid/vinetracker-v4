import { Component, OnInit } from '@angular/core';
import { EvaluationsQuery } from '../../store/evaluations';
import { ModalController } from '@ionic/angular';
import { RowsModalComponent } from '../../components/rows-modal/rows-modal.component';
import { Router } from '@angular/router';
import { RowService } from '../../store/row';
import { AssessmentService } from '../../store/assessment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage implements OnInit {

  constructor(
    private evalQ: EvaluationsQuery,
    private assessS: AssessmentService,
    public modalController: ModalController,
    public router: Router,
    public rowS: RowService,
    public location: Location
  ) { }

  public assessmentName$ = this.evalQ.selectActive(s => s.label);

  public goBack() {
    this.location.back();
  }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: RowsModalComponent,
      componentProps: { value: 123 }
    });
    await modal.present();
    const diss = await modal.onDidDismiss();
    console.log('dissmissed', diss);
    if (diss.data) {
      this.router.navigate(['row']);
      this.rowS.getRow();
    }
  }

  async getCode(code: string) {
    console.log('CODE', code);
    if (code) {
      await this.assessS.setEHPfromScanCode(code);
      this.rowS.getRow();
      this.router.navigate(['row']);
    }
  }

  async singleAssessment(code: string) {
    console.log('CODE', code);
    if (code) {
      await this.assessS.setEHPfromScanCode(code);
      await this.rowS.setSingleItemRow();
      this.router.navigate(['assess']);
    }
  }

}
