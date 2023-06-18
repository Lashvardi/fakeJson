import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faker } from '@faker-js/faker';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Company Fields
  companyFields = [
    'companyName',
    'companyDescription',
    'companyImage',
    'companyCategory',
    'companyQuantity',
    'companyEployCount',
    'companyLocation',
  ];

  form!: FormGroup;
  dataTypes = [
    'Carousel',
    'Company',
    'Events',
    'Blog Post',
    'Food',
    'Product',
    'Restaraunt',
    'User',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      dataType: [''],
      fields: this.fb.array(
        this.companyFields.map(() => new FormControl(true))
      ), // create a control for each field, initially set to true
    });
  }

  get fields() {
    return this.form.get('fields') as FormArray;
  }

  // generateData() {
  //   const data = {};
  //   this.companyFields.forEach((field, i) => {
  //     if (this.fields.value[i]) {
  //       data[field] = faker.random.word();  // replace this with appropriate faker.js method
  //     }
  //   });
  //   return data;
  // }

  logRequestedJson() {
    let requestedJson: { [key: string]: any } = {};

    this.companyFields.forEach((field, index) => {
      if (this.fields.at(index).value) {
        switch (field) {
          case 'companyName':
            requestedJson[field] = faker.company.name();
            break;
          case 'companyDescription':
            requestedJson[field] = faker.lorem.sentences();
            break;
          case 'companyImage':
            requestedJson[field] = faker.image.business();
            break;
          case 'companyCategory':
            requestedJson[field] = faker.commerce.department();
            break;
          case 'companyQuantity':
            requestedJson[field] = faker.datatype.number();
            break;
          case 'companyEployCount':
            requestedJson[field] = faker.datatype.number();
            break;
          case 'companyLocation':
            requestedJson[field] = faker.address.streetAddress();
            break;
          default:
            requestedJson[field] = 'N/A';
        }
      }
    });

    console.log(requestedJson);
  }
}
