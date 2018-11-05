export interface Validator {
  name: string;
  validator: any;
  message: string;
}

export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  action?: string;
  typebtn?: string;
  click?: string;
  value?: any;
  validations?: Validator[];
  }
