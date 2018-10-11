import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AssessmentState {
  rows: { espaldera: number, hileras: number[] }[];
  selection: { e: number, h: number, p: number };
}

export function createInitialState(): AssessmentState {
  return {
    rows: [],
    selection: { e: undefined, h: undefined, p: undefined }
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'assessment' })
export class AssessmentStore extends Store<AssessmentState> {

  constructor() {
    super(createInitialState());
  }


}
