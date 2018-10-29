import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { RowQuery, RowService } from '../../store/row';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AssessmentService, AssessmentQuery } from '../../store/assessment';
import { map, mergeAll } from 'rxjs/operators';
import { merge } from 'rxjs';
import { EvaluationsQuery } from '../../store/evaluations';
import { ToastController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-row',
  templateUrl: './row.page.html',
  styleUrls: ['./row.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowPage implements OnInit {

  constructor(
    private rowQ: RowQuery,
    private rowS: RowService,
    private assessS: AssessmentService,
    private assessQ: AssessmentQuery,
    private evalQ: EvaluationsQuery,
    private router: Router,
    private location: Location,
    public toastController: ToastController,
    private cdr: ChangeDetectorRef,
    private actionSheetController: ActionSheetController
  ) { }

  public reversed = false;

  public isLoggin$ = this.rowQ.selectLoading();

  public hilera$ = this.assessQ.select(s => s.selection.h);
  public espaldera$ = this.assessQ.select(s => s.selection.e);

  public rows$ = this.rowQ.selectAll();
  public position$ = this.rowQ.selectActive().pipe(map(x => x.location));
  public type$ = this.evalQ.selectActive().pipe(map(e => e.position));
  public noEvaluadas$ = this.rows$.pipe(map(r => r.filter(x => x.assessable === true && x.created === false).length));
  public evaluadas$ = this.rows$.pipe(map(r => r.filter(x => x.created === true).length));
  public descartadas$ = this.rows$.pipe(map(r => r.filter(x => x.discard === true).length));
  public restringidas$ = this.rows$.pipe(map(r => r.filter(x => x.assessable === false).length));
  public selected$ = this.rows$.pipe(map(r => r.filter(x => x.selected === 'selected').length));

  public rowConfig$ = this.type$.pipe(
    map(pos => this.rows$.pipe(map(r => {
      return {
        type: pos,
        rows: r
      };
    }))),
    mergeAll()
  );

  ngOnInit() {
    this.rowConfig$.subscribe(x => {
      console.log('row config', x);
    });
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Click to Close',
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Done'
    });
    toast.present();
  }

  public toReverse() {
    this.rowS.reverse();
  }

  public goBack() {
    this.location.back();
  }

  public toAssess(id) {
    // first set row plant & get attributes assessment
    this.rowS.setActive(id);
     this.assessS.getAssessment();
    // then go to route assess (if not there is an error en component factory)
     this.router.navigate(['assess']);
  }

  change() {
    this.cdr.detectChanges();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Cambiar orden de lista',
        icon: 'logo-buffer',
        handler: () => {
          this.toReverse();
          this.cdr.detectChanges();
        }
      },
      {
        text: 'Actualizar',
        role: 'destructive',
        icon: 'sync',
        handler:  () => {
          this.rowS.getRow().then( () => {
            this.cdr.detectChanges();
          });
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
