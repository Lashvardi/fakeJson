import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  generateRequestedJson(
    userFields: string[],
    fieldValues: any[]
  ): { [key: string]: any } {
    let requestedJson: { [key: string]: any } = {};

    userFields.forEach((field, index) => {
      if (fieldValues[index]) {
        switch (field) {
          case 'fullName':
            requestedJson[field] = faker.name.fullName();
            break;
          case 'email':
            requestedJson[field] = faker.internet.email();
            break;
          case 'password':
            requestedJson[field] = faker.internet.password();
            break;
          case 'phoneNumber':
            requestedJson[field] = faker.phone.number();
            break;
          case 'address':
            requestedJson[field] = faker.address.streetAddress();
            break;
          case 'city':
            requestedJson[field] = faker.address.city();
            break;
          case 'profileImage':
            requestedJson[field] = faker.image.avatar();
            break;
          case 'gender':
            requestedJson[field] = faker.name.gender();
            break;
          case 'jobArea':
            requestedJson[field] = faker.name.jobArea();
            break;
          case 'zodiacSign':
            requestedJson[field] = faker.name.zodiacSign();
            break;
          case 'jobTitle':
            requestedJson[field] = faker.name.jobTitle();
            break;
          default:
            requestedJson[field] = 'N/A';
        }
      }
    });

    return requestedJson;
  }

  generateMultipleUserData(
    companyFields: string[],
    fieldValues: any[],
    count: number
  ): { [key: string]: any }[] {
    let userDataArray: { [key: string]: any }[] = [];

    for (let i = 0; i < count; i++) {
      userDataArray.push(
        this.generateRequestedJson(companyFields, fieldValues)
      );
    }

    return userDataArray;
  }
}
