import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AssessmentQuery, AssessmentService } from '../../store/assessment';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rows-modal',
  templateUrl: './rows-modal.component.html',
  styleUrls: ['./rows-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowsModalComponent implements OnInit, OnDestroy {
  url: any;

  constructor(
    private assessQ: AssessmentQuery,
    private assessS: AssessmentService,
    private modalCtrl: ModalController
  ) { }

  public rowsLength$ = this.assessQ.lenght();
  private unSubRows: Subscription;
  public rows$ = this.assessQ.getRows();

  public loading$ = this.assessQ.selectLoading();
  public espaldera$ = this.assessQ.selectedEspaldera();
  public hilera$ = this.assessQ.selectedHilera();
  public hileras$ = this.assessQ.getCurrentHileras();

  ngOnInit() {
    console.log('url ', this.url);
    this.unSubRows = this.rowsLength$.subscribe(list => {
      console.log('list', list);
      if (!list) {
        this.assessS.setRowsAndColumns();
        console.log('loading rows');
      } else { console.log('already load the rows'); }
    });
  }

  ngOnDestroy() {
    this.unSubRows.unsubscribe();
  }

  exit(ready?: boolean) {
    this.modalCtrl.dismiss(ready);
  }

  select(e: number, h: number) {
    this.assessS.setEspalderaHilera(e, h);
    this.exit();
  }

  setE(e: number) {
    this.assessS.setEspaldera(e);
  }

  unsetE() {
    this.assessS.unsetEspaldera();
  }

  setH(h: number) {
    this.assessS.setHilera(h);
  }

  unsetH() {
    this.assessS.unsetHilera();
  }

  ready() {
    this.exit();
  }

}
