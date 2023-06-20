import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { companyFields } from 'src/app/models/Company';
import { faker } from '@faker-js/faker';
import { CompanyDataService } from 'src/app/services/company-data.service';
import { GlobalDataService } from 'src/app/services/Global/global-service.service';
import { userFields } from 'src/app/models/User';
import { count } from 'rxjs';
import * as FileSaver from 'file-saver';
type DataType = 'Company' | 'User'; // add other data types as needed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  Json: { [key: string]: any } = {};
  Interface: string = '';
  displayFormat: string = 'JSON';

  formFields: { [K in DataType]: string[] } = {
    Company: companyFields,
    User: userFields,
  };
  Count!: number;

  dataTypes: DataType[] = Object.keys(this.formFields) as DataType[];
  form!: FormGroup;

  Show = false;

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
    this.generateData();
    console.log(this.Count);
  }

  getfields() {
    return this.form.get('fields') as FormArray;
  }

  generateData() {
    const dataType = this.form.get('dataType')?.value as DataType;
    const fields = this.formFields[dataType];
    const fieldValues = this.getfields().value;

    this.Json = this.globalService.generateJson(
      dataType,
      fields,
      fieldValues,
      this.Count
    );

    this.Interface = this.globalService.generateCompanyInterface(this.Json[0]);
  }
  // ? Copy JSON Data
  copyJsonData() {
    const jsonData = this.Json;
    const jsonString = JSON.stringify(jsonData, null, 2);

    const textarea = document.createElement('textarea');
    textarea.value = jsonString;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    this.Show = true;

    setTimeout(() => {
      this.Show = false;
    }, 1500);
  }

  exportAsJSON() {
    const jsonData = this.Json;
    const jsonString = JSON.stringify(jsonData, null, 2); // Convert to JSON string with indentation
    const blob = new Blob([jsonString], { type: 'application/json' }); // Pass the string directly to Blob
    FileSaver.saveAs(blob, 'data.json');
  }
}
