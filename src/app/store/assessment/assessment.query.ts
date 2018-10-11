import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AssessmentStore, AssessmentState } from './assessment.store';

@Injectable({ providedIn: 'root' })
export class AssessmentQuery extends Query<AssessmentState> {

  constructor(protected store: AssessmentStore) {
    super(store);
  }

  lenght() {
    return this.select(s => s.rows.length);
  }

  getRows() {
    return this.select(s => s.rows);
  }

  selectedEspaldera() {
    return this.select(s => s.selection.e);
  }

  selectedHilera() {
    return this.select(s => s.selection.h);
  }

  getCurrentHileras() {
    return this.select(s => {
      if (!s.rows.length || !s.selection.e) { return []; }
      const index = s.rows.map(x => x.espaldera).indexOf(s.selection.e);
      return s.rows[index].hileras;
    });
  }

}
