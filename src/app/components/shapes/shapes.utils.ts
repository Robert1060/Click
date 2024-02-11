import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Shape } from 'src/app/model';

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

export function createShapeForm(shape: Shape, formBuilder: FormBuilder) {
  const formConfig: { [key: string]: [key: number, any] } = {};

  shape.parameters.forEach((param) => {
    formConfig[param.key] = [
      0,
      [Validators.required, positiveNumberValidator()],
    ];
  });

  formConfig['roundValue'] = [
    0,
    [Validators.required, Validators.min(0), Validators.max(5)],
  ];

  return formBuilder.nonNullable.group(formConfig);
}

function positiveNumberValidator(): ValidatorFn {
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
  if (decimalPlaces === 0) return Math.round(value);
  if (!decimalPlaces) return value;
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(value * multiplier) / multiplier;
}
