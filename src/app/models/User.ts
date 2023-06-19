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
};

export let userFields = Object.keys(userData);
