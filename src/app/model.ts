export type CalculateOptions = 'area' | 'perimeter';
export type ShapesTypes = 'Circle' | 'Square' | 'Rectangle' | 'Triangle';

export interface Shape {
  name: ShapesTypes;
  calcType: CalculateOptions;
  parameters: Parameter[];
}

export interface Parameter {
  key: string;
  label: string;
}

/////
type CircleAreaParams = {
  name: 'Circle';
  calcType: 'area';
  params: {
    radius: number;
  };
};

type CirclePerimeterParams = {
  name: 'Circle';
  calcType: 'perimeter';
  params: {
    radius: number;
  };
};

type SquareAreaParams = {
  name: 'Square';
  calcType: 'area';
  params: {
    sideLength: number;
  };
};

type SquarePerimeterParams = {
  name: 'Square';
  calcType: 'perimeter';
  params: {
    sideLength: number;
  };
};

type RectangleAreaParams = {
  name: 'Rectangle';
  calcType: 'area';
  params: {
    length: number;
    width: number;
  };
};

type RectanglePerimeterParams = {
  name: 'Rectangle';
  calcType: 'perimeter';
  params: {
    length: number;
    width: number;
  };
};

type TriangleAreaParams = {
  name: 'Triangle';
  calcType: 'area';
  params: {
    height: number;
    baseLength: number;
  };
};

type TrianglePerimeterParams = {
  name: 'Triangle';
  calcType: 'perimeter';
  params: {
    firstSideLength: number;
    secondSideLength: number;
    thirdSideLength: number;
  };
};

export type PerimeterShapeParams =
  | CirclePerimeterParams
  | TrianglePerimeterParams
  | SquarePerimeterParams
  | RectanglePerimeterParams;

export type AreaShapeParams =
  | CircleAreaParams
  | TriangleAreaParams
  | SquareAreaParams
  | RectangleAreaParams;

export type ShapeParams = PerimeterShapeParams | AreaShapeParams;
