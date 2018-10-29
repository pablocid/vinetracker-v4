import { ID } from '@datorama/akita';

export interface Row {
  id: ID;
  location: string;
  selected: string;
  position: number;
  discard: boolean;
  assessable: boolean;
  created: boolean;
  selection: boolean;
  brix: number;
}

export function createRow(params: Partial<Row>) {
  return {
    ...params
  } as Row;
}
