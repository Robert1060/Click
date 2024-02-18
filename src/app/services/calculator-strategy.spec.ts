import { ShapeParams } from '../model';
import { roundResult } from '../components/shapes/shapes.utils';
import {
  AreaCalculation,
  PerimeterCalculation,
  Context,
} from './calculator-strategy';

describe('AreaCalculation', () => {
  let areaCalculation: AreaCalculation;

  beforeEach(() => {
    areaCalculation = new AreaCalculation();
  });

  it('should calculate area for a circle', () => {
    const params: ShapeParams = {
      name: 'Circle',
      params: { radius: 5 },
      calcType: 'area',
    };
    const result = areaCalculation.calculate(params);
    expect(result).toBeCloseTo(Math.PI * 5 * 5, 6);
  });

  it('should calculate area for a square', () => {
    const params: ShapeParams = {
      name: 'Square',
      params: { sideLength: 5 },
      calcType: 'area',
    };
    const result = areaCalculation.calculate(params);
    expect(result).toEqual(25);
  });

  it('should calculate area for a rectangle', () => {
    const params: ShapeParams = {
      name: 'Rectangle',
      params: { width: 5, length: 5 },
      calcType: 'area',
    };
    const result = areaCalculation.calculate(params);
    expect(result).toEqual(25);
  });

  it('should calculate area for a triangle', () => {
    const params: ShapeParams = {
      name: 'Triangle',
      calcType: 'area',
      params: { baseLength: 5, height: 5 },
    };
    const result = areaCalculation.calculate(params);
    expect(result).toEqual(12.5);
  });

  it('should throw an error for an unsupported shape', () => {
    const params: any = { name: 'UnsupportedShape', params: {} };
    expect(() => areaCalculation.calculate(params)).toThrowError(
      'Provided shape is not supported'
    );
  });
});

describe('PerimeterCalculation', () => {
  let perimeterCalculation: PerimeterCalculation;

  beforeEach(() => {
    perimeterCalculation = new PerimeterCalculation();
  });

  it('should calculate perimeter for a circle', () => {
    const params: ShapeParams = {
      name: 'Circle',
      params: { radius: 5 },
      calcType: 'perimeter',
    };
    const result = perimeterCalculation.calculate(params);
    expect(result).toBeCloseTo(2 * Math.PI * 5);
  });

  it('should calculate perimeter for a square', () => {
    const params: ShapeParams = {
      name: 'Square',
      params: { sideLength: 5 },
      calcType: 'perimeter',
    };
    const result = perimeterCalculation.calculate(params);
    expect(result).toEqual(20);
  });

  it('should calculate perimeter for a rectangle', () => {
    const params: ShapeParams = {
      name: 'Rectangle',
      params: { width: 5, length: 5 },
      calcType: 'perimeter',
    };
    const result = perimeterCalculation.calculate(params);
    expect(result).toEqual(20);
  });

  it('should calculate perimeter for a triangle', () => {
    const params: ShapeParams = {
      name: 'Triangle',
      calcType: 'perimeter',
      params: {
        firstSideLength: 5,
        secondSideLength: 5,
        thirdSideLength: 5,
      },
    };
    const result = perimeterCalculation.calculate(params);
    expect(result).toEqual(15);
  });

  it('should throw an error for an unsupported shape', () => {
    const params: any = { name: 'Invalid', params: { radius: undefined } };
    expect(() => perimeterCalculation.calculate(params)).toThrowError(
      'Provided shape is not supported'
    );
  });
});

describe('ShapeStrategy', () => {
  it('should calculate result without rounding', () => {
    const mockPerimeterParams: ShapeParams = {
      name: 'Circle',
      params: { radius: 5 },
      calcType: 'perimeter',
    };
    const mockPerimeterCalculation: PerimeterCalculation =
      new PerimeterCalculation();
    const mockUnroundedResult = 55.987654321;

    spyOn(mockPerimeterCalculation, 'calculate').and.returnValue(
      mockUnroundedResult
    );

    const shapeStrategy = new Context(mockPerimeterCalculation);
    const result = shapeStrategy.getResult(mockPerimeterParams, false, null);

    expect(result).toBe(mockUnroundedResult);
    expect(mockPerimeterCalculation.calculate).toHaveBeenCalledWith(
      mockPerimeterParams
    );
  });

  it('should calculate result with rounding', () => {
    const mockAreaParams: ShapeParams = {
      name: 'Circle',
      params: { radius: 5 },
      calcType: 'area',
    };
    const mockAreaCalculation: AreaCalculation = new AreaCalculation();
    const mockRoundResult = 42.123456789;

    spyOn(mockAreaCalculation, 'calculate').and.returnValue(mockRoundResult);

    const shapeStrategy = new Context(mockAreaCalculation);
    const result = shapeStrategy.getResult(mockAreaParams, true, 2);

    expect(result).toBe(roundResult(mockRoundResult, 2));
    expect(mockAreaCalculation.calculate).toHaveBeenCalledWith(mockAreaParams);
  });
});
