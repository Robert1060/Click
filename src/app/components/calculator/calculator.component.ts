import { Component, signal } from '@angular/core';
import { CalculateOptions, Shape } from '../../model';
import { Shapes } from '../shapes/shapes.utils';

@Component({
  selector: 'app-calculator',
  template: `
    <div class="flex items-center justify-center flex-col h-full w-full">
      <h2>Calculator</h2>
      <div>
        <mat-radio-group
          [ngModel]="selectedCalculation()"
          (ngModelChange)="setCalculationType($event)"
        >
          <mat-radio-button value="area">Area</mat-radio-button>
          <mat-radio-button value="perimeter">Perimeter</mat-radio-button>
        </mat-radio-group>
      </div>
      <mat-form-field>
        <mat-label>Choose Shape:</mat-label>
        <mat-select
          [ngModel]="selectedShape()?.name"
          (ngModelChange)="setSelectedShape($event)"
        >
          <mat-option *ngFor="let shape of shapes" [value]="shape.name">{{
            shape.name
          }}</mat-option>
        </mat-select>
      </mat-form-field>
      <ng-container *ngIf="selectedShape(); let shape">
        <button
          mat-raised-button
          [routerLink]="getLink(selectedCalculation(), shape.name)"
        >
          Next
        </button>
      </ng-container>
    </div>
  `,
})
export class CalculatorComponent {
  shapes = new Shapes().shapesTypes;
  selectedShape = signal<Shape | null>(null);

  selectedCalculation = signal<CalculateOptions>('area');

  setCalculationType(event: CalculateOptions): void {
    this.selectedCalculation.set(event);
  }

  setSelectedShape(event: string): void {
    const shape = this.shapes.find((s) => s.name === event);
    if (!shape) {
      throw new Error('Unexpected error happened');
    }
    this.selectedShape.set(shape);
  }

  getLink(calculationType: CalculateOptions, shapeName: string): string {
    return `${calculationType}/${shapeName}`;
  }
}
