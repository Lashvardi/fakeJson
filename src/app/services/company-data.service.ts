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
          case 'companyEmployeCount':
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

  generateCompanyInterface(json: { [key: string]: any }): string {
    const getType = (value: any) => {
      if (Array.isArray(value)) {
        return 'any[]';
      } else if (value === null) {
        return 'null';
      } else if (typeof value === 'object') {
        let objInterface = "{ ";
        for (const key in value) {
          objInterface += `${key}: ${getType(value[key])}, `;
        }
        objInterface += "}";
        return objInterface;
      } else {
        return typeof value;
      }
    }
  
    let tsInterface = 'export interface Company {\n';
    for (const key in json) {
      tsInterface += `  ${key}: ${getType(json[key])};\n`;
    }
    tsInterface += '}';
  
    return tsInterface;
  }
  
  
}
