import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Row } from './row.model';

export interface RowState extends EntityState<Row> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'row' })
export class RowStore extends EntityStore<RowState, Row> {

  constructor() {
    super();
  }

}

