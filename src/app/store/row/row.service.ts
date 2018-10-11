import { Injectable } from '@angular/core';
import { RowStore } from './row.store';
import { EvaluationsQuery } from '../evaluations';
import { StitchService } from '../../services/mongodb-stitch/mongodb-stitch.service';
import { AssessmentQuery } from '../assessment';

@Injectable({ providedIn: 'root' })
export class RowService {

  constructor(
    private rowStore: RowStore,
    private evalQ: EvaluationsQuery,
    private assessQ: AssessmentQuery,
    private stitch: StitchService
  ) {
  }

  public async getRow() {
    this.rowStore.setLoading(true);
    const assessSchm = this.evalQ.getActive().id;
    const E = this.assessQ.getSnapshot().selection.e;
    const H = this.assessQ.getSnapshot().selection.h;
    console.log('E, H, assessSchm', E, H, assessSchm);
    const results = await this.stitch.client.callFunction('getHileraF1', [E, H, assessSchm]);
    this.rowStore.set(results);
    this.rowStore.setLoading(false);
  }

}
