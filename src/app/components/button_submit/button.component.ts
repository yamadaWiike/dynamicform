import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../field';
@Component({
selector: 'app-button-submit',
template: `
<div class="demo-full-width margin-top" [formGroup]="group">
  <button [type]="field.typebtn" mat-raised-button color="primary">{{field.label}}</button>
</div>
`,
styles: []
})
export class ButtonSubmitComponent implements OnInit {
field: FieldConfig;
group: FormGroup;
constructor() {}
ngOnInit() {}

}
