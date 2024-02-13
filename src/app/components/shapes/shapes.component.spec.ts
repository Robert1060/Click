import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShapesComponent } from './shapes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('ShapesComponent', () => {
  let component: ShapesComponent;
  let fixture: ComponentFixture<ShapesComponent>;
  let activatedRouteSnapshot: Partial<ActivatedRouteSnapshot>;

  beforeEach(() => {
    activatedRouteSnapshot = {
      params: { shape: 'TestShape', calculation: 'area' },
      url: [{ path: 'shapes' } as any],
      queryParams: {},
      fragment: '',
      data: {},
    };

    TestBed.configureTestingModule({
      declarations: [ShapesComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: activatedRouteSnapshot },
        }      
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShapesComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit tests', () => {
    it('should throw an error if the shape is not found', () => {
      activatedRouteSnapshot.params!['shape'] = 'InvalidShape';

      expect(() => component.ngOnInit()).toThrowError('Shape not found');
    });
  });
});
