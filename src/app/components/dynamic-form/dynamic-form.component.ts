import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { FieldConfig, Validator } from '../../field';

@Component({
  exportAs: 'app-dynamicForm',
  selector: 'app-dynamic-form',
  template: `
  <form class="appDynamicField" [formGroup]="form" (submit)="onSubmit($event)">
  <ng-container *ngFor="let field of fields;" appDynamicField [field]="field" [group]="form">
  </ng-container>
  </form>
  `,
  styles: []
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createControl();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.type === 'button') { return; }
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      console.log('test validation', field.validations);
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {

        if ( valid.name === 'required') {
          validList.push(Validators.required);
        } if ( valid.name === 'min') {
          validList.push(Validators.minLength(valid.validator));
          console.log('test min', valid.validator);
          console.log('test min', valid.message);
        } if ( valid.name === 'max') {
          validList.push(Validators.maxLength(valid.validator));
          console.log('test max', valid.validator);
          console.log('test max', valid.message);
        } else {
          validList.push(Validators.pattern('^[a-zA-Z]+$'));
          console.log('test PATTERN', valid.validator);
          console.log('test pATTERN', valid.message);
        }

      //   switch (valid.name) {
      //     case 'required': {
      //       validList.push(Validators.required);
      //        break;
      //     }
      //     case 'min': {
      //       validList.push(Validators.minLength(valid.validator));
      //        console.log('test min', valid.validator);
      //        console.log('test min', valid.message);
      //        break;
      //     }
      //     case 'max': {
      //       validList.push(Validators.maxLength(valid.validator));
      //        console.log('test min', valid.validator);
      //        console.log('test min', valid.message);
      //        break;
      //     }
      //     case 'pattern': {
      //       validList.push(Validators.pattern(valid.validator));
      //       console.log('test PATTERN', valid.validator);
      //       console.log('test pATTERN', valid.message);
      //        break;
      //     }
      //  }

        // if (valid.name === 'required') {
        //   validList.push(Validators.required);
        // } else {
        //   validList.push(Validators.pattern(valid.validator));
        // }
        // // validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
