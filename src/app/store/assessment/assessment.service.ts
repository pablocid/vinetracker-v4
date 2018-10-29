import { Injectable } from '@angular/core';
import { AssessmentStore } from './assessment.store';
import { StitchService } from '../../services/mongodb-stitch/mongodb-stitch.service';
import { EvaluationsQuery } from '../evaluations';
import { RowQuery } from '../row';
import { AttributeService } from '../attribute';

@Injectable({ providedIn: 'root' })
export class AssessmentService {

  constructor(
    private assessmentStore: AssessmentStore,
    private evalQ: EvaluationsQuery,
    private rowQ: RowQuery,
    private attrS: AttributeService,
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

  public async setEHPfromScanCode(code) {
    const selection = await this.stitch.fromScanToSelection(code);
    this.assessmentStore.setState(s => {
      return {
        ...s,
        selection
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

  public async getAssessment() {
    this.assessmentStore.setLoading(true);
    const schm = this.evalQ.getActiveId();
    const idRef = this.rowQ.getActiveId();
    console.log('Antes de llamar la funcion getassesment');
    const assess = await this.stitch.client.callFunction('getAssessment', [schm, idRef]);

    console.log('assess', assess);
    this.assessmentStore.setState(s => {
      return {
        ...s,
        updated: assess.updated
      };
    });
    this.attrS.setAttrs(assess.attributes);
    this.assessmentStore.setLoading(false);
  }

}
