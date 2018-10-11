import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RowStore, RowState } from './row.store';
import { Row } from './row.model';

@Injectable({ providedIn: 'root' })
export class RowQuery extends QueryEntity<RowState, Row> {

  constructor(protected store: RowStore) {
    super(store);
  }

}
