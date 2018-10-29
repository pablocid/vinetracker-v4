import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AttributeStore, AttributeState } from './attribute.store';
import { Attribute } from './attribute.model';

@Injectable({ providedIn: 'root' })
export class AttributeQuery extends QueryEntity<AttributeState, Attribute> {

  constructor(protected store: AttributeStore) {
    super(store);
  }

  getIds() {
    return this.getIds();
  }

  selectIds() {
    return this.select(s => s.ids);
  }

}
