export const formDataValue = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    email: "john@example.com",
    phone: "017257851**",
  },
  addressInfo: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
  },
  interests: ["Reading", "Hiking", "Cooking"],
  education: [
    {
      degree: "Bachelor's",
      institution: "University A",
      graduationYear: 2012,
    },
    {
      degree: "Master's",
      institution: "University B",
      graduationYear: 2014,
    },
  ],
  employmentHistory: [
    {
      company: "Company X",
      position: "Software Developer",
      startDate: "2015-01-01",
      endDate: "2020-12-31",
    },
    {
      company: "Company Y",
      position: "Project Manager",
      startDate: "2021-01-01",
      endDate: "2023-09-13",
    },
  ],
  additionalInfo: {
    referredBy: "Friend",
    comments: "I'm excited to join your community!",
  },

  gpa: {
    //here is the key name is the class name and the value is the gpa
    // example
    1: 5.0,
    2: 4.0,
    intermediate: 4.75, //etc
  },
};
