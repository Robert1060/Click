import { TestBed } from '@angular/core/testing';
import { CalculateService } from './calculator.service';
import { ShapeParams } from '../model';

describe('CalculateService', () => {
  let service: CalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculateService],
    });
    service = TestBed.inject(CalculateService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  describe('area', () => {
    it('should calculate area for Circle', () => {
      const data: ShapeParams = { name: 'Circle', params: { radius: 5 } };
      const result = service.area(data);
      expect(result).toEqual(Math.PI * 5 * 5);
    });

    it('should calculate area for Square', () => {
      const data: ShapeParams = { name: 'Square', params: { sideLength: 4 } };
      const result = service.area(data);
      expect(result).toEqual(4 * 4);
    });

    it('should calculate area for Rectangle', () => {
      const data: ShapeParams = {
        name: 'Rectangle',
        params: { length: 3, width: 6 },
      };
      const result = service.area(data);
      expect(result).toEqual(3 * 6);
    });

    it('should throw an error for unsupported shape', () => {
      const data = { name: 'UnsupportedShape', params: {} } as any;
      expect(() => service.area(data)).toThrowError(
        'Provided shape is not supported'
      );
    });
  });

  describe('perimeter', () => {
    it('should calculate perimeter for Circle', () => {
      const data: ShapeParams = { name: 'Circle', params: { radius: 5 } };
      const result = service.perimeter(data);
      expect(result).toEqual(2 * Math.PI * 5);
    });

    it('should calculate perimeter for Square', () => {
      const data: ShapeParams = { name: 'Square', params: { sideLength: 4 } };
      const result = service.perimeter(data);
      expect(result).toEqual(4 * 4);
    });

    it('should calculate perimeter for Rectangle', () => {
      const data: ShapeParams = {
        name: 'Rectangle',
        params: { length: 3, width: 6 },
      };
      const result = service.perimeter(data);
      expect(result).toEqual(2 * 3 + 2 * 6);
    });

    it('should throw an error for unsupported shape', () => {
      const data = { name: 'UnsupportedShape', params: {} } as any;
      expect(() => service.perimeter(data)).toThrowError(
        'Provided shape is not supported'
      );
    });
  });
});
