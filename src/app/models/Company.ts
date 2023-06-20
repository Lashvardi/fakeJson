export interface Company {
    companyName: string;
    companyDescription: string;
    companyImage: string;
    companyCategory: string;
    companyEmployeCount: number;
    companyLocation: string;
    
}

let companyData: Company = {
    companyName: "",
    companyDescription: "",
    companyImage: "",
    companyCategory: "",
    companyEmployeCount: 0,
    companyLocation: ""
}

export let companyFields = Object.keys(companyData);


