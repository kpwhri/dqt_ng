export class Value {
    id: number;
    name: string;
    description: string;
    selected = true;
}

export class Category {
  id: number;
  name: string;
  description: string;
  items: Item[];
}

export class DataEntry {
  id: number;
  label: string;
  category: string;
  description: string;
  values: string;
}

export class DataCategory {
  name: string;
  items: DataEntry[];
}

export class Item {
  id: number;
  name: string;
  description: string;
  is_numeric: boolean;
  values: Value[] = null;
  range: string[] = null;
  numericRange: number[] = null;
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


  loadRange(originalEvent, selected: boolean, values: number[], max: string, min: string) {
    this.originalEvent = originalEvent;
    this.selected = selected;
    this.values = [`${values[0]}`, `${values[1]}`];
    if (this.values[0] === min) {
      this.values[0] = '';
    } else if (this.values[1] === max) {
      this.values[1] = '';
    }
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

export class UserForm {
    public name: string;
    public email: string;
    public affiliation: string;
    public reasonForUse: string;

    toJsonString(): any {
      return {
        name: this.name,
        email: this.email,
        affiliation: this.affiliation,
        reasonForUse: this.reasonForUse
      };
    }
}

export class TabConfig {
  public header: string;
  public lines: LineConfig[];
}

export class LineConfig {
  public type: string;
  public text: string;
}


