import { ID } from '@datorama/akita';

export interface Row {
  id: ID;
  location: string;
  selected: string;
  position: number;
  discard: boolean;
}

export function createRow(params: Partial<Row>) {
  return {
    ...params
  } as Row;
}
