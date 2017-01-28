import {EventItem} from "./categories";

export class MenuListener {
  private removeValue: Event<EventItem> = new Event<EventItem>();
  private selectCategory: Event<string> = new Event<string>();
  private selectItem: Event<string[]> = new Event<string[]>();

  public get RemoveValue(): IEvent<EventItem> {
    return this.removeValue;
  }

  public get SelectCategory(): IEvent<string> {
    return this.selectCategory;
  }

  public get SelectItem(): IEvent<string[]> {
    return this.selectItem;
  }

  triggerRemove(e: EventItem) {
    this.removeValue.trigger(e);
  }

  triggerSelectCategory(categoryId: string) {
    this.selectCategory.trigger(categoryId);
  }

  triggerSelectItem(itemId: string, categoryId: string) {
    this.selectItem.trigger([itemId, categoryId]);
  }

}

export interface IEvent<T> {
  on(handler: { (data?: T): void }) : void;
  off(handler: { (data?: T): void }) : void;
}

export class Event<T> implements IEvent<T> {
  private handlers: { (data?: T): void; }[] = [];

  public on(handler: { (data?: T): void }) {
    this.handlers.push(handler);
  }

  public off(handler: { (data?: T): void }) {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  public trigger(data?: T) {
    this.handlers.slice(0).forEach(h => h(data));
  }
}
