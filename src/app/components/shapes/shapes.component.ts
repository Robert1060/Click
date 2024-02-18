import { Component, OnInit, signal } from '@angular/core';
import { CalculateOptions, Shape, ShapeParams } from 'src/app/model';
import {
  Shapes,
  createShapeFormGroup,
  isProperCalculateOption,
} from './shapes.utils';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  AreaCalculation,
  PerimeterCalculation,
  Context,
} from 'src/app/services/calculator-strategy';
import { ActivatedRoute } from '@angular/router';

// Sorry for ugly formatting

@Component({
  selector: 'app-shapes',
  template: `
    <div
      *ngIf="selectedShape(); let sh"
      class="flex items-center justify-center flex-col h-full w-full"
    >
      <form
        [formGroup]="shapeFormGroup"
        (submit)="calculate(sh, shapeFormGroup, selectedCalculationOption())"
        class="flex flex-col gap-4"
      >
        <mat-form-field *ngFor="let param of sh.parameters">
          <mat-label>{{ param.label }}</mat-label>
          <input
            matInput
            type="number"
            required
            step="0.1"
            [formControlName]="param.key"
          />
          <mat-hint
            *ngIf="
              shapeFormGroup.get(param.key)?.invalid &&
              shapeFormGroup.get(param.key)?.touched
            "
            class="text-red-500"
            >Value needs to be greater than 0</mat-hint
          >
        </mat-form-field>
        <mat-form-field *ngIf="shapeFormGroup.get('includeRound')?.value">
          <mat-label>Round Result (Decimal Places)</mat-label>
          <input matInput type="number" formControlName="roundValue" />
          <mat-hint
            *ngIf="shapeFormGroup.get('roundValue')?.getError('max')"
            class="text-red-500"
            >Max round value is 5</mat-hint
          >
          <mat-hint
            *ngIf="shapeFormGroup.get('roundValue')?.getError('min')"
            class="text-red-500"
            >Min round value is 0</mat-hint
          >
        </mat-form-field>

        <mat-checkbox formControlName="includeRound">
          Include rounding
        </mat-checkbox>

        <button mat-raised-button type="submit">Calculate</button>
        <button mat-raised-button routerLink="">Back</button>
      </form>
      <div
        class="mt-4 p-4 bg-gray-100 rounded-md"
        *ngIf="shapeFormGroup.valid && result() !== null; let res"
      >
        <p class="text-lg font-semibold">Result</p>
        <p class="mt-2">
          Calculating {{ selectedCalculationOption() }} for {{ sh.name }} with
          result of: {{ result() }}
        </p>
      </div>
    </div>
  `,
})
export class ShapesComponent implements OnInit {
  shapes = new Shapes().shapesTypes;

  shapeFormGroup: FormGroup;

  selectedCalculationOption = signal<CalculateOptions>('area');
  selectedShape = signal<Shape | null>(null);
  result = signal<number | null>(null);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  calculate(
    shape: Shape,
    shapeForm: FormGroup,
    calculateOption: CalculateOptions
  ): void {
    if (shapeForm.invalid) {
      shapeForm.markAllAsTouched();
    } else {
      const { includeRound, roundValue, ...params } = shapeForm.value;
      if (isProperCalculateOption(calculateOption)) {
        const parameters: ShapeParams = {
          name: shape.name,
          calcType: calculateOption,
          params: {
            ...params,
          },
        };
        switch (calculateOption) {
          case 'area':
            const areaShape = new Context(new AreaCalculation());
            this.result.set(
              areaShape.getResult(parameters, includeRound, roundValue)
            );
            break;
          case 'perimeter':
            const perimeterShape = new Context(new PerimeterCalculation());
            this.result.set(
              perimeterShape.getResult(parameters, includeRound, roundValue)
            );
            break;
        }
      } else {
        throw new Error('Invalid calculation option');
      }
    }
  }

  ngOnInit(): void {
    const navigationState = this.route.snapshot.params;
    const calculationSnapshot = navigationState['calculation'];
    const shapeNameSnapshot = navigationState['shape'];

    if (!isProperCalculateOption(calculationSnapshot)) {
      throw new Error(`${calculationSnapshot} is not supported`);
    }

    const shape = this.shapes.find(
      (sh) =>
        sh.name === shapeNameSnapshot && sh.calcType === calculationSnapshot
    );
    if (!shape) {
      throw new Error(`${shapeNameSnapshot} is not supported`);
    }

    this.selectedShape.set(shape);

    this.selectedCalculationOption.set(calculationSnapshot);
    this.shapeFormGroup = createShapeFormGroup(shape, this.formBuilder);
  }
}
