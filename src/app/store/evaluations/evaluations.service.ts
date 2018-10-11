import { Injectable } from '@angular/core';
import { EvaluationsStore } from './evaluations.store';
import { StitchService } from '../../services/mongodb-stitch/mongodb-stitch.service';

@Injectable({ providedIn: 'root' })
export class EvaluationsService {

  constructor(
    private evaluationsStore: EvaluationsStore,
    private stitch: StitchService
  ) {
  }

  public async getAssessments() {
    this.evaluationsStore.setLoading(true);
    const results = await this.stitch.client.callFunction('getAssessments', []);
    this.evaluationsStore.set(results);
    this.evaluationsStore.setLoading(false);
  }

  public setActive(id: string) {
    console.log('id', id);
    this.evaluationsStore.setActive(id);
  }

}
