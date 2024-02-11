import { Component, OnInit, signal } from '@angular/core';
import { CalculateOptions, Shape, ShapeParams } from 'src/app/model';
import { Shapes, createShapeForm, roundResult } from './shapes.utils';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalculateService } from 'src/app/services/calculator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shapes',
  template: `
    <div
      *ngIf="selectedShape(); let sh"
      class="flex items-center justify-center flex-col h-full w-full"
    >
      <form
        [formGroup]="shapeFormGroup"
        (submit)="calculate(sh, shapeFormGroup)"
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
            >Value needs to be positive and greater than 0</mat-hint
          >
        </mat-form-field>
        <mat-form-field>
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
  selectedShape = signal<Shape>(this.shapes[0]);
  result = signal<number | null>(null);

  constructor(
    private formBuilder: FormBuilder,
    private calculationService: CalculateService,
    private route: ActivatedRoute
  ) {}

  calculate(shape: Shape, shapeForm: FormGroup) {
    if (shapeForm.invalid) {
      shapeForm.markAllAsTouched();
    } else {
      const { roundValue, ...params } = shapeForm.value;

      const parameters: ShapeParams = {
        name: shape.name,
        params: {
          ...params,
        },
      };
      const func = this.calculationService[this.selectedCalculationOption()];
      const res = roundResult(func(parameters), roundValue);
      this.result.set(res);
    }
  }

  ngOnInit(): void {
    const navigationState = this.route.snapshot.params;
    const shape = this.shapes.find(
      (sh) => sh.name === navigationState['shape']
    );
    if (!shape) {
      throw new Error('Shape not found');
    }
    this.selectedShape.set(shape);
    this.selectedCalculationOption.set(navigationState['calculation']);
    this.shapeFormGroup = createShapeForm(shape, this.formBuilder);
  }
}
