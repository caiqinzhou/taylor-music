import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicalNotationTrainingComponent } from './musical-notation-training.component';

describe('MusicalNotationTrainingComponent', () => {
  let component: MusicalNotationTrainingComponent;
  let fixture: ComponentFixture<MusicalNotationTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicalNotationTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicalNotationTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
