import { Injectable } from '@angular/core';
import { AttributeStore } from './attribute.store';
import { Attribute } from './attribute.model';
import { StitchService } from '../../services/mongodb-stitch/mongodb-stitch.service';
import { RowQuery } from '../row';
import { EvaluationsQuery } from '../evaluations';
import { AttributeQuery } from './attribute.query';

@Injectable({ providedIn: 'root' })
export class AttributeService {

  constructor(
    private attributeStore: AttributeStore,
    private stitch: StitchService,
    private rowQ: RowQuery,
    private evalQ: EvaluationsQuery,
    private attrQ: AttributeQuery
  ) {

  }

  setAttrs(attr: Attribute[]) {
    this.attributeStore.set(attr);
  }

  setEditValue() {
    this.attributeStore.updateActive(x => ({ editValue: x.value }));
  }

  setActive(id) {
    this.attributeStore.setActive(id);
    this.setEditValue();
  }

  async updateActiveAttr(value, opts: any, entity: boolean) {
    this.attributeStore.setLoading(true);
    const plantId = this.rowQ.getActiveId();
    const assessId = this.evalQ.getActiveId();
    const attrId = this.attrQ.getActiveId();
    // stitch function updateAttr

    if (entity) {
      console.log('updateEntity params', [plantId, assessId, value, opts]);
      const result = await this.stitch.client.callFunction('updateEntity', [plantId, attrId, value, opts]);
      console.log('results updateAttr call ', result);
    } else {
      console.log('updateAttr params', [plantId, assessId, attrId, value, opts]);
      const result = await this.stitch.client.callFunction('updateAttr', [plantId, assessId, attrId, value, opts]);
      console.log('results updateAttr call ', result);
    }

    this.attributeStore.setLoading(false);
  }

}
