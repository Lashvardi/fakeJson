export interface Company {
    companyName: string;
    companyDescription: string;
    companyImage: string;
    companyCategory: string;
    companyQuantity: number;
    companyEployCount: number;
    companyLocation: string;
    
}

let companyData: Company = {
    companyName: "",
    companyDescription: "",
    companyImage: "",
    companyCategory: "",
    companyQuantity: 0,
    companyEployCount: 0,
    companyLocation: ""
}

export let companyFields = Object.keys(companyData);


