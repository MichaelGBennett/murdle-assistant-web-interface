import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MurdlePaneComponent } from './murdle-pane.component';

describe('MurdlePaneComponent', () => {
  let component: MurdlePaneComponent;
  let fixture: ComponentFixture<MurdlePaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MurdlePaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MurdlePaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
