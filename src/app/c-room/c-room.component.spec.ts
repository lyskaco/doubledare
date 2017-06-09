import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRoomComponent } from './c-room.component';

describe('CRoomComponent', () => {
  let component: CRoomComponent;
  let fixture: ComponentFixture<CRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
