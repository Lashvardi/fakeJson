export interface User {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  city: string;
  profileImage: string;
  gender: string;
  jobArea: string;
  zodiacSign: string;
  jobTitle: string;
  age: number;
}

let userData: User = {
  fullName: '',
  email: '',
  password: '',
  phoneNumber: '',
  address: '',
  city: '',
  profileImage: '',
  gender: '',
  jobArea: '',
  zodiacSign: '',
  jobTitle: '',
  age: 0,
};

export let userFields = Object.keys(userData);
