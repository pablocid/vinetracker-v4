import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { EvaluationsStore, EvaluationsState } from './evaluations.store';
import { Evaluation } from './evaluation.model';

@Injectable({ providedIn: 'root' })
export class EvaluationsQuery extends QueryEntity<EvaluationsState, Evaluation> {

  constructor(protected store: EvaluationsStore) {
    super(store);
  }

}
