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

  id: string = null;  // value id
  originalEvent = null;
  selected: boolean;
  values: string[] = null;  // only present for range
  value: string = null;  // only present for non-range
  item: string = null;
  itemId: string = null;
  category: string = null;
  categoryId: string = null;


  loadRange(originalEvent, selected: boolean, values: number[]) {
    this.originalEvent = originalEvent;
    this.selected = selected;
    this.values = [`${values[0]}`, `${values[1]}`];
    return this;
  }

  load(originalEvent, id: number, selected: boolean, value: any) {
    this.value = `${value}`;
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
export class EnrollGraphClass {
  labels: string[] = [];
  datasets: PieDataItem[];
}

export class PieDataItem {
  data: number[];
  backgroundColor: string[];
  hoverBackgroundColor: string[];
}

export class SubjectTableDataItem {
  header: string;
  value: string;
}




