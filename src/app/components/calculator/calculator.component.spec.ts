import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CalculatorComponent } from './calculator.component';
import { Shapes } from '../shapes/shapes.utils';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [
        MatRadioModule,
        MatFormFieldModule,
        MatSelectModule,
        RouterTestingModule,
        FormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set calculation type when radio button is changed', () => {
    const radioGroup = fixture.debugElement.query(By.css('mat-radio-group'));

    radioGroup.triggerEventHandler('ngModelChange', 'perimeter');
    fixture.detectChanges();

    expect(component.selectedCalculation()).toEqual('perimeter');
  });

  it('should set selected shape when shape is changed', () => {
    const shapeSelect = fixture.debugElement.query(By.css('mat-select'));

    shapeSelect.triggerEventHandler('ngModelChange', 'Circle');
    fixture.detectChanges();

    expect(component.selectedShape()!.name).toEqual('Circle');
  });

  it('should navigate to the correct link when "Next" button is clicked', () => {
    const shapeSelect = fixture.debugElement.query(By.css('mat-select'));

    shapeSelect.triggerEventHandler('ngModelChange', 'Square');
    fixture.detectChanges();

    const navigateSpy = spyOn(router, 'navigateByUrl');
    const nextButton = fixture.debugElement.query(By.css('button'));

    nextButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const expectedLink = `${component.selectedCalculation()}/Square`;
    expect(navigateSpy).toHaveBeenCalledWith(expectedLink);
  });
});
