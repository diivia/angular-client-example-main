import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextKeyComponent } from './text-key.component';

describe('TextkeyComponent', () => {
  let component: TextKeyComponent;
  let fixture: ComponentFixture<TextKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
