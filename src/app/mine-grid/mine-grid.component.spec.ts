import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineGridComponent } from './mine-grid.component';

describe('MineGridComponent', () => {
  let component: MineGridComponent;
  let fixture: ComponentFixture<MineGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MineGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MineGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
