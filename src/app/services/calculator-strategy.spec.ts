import { ShapeParams } from '../model';
import { roundResult } from '../components/shapes/shapes.utils';
import {
  AreaCalculation,
  PerimeterCalculation,
  ShapeStrategy,
} from './calculator-strategy';

describe('AreaCalculation', () => {
  let areaCalculation: AreaCalculation;

  beforeEach(() => {
    areaCalculation = new AreaCalculation();
  });

  it('should calculate the area for a circle', () => {
    const params: ShapeParams = { name: 'Circle', params: { radius: 5 } };
    const result = areaCalculation.calculate(params);
    expect(result).toBeCloseTo(Math.PI * 5 * 5, 6);
  });

  it('should calculate the area for a square', () => {
    const params: ShapeParams = { name: 'Square', params: { sideLength: 5 } };
    const result = areaCalculation.calculate(params);
    expect(result).toEqual(25);
  });

  it('should calculate the area for a rectangle', () => {
    const params: ShapeParams = {
      name: 'Rectangle',
      params: { width: 5, length: 5 },
    };
    const result = areaCalculation.calculate(params);
    expect(result).toEqual(25);
  });

  it('should throw an error for an unsupported shape', () => {
    const calculation = new AreaCalculation();
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

  it('should calculate the perimeter for a circle', () => {
    const params: ShapeParams = { name: 'Circle', params: { radius: 5 } };
    const result = perimeterCalculation.calculate(params);
    expect(result).toBeCloseTo(2 * Math.PI * 5);
  });

  it('should calculate the perimeter for a square', () => {
    const params: ShapeParams = { name: 'Square', params: { sideLength: 5 } };
    const result = perimeterCalculation.calculate(params);
    expect(result).toEqual(20);
  });

  it('should calculate the perimeter for a rectangle', () => {
    const params: ShapeParams = {
      name: 'Rectangle',
      params: { width: 5, length: 5 },
    };
    const result = perimeterCalculation.calculate(params);
    expect(result).toEqual(20);
  });

  it('should throw an error for an unsupported shape', () => {
    const params: any = { name: 'Invalid', params: { radius: undefined } };
    expect(() => perimeterCalculation.calculate(params)).toThrowError(
      'Provided shape is not supported'
    );
  });
});

describe('ShapeStrategy', () => {
  const mockParams: ShapeParams = { name: 'Circle', params: { radius: 5 } };
  it('should calculate the result without rounding', () => {
    const mockPerimeterCalculation: PerimeterCalculation =
      new PerimeterCalculation();
    const mockUnroundedResult = 55.987654321;

    spyOn(mockPerimeterCalculation, 'calculate').and.returnValue(
      mockUnroundedResult
    );

    const shapeStrategy = new ShapeStrategy(
      mockParams,
      mockPerimeterCalculation,
      false,
      null
    );
    const result = shapeStrategy.getResult();

    expect(result).toBe(mockUnroundedResult);
    expect(mockPerimeterCalculation.calculate).toHaveBeenCalledWith(mockParams);
  });

  it('should calculate the result with rounding', () => {
    const mockAreaCalculation: AreaCalculation = new AreaCalculation();
    const mockRoundResult = 42.123456789;

    spyOn(mockAreaCalculation, 'calculate').and.returnValue(mockRoundResult);

    const shapeStrategy = new ShapeStrategy(
      mockParams,
      mockAreaCalculation,
      true,
      2
    );
    const result = shapeStrategy.getResult();

    expect(result).toBe(roundResult(mockRoundResult, 2));
    expect(mockAreaCalculation.calculate).toHaveBeenCalledWith(mockParams);
  });
});
