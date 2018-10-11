import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { EvaluationsService, EvaluationsQuery } from '../../store/evaluations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(
    private evalS: EvaluationsService,
    private evalQ: EvaluationsQuery,
    private router: Router
  ) { }
  public loading$ = this.evalQ.selectLoading();
  public assessmentList$ = this.evalQ.selectAll(); // this.assessmentsQ.list();
  public numAssessments = this.assessmentList$.pipe(map(a => a.length));
  public unSubNumAssessments: Subscription;

  ngOnInit() {

    this.unSubNumAssessments = this.numAssessments.subscribe(list => {
      console.log('list', list);
      if (!list) {
        this.evalS.getAssessments();
        console.log('loading assessments');
      } else { console.log('already load the assessments'); }
    });
  }

  activate(id: string) {
    this.evalS.setActive(id);
    this.router.navigate(['selection']);
  }

  ngOnDestroy() {
    this.unSubNumAssessments.unsubscribe();
  }

}
