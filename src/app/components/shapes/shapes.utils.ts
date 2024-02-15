import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CalculateOptions, Shape } from 'src/app/model';

export class Shapes {
  public shapesTypes: Shape[] = [
    {
      name: 'Circle',
      parameters: [{ key: 'radius', label: 'Radius' }],
    },
    {
      name: 'Square',
      parameters: [{ key: 'sideLength', label: 'Side Length' }],
    },
    {
      name: 'Rectangle',
      parameters: [
        { key: 'length', label: 'Length' },
        { key: 'width', label: 'Width' },
      ],
    },
  ];
}

export function createShapeFormGroup(shape: Shape, formBuilder: FormBuilder) {
  const formConfig: { [key: string]: [key: number | boolean, any] } = {};

  shape.parameters.forEach((param) => {
    formConfig[param.key] = [
      0,
      [Validators.required, positiveNumberValidator()],
    ];
  });

  formConfig['includeRound'] = [false, [Validators.required]];

  formConfig['roundValue'] = [
    0,
    [Validators.required, Validators.min(0), Validators.max(5)],
  ];

  return formBuilder.nonNullable.group(formConfig);
}

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (isNaN(value) || value <= 0) {
      return { positiveNumber: true };
    }

    return null;
  };
}
export function roundResult(
  value: number,
  decimalPlaces: number | null
): number {
  if (!decimalPlaces && decimalPlaces !== 0) return value;
  if (decimalPlaces === 0) return Math.round(value);
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(value * multiplier) / multiplier;
}

export function isProperCalculateOption(el: any): el is CalculateOptions {
  return el === 'area' || el === 'perimeter';
}
