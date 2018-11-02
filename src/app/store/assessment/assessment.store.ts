import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AssessmentState {
  rows: { espaldera: number, hileras: number[] }[];
  selection: { e: number, h: number, p: number, id: string };
  updated: { user: 'string', date: 'string' }[];
}

export function createInitialState(): AssessmentState {
  return {
    rows: [],
    selection: { e: undefined, h: undefined, p: undefined, id: undefined },
    updated: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'assessment' })
export class AssessmentStore extends Store<AssessmentState> {

  constructor() {
    super(createInitialState());
  }


}
