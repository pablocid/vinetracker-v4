import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Evaluation } from './evaluation.model';

export interface EvaluationsState extends EntityState<Evaluation> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'evaluations' })
export class EvaluationsStore extends EntityStore<EvaluationsState, Evaluation> {

  constructor() {
    super();
  }

}

