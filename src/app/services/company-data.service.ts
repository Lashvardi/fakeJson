import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
@Injectable({
  providedIn: 'root',
})
export class CompanyDataService {
  generateRequestedJson(
    companyFields: string[],
    fieldValues: any[]
  ): { [key: string]: any } {
    let requestedJson: { [key: string]: any } = {};
    companyFields.forEach((field, index) => {
      if (fieldValues[index]) {
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
          case 'companyEmployeeCount':
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

    return requestedJson;
  }

  generateMultipleCompanyData(
    companyFields: string[],
    fieldValues: any[],
    count: number
  ): { [key: string]: any }[] {
    let companyDataArray: { [key: string]: any }[] = [];

    for (let i = 0; i < count; i++) {
      companyDataArray.push(
        this.generateRequestedJson(companyFields, fieldValues)
      );
    }

    return companyDataArray;
  }
}
