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
  categoryId: number;
  itemId: number;
}

export class EventItem {

  id: string = null;
  originalEvent = null;
  selected: boolean;
  values: string[] = null;
  itemId: string = null;

  loadRange(originalEvent, selected: boolean, values: number[]) {
    this.originalEvent = originalEvent;
    this.selected = selected;
    this.values = [`${values[0]}`, `${values[1]}`];
    return this;
  }

  load(originalEvent, id: number, selected: boolean) {
    this.originalEvent = originalEvent;
    this.id = `${id}`;
    this.selected = selected;
    return this;
  }
}

export class AgeGraphClass {
  labels: {} = {};
  datasets: DataItem[];
}

export class DataItem {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
}




