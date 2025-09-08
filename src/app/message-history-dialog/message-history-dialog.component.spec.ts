import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHistoryDialogComponent } from './message-history-dialog.component';

describe('MessageHistoryDialogComponent', () => {
  let component: MessageHistoryDialogComponent;
  let fixture: ComponentFixture<MessageHistoryDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageHistoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
