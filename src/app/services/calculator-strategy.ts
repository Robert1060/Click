import { roundResult } from '../components/shapes/shapes.utils';
import { ShapeParams } from '../model';

export interface CalculationStrategy {
  calculate(params: ShapeParams): number;
}

export class AreaCalculation implements CalculationStrategy {
  calculate(params: ShapeParams): number {
    switch (params.name) {
      case 'Circle':
        const { radius } = params.params;
        return Math.PI * (radius * radius);
      case 'Square':
        const { sideLength } = params.params;
        return sideLength * sideLength;
      case 'Rectangle':
        const { width, length } = params.params;
        return width * length;
      default:
        throw new Error('Provided shape is not supported');
    }
  }
}

export class PerimeterCalculation implements CalculationStrategy {
  calculate(params: ShapeParams): number {
    switch (params.name) {
      case 'Circle':
        const { radius } = params.params;
        return 2 * Math.PI * radius;
      case 'Square':
        const { sideLength } = params.params;
        return 4 * sideLength;
      case 'Rectangle':
        const { width, length } = params.params;
        return 2 * length + 2 * width;
      default:
        throw new Error('Provided shape is not supported');
    }
  }
}

export class ShapeStrategy {
  constructor(
    private params: ShapeParams,
    private strategy: CalculationStrategy,
    private includeRounding: boolean,
    private roundValue: number | null
  ) {}

  getResult() {
    const result = this.strategy.calculate(this.params);
    if (this.includeRounding) {
      return roundResult(result, this.roundValue);
    } else {
      return result;
    }
  }
}
