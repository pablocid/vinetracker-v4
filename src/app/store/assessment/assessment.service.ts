import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { AssessmentStore } from './assessment.store';
import { HttpClient } from '@angular/common/http';
import { StitchService } from '../../services/mongodb-stitch/mongodb-stitch.service';

@Injectable({ providedIn: 'root' })
export class AssessmentService {

  constructor(
    private assessmentStore: AssessmentStore,
    private stitch: StitchService
  ) {
  }

  async setRowsAndColumns() {
    this.assessmentStore.setLoading(true);
    const rows = await this.stitch.client.callFunction('getHilerasAndEspalderas', []);
    this.assessmentStore.setState(s => {
      return { ...s, rows };
    });
    this.assessmentStore.setLoading(false);
  }

  public setEspalderaHilera(e: number, h: number) {
    this.assessmentStore.setState(s => {
      return {
        ...s,
        selection: {
          ...s.selection, e, h
        }
      };
    });
  }

  public setEspaldera(e: number) {
    this.assessmentStore.setState(s => {
      return {
        ...s,
        selection: {
          ...s.selection, e
        }
      };
    });
  }

  public unsetEspaldera() {
    this.assessmentStore.setState(s => {
      return {
        ...s,
        selection: {
          ...s.selection, e: undefined, h: undefined
        }
      };
    });
  }

  public setHilera(h: number) {
    this.assessmentStore.setState(s => {
      return {
        ...s,
        selection: {
          ...s.selection, h
        }
      };
    });
  }

  public unsetHilera() {
    this.assessmentStore.setState(s => {
      return {
        ...s,
        selection: {
          ...s.selection, h: undefined
        }
      };
    });
  }

}
