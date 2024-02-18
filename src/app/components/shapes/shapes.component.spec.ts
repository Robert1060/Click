import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ShapesComponent } from './shapes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Shape } from 'src/app/model';

describe('ShapesComponent', () => {
  let component: ShapesComponent;
  let fixture: ComponentFixture<ShapesComponent>;
  let formBuilder: FormBuilder;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShapesComponent],
      imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { shape: 'Circle', calculation: 'area' },
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(ShapesComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set up component correctly on ngOnInit', () => {
      spyOn(component.selectedShape, 'set');
      spyOn(component.selectedCalculationOption, 'set');

      component.ngOnInit();

      expect(component.selectedShape.set).toHaveBeenCalledWith(
        jasmine.any(Object)
      );
      expect(component.selectedCalculationOption.set).toHaveBeenCalledWith(
        'area'
      );
      expect(component.shapeFormGroup).toBeDefined();
    });
    it('should throw an error if shape is not found', () => {
      spyOn(component.selectedShape, 'set');
      spyOn(component.selectedCalculationOption, 'set');
      spyOn(component, 'ngOnInit').and.callThrough();

      const activatedRouteStub = {
        snapshot: { params: { shape: 'InvalidShape', calculation: 'area' } },
        paramMap: of(
          convertToParamMap({ shape: 'InvalidShape', calculation: 'area' })
        ),
      };

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        declarations: [ShapesComponent],
        providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      });

      fixture = TestBed.createComponent(ShapesComponent);
      component = fixture.componentInstance;

      expect(() => component.ngOnInit()).toThrowError(
        'InvalidShape is not supported'
      );
    });
    it('should throw error for unsupported calculation type', () => {
      spyOn(component.selectedShape, 'set');
      spyOn(component.selectedCalculationOption, 'set');
      spyOn(component, 'ngOnInit').and.callThrough();

      const activatedRouteStub = {
        snapshot: { params: { shape: 'Circle', calculation: 'invalid' } },
        paramMap: of(
          convertToParamMap({ shape: 'Circle', calculation: 'invalid' })
        ),
      };

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        declarations: [ShapesComponent],
        providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      });

      fixture = TestBed.createComponent(ShapesComponent);
      component = fixture.componentInstance;

      expect(() => component.ngOnInit()).toThrowError(
        'invalid is not supported'
      );
    });
  });
  describe('calculate function', () => {
    const mockInvalidShape: any = {
      name: 'invalidShape',
      calcType: 'area',
      parameters: [],
    };
    const mockValidShape: Shape = {
      name: 'Circle',
      calcType: 'area',
      parameters: [],
    };

    it('should have invalid shape form group', () => {
      spyOn(component, 'calculate').and.callThrough();
      const invalidGroup: FormGroup = formBuilder.group({});
      invalidGroup.setErrors({ test: 'test' });

      component.ngOnInit();
      component.calculate(mockInvalidShape, invalidGroup, 'area');

      expect(component.calculate).toHaveBeenCalled();
      expect(component.shapeFormGroup.valid).toBeFalse();
    });
    it('should throw error when invalid calculation option', () => {
      spyOn(component, 'calculate').and.callThrough();
      component.ngOnInit();

      const fg: FormGroup = formBuilder.group({});

      expect(() =>
        component.calculate(mockValidShape, fg, 'dupa' as any)
      ).toThrowError('Invalid calculation option');
    });
  });
});
