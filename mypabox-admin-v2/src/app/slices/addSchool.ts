import { createSlice } from "@reduxjs/toolkit";
import { Note, addSchoolNameAction, addSchoolState } from "../../types/addSchool.types";

// The initial state for the login slice
const initialState: addSchoolState = {
    schoolName: {
        schoolName: "",
        notes: []
    },
    schoolLogo: {
        schoolLogo: "",
        notes: []
    },
    streetAddress: {
        streetAdress: "",
        notes: []
    },
    city: {
        city: "",
        notes: []
    },
    state: {
        state: "",
        notes: []
    },
    zip: {
        zip: "",
        notes: []
    },
    country: {
        country: "",
        notes: []
    },
    website: {
        website: "",
        notes: []
    },
    schoolEmail: {
        schoolEmail: "",
        notes: []
    },
    schoolPhoneNumber: {
        schoolPhoneNumber: "",
        notes: []
    },
    campusLocation: {
        campusLocation: "",
        notes: []
    },
    startMonth: {
        startMonth: "",
        notes: []
    },
    classCapacity: {
        classCapacity: 0,
        notes: []
    },
    fullTimeDuration: {
        fullTimeDuration: "",
        notes: []
    },
    partTimeDuration: {
        partTimeDuration: "",
        notes: []
    },
    inStateDeposit: {
        inStateDeposit: 0,
        notes: []
    },
    outOfStateDeposit: {
        outOfStateDeposit: 0,
        notes: []
    },
    rollingAdmissions: {
        rollingAdmissions: false,
        notes: []
    },
    nonRollingAdmissions: {
        nonRollingAdmissions: false,
        notes: []
    },
    prePACurriculum: {
        prePACurriculum: false,
        notes: []
    },
    directHighSchoolEntry: {
        directHighSchoolEntry: false,
        notes: []
    },
    partTimeOption: {
        partTimeOption: false,
        notes: []
    },
    onlineLearning: {
        onlineLearning: false,
        notes: []
    },
    onCampusHousing: {
        onCampusHousing: false,
        notes: []
    },
    cadaverLab: {
        cadaverLab: false,
        notes: []
    },
    faithBasedLearning: {
        faithBasedLearning: false,
        notes: []
    },
    militaryPersonnelPreference: {
        militaryPersonnelPreference: false,
        notes: []
    },
    generalInformationnotess: {
        generalInformationnotess: "",
        notes: []
    }
}

const addSchoolSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    addSchoolName: (state, action) => {
      state.schoolName.schoolName = action.payload?.schoolName
      state.schoolName.notes?.push(action.payload.notes)
    },
    clear: state => {
    }
  }
})

export const { addSchoolName } = addSchoolSlice.actions

export const addSchoolReducer = addSchoolSlice.reducer