export type CalculateOptions = 'area' | 'perimeter';

export interface Shape {
  name: 'Circle' | 'Square' | 'Rectangle';
  parameters: Parameter[];
}

export interface Parameter {
  key: string;
  label: string;
}

/////
type CircleParams = {
  name: 'Circle';
  params: {
    radius: number;
  };
};

type SquareParams = {
  name: 'Square';
  params: {
    sideLength: number;
  };
};

type RectangleParams = {
  name: 'Rectangle';
  params: {
    length: number;
    width: number;
  };
};

export type ShapeParams = CircleParams | SquareParams | RectangleParams;
