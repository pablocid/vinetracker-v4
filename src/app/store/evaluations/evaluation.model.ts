import { ID } from '@datorama/akita';

export interface Evaluation {
  id: ID;
  label: string;
  editable: boolean;
  season: number;
  position: number;
}

export function createEvaluation(params: Partial<Evaluation>) {
  return {
    ...params
  } as Evaluation;
}
