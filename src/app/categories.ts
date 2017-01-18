export class Value {
    id: number;
    name: string;
    description: string;
    selected: boolean = true;
}

export class Category {
  id: number;
  name: string;
  description: string;
  items: Item[];
}

export class Item {
  id: number;
  name: string;
  description: string;
  is_numeric: boolean;
  values: Value[] = null;
  range: number[] = null;
}

export class SearchResult {
  id: number;
  name: string;
  description: string;
  type: string;
}




