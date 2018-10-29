import { ID } from '@datorama/akita';

export interface Attribute {
  id: ID;
  value: any;
  config: Config[];
  updateOptions: { push?: boolean, delete?: boolean, pop?: boolean, partial?: any };
  editValue: any;
}

interface Config {
  id: string;
  string: string;
  number: number;
  list: string[];
  listOfObj: { id: string, string: string }[];
  date: Date;
  boolean: Boolean;
  value: any;
}

export function createAttribute(params: Partial<Attribute>) {
  return {
    ...params
  } as Attribute;
}
