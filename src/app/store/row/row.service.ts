import { Injectable } from '@angular/core';
import { RowStore } from './row.store';
import { EvaluationsQuery } from '../evaluations';
import { StitchService } from '../../services/mongodb-stitch/mongodb-stitch.service';
import { AssessmentQuery } from '../assessment';
import { RowQuery } from './row.query';
import { ID } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class RowService {

  constructor(
    private rowStore: RowStore,
    private rowQ: RowQuery,
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
    const results = await this.stitch.client.callFunction('getHilera', [E, H, assessSchm]);
    this.rowStore.set(results);
    this.rowStore.setLoading(false);
  }

  public async setSingleItemRow() {
    this.rowStore.setLoading(true);
    const assessSchm = this.evalQ.getActive().id;
    const rowId = this.assessQ.getSnapshot().selection.id;

    try {
      console.log('IDS row assesSchm', rowId, assessSchm);
      const results = await this.stitch.client.callFunction('getPlant', [rowId, assessSchm]);
      console.log('this.stitch.client.callFunction(getPlant', results);
      this.rowStore.set([results]);
      this.rowStore.setActive(rowId);
    } catch (error) {
      console.log('error en updateRowItem', error);
    }
  }

  public async updateRowItem(assessSchm?: ID, rowId?: ID) {
    assessSchm = assessSchm ? assessSchm : this.evalQ.getActive().id;
    rowId = rowId ? rowId : this.rowQ.getActiveId();

    try {
      console.log('IDS row assesSchm', rowId, assessSchm);
      const results = await this.stitch.client.callFunction('getPlant', [rowId, assessSchm]);
      console.log('this.stitch.client.callFunction(getPlant', results);
      this.rowStore.update(rowId, results);
    } catch (error) {
      console.log('error en updateRowItem', error);
    }

  }

  public reverse() {
    this.rowStore.set(this.rowQ.getAll().reverse());
  }

  public setActive(id) {
    this.rowStore.setActive(id);
  }

  public async updateAttr(plantId, attrId, value, opts) {
    const assessId = this.evalQ.getActive().id;
    const result = await this.stitch.client.callFunction('updateAttr', [plantId, assessId, attrId, value, opts]);
    console.log('updateAttr', result);
    const item = await this.stitch.client.callFunction('getPlant', [plantId, assessId]);
    this.rowStore.update(plantId, item);
    return;
  }

}
