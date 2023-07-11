export type Note = {
  type: string;
  info: string;
}

export type addSchoolState = {
  schoolName: { 
    schoolName: string,
    notes: Note[]
  },
  schoolLogo: { 
    schoolLogo: string,
    notes: Note[] 
  },
  streetAddress: { 
    streetAdress: string,
    notes: Note[]
  },
  city: { 
    city: string,
    notes: Note[]
  },
  state: { 
    state: string,
    notes: Note[]
  },
  zip: { 
    zip: string,
    notes: Note[]
  },
  country: { 
    country: string,
    notes: Note[]
  },
  website: { 
    website: string,
    notes: Note[] 
  },
  schoolEmail: { 
    schoolEmail: string,
    notes: Note[]
  },
  schoolPhoneNumber: { 
    schoolPhoneNumber: string,
    notes: Note[] 
  },
  campusLocation: { 
    campusLocation: string,
    notes: Note[]
  },
  startMonth: { 
    startMonth: string,
    notes: Note[]
  },
  classCapacity: {
    classCapacity: number,
    notes: Note[]
  }
  fullTimeDuration: { 
    fullTimeDuration: string,
    notes: Note[]
  },
  partTimeDuration: { 
    partTimeDuration: string,
    notes: Note[]
  },
  inStateDeposit: {
    inStateDeposit: number,
    notes: Note[]
  }
  outOfStateDeposit: {
    outOfStateDeposit: number,
    notes: Note[]
  }
  rollingAdmissions: {
    rollingAdmissions: boolean,
    notes: Note[]
  }
  nonRollingAdmissions: {
    nonRollingAdmissions: boolean,
    notes: Note[]
  } 
  prePACurriculum: {
    prePACurriculum: boolean,
    notes: Note[]
  }
  directHighSchoolEntry: {
    directHighSchoolEntry: boolean,
    notes: Note[]
  }
  partTimeOption: {
    partTimeOption: boolean,
    notes: Note[]
  }
  onlineLearning: {
    onlineLearning: boolean,
    notes: Note[]
  }
  onCampusHousing: { 
    onCampusHousing: boolean,
    notes: Note[]
  }
  cadaverLab: {
    cadaverLab: boolean,
    notes: Note[]
  }
  faithBasedLearning: {
    faithBasedLearning: boolean,
    notes: Note[]
  }
  militaryPersonnelPreference: {
    militaryPersonnelPreference: boolean,
    notes: Note[]
  }
  generalInformationnotess: { 
    generalInformationnotess: string,
    notes: Note[]
  }
}

export type addSchoolNameAction = {
  payload: {
    schoolName: { 
      schoolName: string,
      notes: Note[]
    },
  }
}