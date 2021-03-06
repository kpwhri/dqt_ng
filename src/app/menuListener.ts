import {EventItem} from './categories';

export class MenuListener {
  private removeValue: Event<EventItem> = new Event<EventItem>();
  private selectCategory: Event<string> = new Event<string>();
  private selectItem: Event<string[]> = new Event<string[]>();
  private exportFilters: Event<string> = new Event<string>();
  private collapseAll: Event<string> = new Event<string>();
  private navigationMode: Event<string> = new Event<string>();
  private refresh: Event<string> = new Event<string>();  // refresh data

  public get RemoveValue(): IEvent<EventItem> {
    return this.removeValue;
  }

  public get SelectCategory(): IEvent<string> {
    return this.selectCategory;
  }

  public get SelectItem(): IEvent<string[]> {
    return this.selectItem;
  }

  public get ExportFilter(): IEvent<string> {
    return this.exportFilters;
  }

  public get CollapseAll(): IEvent<string> {
    return this.collapseAll;
  }

  public get NavigationMode(): IEvent<string> {
    return this.navigationMode;
  }

  public get Refresh(): IEvent<string> {
    return this.refresh;
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

  triggerExportFilters(arg: string) {
    this.exportFilters.trigger(arg);
  }

  triggerCollapseAll(arg: string) {
    this.collapseAll.trigger(arg);
  }

  triggerNavigationMode(arg: string) {
    this.navigationMode.trigger(arg);
  }

  triggerRefresh(arg: string) {
    this.refresh.trigger(arg);
  }
}

export interface IEvent<T> {
  on(handler: { (data?: T): void }): void;

  off(handler: { (data?: T): void }): void;
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
