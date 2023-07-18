export type Note = {
  type: string;
  info: string;
}

export type addSchoolState = {
  id: number,
  school_name: string;
    school_logo: string;
    school_street: string;
    school_city: string;
    school_state: string;
    school_zip_code: string;
    school_country: string;
    school_website: string;
    school_email: string;
    school_phone_number: string;
    school_campus_location: string;
    school_start_month: string;
    school_class_capacity: number;
    school_duration_full_time: string;
    school_duration_part_time: string;
    school_seat_deposit_in_state: number;
    school_seat_deposit_out_of_state: number;
    school_rolling_admissions: boolean;
    school_nonrolling_admissions: boolean;
    school_pre_pa_curriculum: boolean;
    school_direct_high_school_entry: boolean;
    school_part_time_option: boolean;
    school_online_learning: boolean;
    school_on_campus_housing: boolean;
    school_cadaver_lab: boolean;
    school_faith_based_learning: boolean;
    school_military_personnel_preference: boolean;
    school_general_information: string;
    school_dual_degree_program: boolean;
    school_type_of_degree_offered: string;
    school_bachelors_degree_required: boolean;

}

export type addSchoolNameAction = {
  payload: {
    schoolName: { 
      schoolName: string,
      notes: Note[]
    },
  }
}