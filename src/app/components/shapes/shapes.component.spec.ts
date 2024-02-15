import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ShapesComponent } from './shapes.component';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    it('should set up the component correctly on ngOnInit', () => {
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
    it('should throw an error if the shape is not found', () => {
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

      expect(() => component.ngOnInit()).toThrowError('Shape not found');
    });
  });
});
