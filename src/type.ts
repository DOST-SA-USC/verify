interface UserType {
  uscID: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string | undefined;
  image: string;
  program: string;
  yearLevel: string;
  yearOfAward: string;
  scholarshipType: string;
}

export type { UserType };
