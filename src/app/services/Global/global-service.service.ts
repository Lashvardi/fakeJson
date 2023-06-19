import { Injectable } from '@angular/core';
import { CompanyDataService } from '../company-data.service';
import { UserDataService } from '../user.service';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  constructor(
    private companyDataService: CompanyDataService,
    private userDataService: UserDataService
  ) { }
  
  // Generate Single Data?
  generateCompanyJson(companyFields: string[], fieldValues: any[], count: number) {
    return this.companyDataService.generateMultipleCompanyData(companyFields, fieldValues, count);
  }

  generateUserJson(userFields: string[], fieldValues: any[], count: number) {
    return this.userDataService.generateMultipleUserData(userFields, fieldValues, count);
  }

  generateJson(dataType: string, fields: string[], fieldValues: any[], count: number) {
    switch (dataType) {
      case 'Company':
        return this.generateCompanyJson(fields, fieldValues,count);
      case 'User':
        return this.generateUserJson(fields as (keyof User)[], fieldValues, count);
      default:
        return {};
    }
  }
}
