import { Component, signal } from '@angular/core';
import { CalculateOptions, ShapesTypes } from '../../model';

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
          [ngModel]="selectedShapeName()"
          (ngModelChange)="setSelectedShape($event)"
        >
          <mat-option
            *ngFor="let shapeName of typesOfShapes"
            [value]="shapeName"
            >{{ shapeName }}</mat-option
          >
        </mat-select>
      </mat-form-field>
      <ng-container *ngIf="selectedShapeName(); let shapeName">
        <button
          mat-raised-button
          [routerLink]="getLink(selectedCalculation(), shapeName)"
        >
          Next
        </button>
      </ng-container>
    </div>
  `,
})
export class CalculatorComponent {
  typesOfShapes = ['Circle', 'Square', 'Rectangle', 'Triangle'] as const;
  selectedShapeName = signal<ShapesTypes | null>(null);

  selectedCalculation = signal<CalculateOptions>('area');

  setCalculationType(event: CalculateOptions): void {
    this.selectedCalculation.set(event);
  }

  setSelectedShape(event: ShapesTypes): void {
    if (!this.typesOfShapes.includes(event)) throw new Error('Shape not found');
    this.selectedShapeName.set(event);
  }

  getLink(calculationType: CalculateOptions, shapeName: string): string {
    return `${calculationType}/${shapeName}`;
  }
}
