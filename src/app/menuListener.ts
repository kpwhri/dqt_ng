import {EventItem} from "./categories";

export class MenuListener {
  private removeValue: Event<EventItem> = new Event<EventItem>();

  public get RemoveValue(): IEvent<EventItem> {
    return this.removeValue;
  }

  triggerRemove(e: EventItem) {
    this.removeValue.trigger(e);
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
