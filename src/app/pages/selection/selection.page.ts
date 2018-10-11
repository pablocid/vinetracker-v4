import { Component, OnInit } from '@angular/core';
import { EvaluationsQuery } from '../../store/evaluations';
import { ModalController } from '@ionic/angular';
import { RowsModalComponent } from '../../components/rows-modal/rows-modal.component';
import { Router } from '@angular/router';
import { RowService } from '../../store/row';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.page.html',
  styleUrls: ['./selection.page.scss'],
})
export class SelectionPage implements OnInit {

  constructor(
    private evalQ: EvaluationsQuery,
    public modalController: ModalController,
    public router: Router,
    public rowS: RowService
  ) { }

  public assessmentName$ = this.evalQ.selectActive(s => s.label);

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
      this.rowS.getRow();
      this.router.navigate(['row']);
    }
  }

  getCode(code: string) {
    console.log('CODE', code);
    if (code) {
      alert(code);
    }
  }

}
