import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { companyFields } from 'src/app/models/Company';
import { faker } from '@faker-js/faker';
import { CompanyDataService } from 'src/app/services/company-data.service';
import { GlobalDataService } from 'src/app/services/Global/global-service.service';
import { userFields } from 'src/app/models/User';
import { count } from 'rxjs';

type DataType = 'Company' | 'User'; // add other data types as needed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  Json: { [key: string]: any } = {};

  companyFields = companyFields;

  formFields: { [K in DataType]: string[] } = {
    Company: companyFields,
    User: userFields,
  };

  dataTypes: DataType[] = Object.keys(this.formFields) as DataType[];

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private globalService: GlobalDataService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dataType: [this.dataTypes[0]],
      fields: this.fb.array(
        this.formFields[this.dataTypes[0]].map(() => new FormControl(true))
      ),
    });

    this.form.get('dataType')!.valueChanges.subscribe((dataType: DataType) => {
      const fields = this.formFields[dataType].map(() => new FormControl(true));
      this.form.setControl('fields', this.fb.array(fields));
    });
  }

  getfields() {
    return this.form.get('fields') as FormArray;
  }

  generateData() {
    const dataType = this.form.get('dataType')?.value as DataType;
    const fields = this.formFields[dataType];
    const fieldValues = this.getfields().value; // Get the values from the FormArray

    this.Json = this.globalService.generateJson(
      dataType,
      fields,
      fieldValues,
      50
    );
  }
}
