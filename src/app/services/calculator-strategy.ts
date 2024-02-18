import { roundResult } from '../components/shapes/shapes.utils';
import { AreaShapeParams, PerimeterShapeParams, ShapeParams } from '../model';

interface Calculation {
  calculate(params: ShapeParams): number;
}

export class AreaCalculation implements Calculation {
  calculate(params: AreaShapeParams): number {
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
      case 'Triangle':
        const { height, baseLength } = params.params;
        return (height * baseLength) / 2;
      default:
        throw new Error('Provided shape is not supported');
    }
  }
}

export class PerimeterCalculation implements Calculation {
  calculate(params: PerimeterShapeParams): number {
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
      case 'Triangle':
        const { firstSideLength, secondSideLength, thirdSideLength } =
          params.params;
        return firstSideLength + secondSideLength + thirdSideLength;
      default:
        throw new Error('Provided shape is not supported');
    }
  }
}

export class Context {
  constructor(private calculation: Calculation) {}

  getResult(
    params: ShapeParams,
    includeRound: boolean,
    roundValue: number | null
  ) {
    const result = this.calculation.calculate(params);
    if (includeRound) {
      return roundResult(result, roundValue);
    } else {
      return result;
    }
  }
}
