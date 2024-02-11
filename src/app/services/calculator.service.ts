import { Injectable } from '@angular/core';
import { CalculateOptions, ShapeParams } from '../model';

@Injectable({ providedIn: 'root' })
export class CalculateService {
  public area(data: ShapeParams): number {
    return calculate(data, 'area');
  }
  public perimeter(data: ShapeParams): number {
    return calculate(data, 'perimeter');
  }
}

function calculate(data: ShapeParams, type: CalculateOptions): number {
  switch (data.name) {
    case 'Circle':
      const { radius } = data.params;
      if (type === 'area') {
        return Math.PI * (radius * radius);
      }
      return 2 * Math.PI * radius;
    case 'Square':
      const { sideLength } = data.params;
      if (type === 'area') {
        return sideLength * sideLength;
      }
      return 4 * sideLength;
    case 'Rectangle':
      const { length, width } = data.params;
      if (type === 'area') {
        return width * length;
      }
      return 2 * length + 2 * width;
    default:
      throw new Error('Provided shape is not supported');
  }
}
