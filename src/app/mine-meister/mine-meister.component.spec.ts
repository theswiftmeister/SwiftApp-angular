import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineMeisterComponent } from './mine-meister.component';

describe('MineMeisterComponent', () => {
  let component: MineMeisterComponent;
  let fixture: ComponentFixture<MineMeisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MineMeisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MineMeisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
