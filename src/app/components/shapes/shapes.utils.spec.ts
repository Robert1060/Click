import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  Shapes,
  createShapeFormGroup,
  roundResult,
  positiveNumberValidator,
  isProperCalculateOption,
} from './shapes.utils';

describe('Shapes Utils', () => {
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    });

    formBuilder = TestBed.inject(FormBuilder);
  });

  describe('Shapes', () => {
    it('should have a list of shapes with parameters', () => {
      const shapes = new Shapes();
      expect(shapes.shapesTypes.length).toBeGreaterThan(0);

      for (const shape of shapes.shapesTypes) {
        expect(shape.name).toBeDefined();
        expect(shape.parameters).toBeDefined();
        expect(shape.parameters.length).toBeGreaterThan(0);
      }
    });
  });

  describe('createShapeFormGroup', () => {
    it('should create a form group with controls for each parameter and rounding options', () => {
      const shapes = new Shapes();
      const circleShape = shapes.shapesTypes.find(
        (shape) => shape.name === 'Circle'
      )!;
      const formGroup = createShapeFormGroup(circleShape, formBuilder);

      expect(formGroup.get('radius')).toBeTruthy();
      expect(formGroup.get('includeRound')).toBeTruthy();
      expect(formGroup.get('roundValue')).toBeTruthy();
    });

    it('should set default values and validators for controls', () => {
      const shapes = new Shapes();
      const circleShape = shapes.shapesTypes.find(
        (shape) => shape.name === 'Circle'
      )!;
      const formGroup = createShapeFormGroup(circleShape, formBuilder);

      expect(formGroup.get('radius')?.value).toBe(0);
      expect(formGroup.get('includeRound')?.value).toBe(false);
      expect(formGroup.get('roundValue')?.value).toBe(0);

      expect(formGroup.get('radius')?.validator).toBeTruthy();
      expect(formGroup.get('includeRound')?.validator).toBeTruthy();
      expect(formGroup.get('roundValue')?.validator).toBeTruthy();
    });
  });

  describe('positiveNumberValidator', () => {
    it('should return null for 0 value', () => {
      const validator = positiveNumberValidator();
      const control = formBuilder.control(0);
      const result = validator(control);

      expect(result).toEqual({ positiveNumber: true });
    });

    it('should return null for negative value', () => {
      const validator = positiveNumberValidator();
      const control = formBuilder.control(-5);
      const result = validator(control);

      expect(result).toEqual({ positiveNumber: true });
    });

    it('should return an error for NaN', () => {
      const validator = positiveNumberValidator();
      const control = formBuilder.control('invalid');
      const result = validator(control);

      expect(result).toEqual({ positiveNumber: true });
    });
    it('should return positiveNumber boolean for positive value', () => {
      const validator = positiveNumberValidator();
      const control = formBuilder.control(5);
      const result = validator(control);
      expect(result).toBeNull();
    });
  });

  describe('roundResult', () => {
    it('should round a number to the specified decimal places', () => {
      const value = 3.14159;

      const result1 = roundResult(value, 2);
      const result2 = roundResult(value, 0);

      expect(result1).toBeCloseTo(3.14);
      expect(result2).toBe(3);
    });

    it('should return the original number if no decimal places specified', () => {
      const value = 3.14159;
      const result = roundResult(value, null);

      expect(result).toBe(value);
    });
  });
  describe('proper calculation option', () => {
    it('should return true for area', () => {
      const result = isProperCalculateOption('area');
      expect(result).toBeTrue();
    });
    it('should return true for perimeter', () => {
      const res = isProperCalculateOption('perimeter');
      expect(res).toBeTrue();
    });
    it('should return false for invalid option', () => {
      const res = isProperCalculateOption('ClickMe');
      expect(res).toBeFalse();
    });
  });
});
