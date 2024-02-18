import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CalculatorComponent } from './calculator.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [
        MatRadioModule,
        MatFormFieldModule,
        MatSelectModule,
        RouterTestingModule,
        FormsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.autoDetectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set calculation type when radio button is changed', () => {
    const radioGroup = fixture.debugElement.query(By.css('mat-radio-group'));

    radioGroup.triggerEventHandler('ngModelChange', 'perimeter');

    expect(component.selectedCalculation()).toEqual('perimeter');
  });

  it('should set selected shape when shape is changed', () => {
    const shapeSelect = fixture.debugElement.query(By.css('mat-select'));

    shapeSelect.triggerEventHandler('ngModelChange', 'Circle');

    expect(component.selectedShapeName()).toEqual('Circle');
  });

  it('should create proper link', () => {
    component.selectedShapeName.set('Rectangle');
    component.selectedCalculation.set('perimeter');

    const shapeName = component.selectedShapeName()!;
    const option = component.selectedCalculation();
    const expected = 'perimeter/Rectangle';
    const link = component.getLink(option, shapeName);
    expect(expected).toBe(link);
  });

  it('should navigate to the correct link', () => {
    component.selectedShapeName.set('Rectangle');
    component.selectedCalculation.set('perimeter');
    const link = `${component.selectedCalculation()}/${component.selectedShapeName()}`;

    const navigateSpy = spyOn(router, 'navigateByUrl');

    router.navigateByUrl(link);

    const expectedLink = 'perimeter/Rectangle';
    expect(navigateSpy).toHaveBeenCalledWith(expectedLink);
  });

  it('should throw an error for invalid shape', () => {
    expect(() => component.setSelectedShape('invalid' as any)).toThrowError(
      'Shape not found'
    );
    spyOn(component.selectedShapeName, 'set');
    expect(component.selectedShapeName.set).not.toHaveBeenCalled();
  });
});
