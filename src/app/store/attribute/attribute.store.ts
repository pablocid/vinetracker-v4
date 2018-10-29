import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Attribute } from './attribute.model';

export interface AttributeState extends EntityState<Attribute> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'attribute' })
export class AttributeStore extends EntityStore<AttributeState, Attribute> {

  constructor() {
    super();
  }

}

