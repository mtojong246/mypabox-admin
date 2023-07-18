import { createSlice } from "@reduxjs/toolkit";
import { Note, addSchoolNameAction, addSchoolState } from "../../types/addSchool.types";
import { School } from "../../types/schools.types";

// The initial state for the login slice
const initialState: School= {
    id: 0,
    school_name: {
        input: "",
        notes: [],
    },
    school_logo: {
        input: "",
        notes: [],
    },
    school_street: {
        input: "",
        notes: [],
    },
    school_city: {
        input: "",
        notes: [],
    },
    school_state: {
        input: "",
        notes: [],
    },
    school_zip_code: {
        input: "",
        notes: [],
    },
    school_country: {
        input: "",
        notes: [],
    },
    school_website: {
        input: "",
        notes: [],
    },
    school_email: {
        input: "",
        notes: [],
    },
    school_phone_number: {
        input: "",
        notes: [],
    },

    school_campus_location: {
        input: "",
        notes: [],
    },
    school_start_month: {
        input: "",
        notes: [],
    },
    school_class_capacity: {
        input: 0,
        notes: [],
    },
    school_duration_full_time: {
        input: "",
        notes: [],
    },
    school_duration_part_time: {
        input: "",
        notes: [],
    },

    school_seat_deposit_in_state: {
        input: 0,
        notes: [],
    },
    school_seat_deposit_out_of_state: {
        input: 0,
        notes: [],
    },

    school_rolling_admissions: {
        input: false,
        notes: [],
    },
    school_nonrolling_admissions: {
        input: false,
        notes: [],
    },
    school_pre_pa_curriculum: {
        input: false,
        notes: [],
    },
    school_direct_high_school_entry: {
        input: false,
        notes: [],
    },
    school_part_time_option: {
        input: false,
        notes: [],
    },
    school_online_learning: {
        input: false,
        notes: [],
    },
    school_on_campus_housing: {
        input: false,
        notes: [],
    },
    school_cadaver_lab: {
        input: false,
        notes: [],
    },
    school_faith_based_learning: {
        input: false,
        notes: [],
    },
    school_military_personnel_preference: {
        input: false,
        notes: [],
    },

    school_general_information: "",

    school_dual_degree_program: {
        input: false,
        notes: [],
    },
    school_type_of_degree_offered: {
        fields: [{
            input: "",
        }],
        notes: [],
    },
    school_bachelors_degree_required: {
        input: false,
        notes: [],
    },
}

const addSchoolSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    addSchool: (state, action) => {
      state = action.payload
    },
    clear: state => {
    }
  }
})

export const { addSchool } = addSchoolSlice.actions

export const addSchoolReducer = addSchoolSlice.reducer