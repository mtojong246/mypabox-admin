import { School } from "../types/schools.types";

export const simpleInputs = ['school_name', 'school_logo', 'school_street', 'school_city', 'school_state', 'school_zip_code', 
'school_country', 'school_website', 'school_campus_location', 'school_start_month', 'school_class_capacity', 'school_duration_full_time',
'school_duration_part_time', 'school_seat_deposit_in_state', 'school_seat_deposit_out_of_state', 'school_rolling_admissions', 
'school_nonrolling_admissions', 'school_pre_pa_curriculum', 'school_direct_high_school_entry', 'school_part_time_option', 
'school_online_learning', 'school_on_campus_housing', 'school_cadaver_lab', 'school_faith_based_learning', 'school_military_personnel_preference',
'school_holistic_review', 'school_dual_degree_program', 'school_bachelors_degree_required', 'school_accreditation_status', 
'school_in_state_tuition', 'school_out_of_state_tuition', 'school_first_time_pass_rate', 'school_average_five_year_first_time_pass_rate',
'school_grade_criteria', 'school_pass_fail_criteria', 'school_ap_criteria', 'school_community_college_criteria', 'school_clep_criteria',
'school_online_courses_criteria' ,'school_paid_experience_required' ,'school_average_pa_shadowing_hours_accepted_previous_cycle', 'school_international_students_accepted',
'']

export const simpleArrays = ['school_email', 'school_phone_number', 'school_type_of_degree_offered'];

export const simpleNestedObjects = ['school_average_gpa_accepted_previous_cycle', 'school_time_frame_criteria', 'school_casper']

export const simpleConditionalNestedObjects = ['school_minimum_gpa_required', 'school_minimum_gpa_recommended', 'school_pa_shadowing_required', 'school_pa_shadowing_recommended', 
'school_certifications_required', 'school_application_submitted_on_caspa', 'school_application_submitted_directly_to_school', ]

export const defaultSchool: School = {
    id: '',
    isLive: true,
    school_name: {
        input: "",
    },
    edited_school_name: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
    },
    school_logo: {
        input: "",
    },
    edited_school_logo: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
    },
    school_street: {
        input: "",
    },
    edited_school_street: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
    },
    school_city: {
        input: "",
    },
    edited_school_city: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
    },
    school_state: {
        input: "",
    },
    edited_school_state: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
    },
    school_zip_code: {
        input: "",
    },
    edited_school_zip_code: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
    },
    school_country: {
        input: "",
    },
    edited_school_country: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
    },
    school_website: {
        input: "",
    },
    edited_school_website: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
    },
    school_email: {
        input: [],
        notes: [],
    },

    edited_school_email: {
        link: '',
        isEditMode: false,
        input: null,
        prev: null,
        notes: null,
    },
    
    school_phone_number: {
        input: [],
        notes: [],
    },

    edited_school_phone_number: {
        link: '',
        isEditMode: false,
        input: null,
        prev: null,
        notes: null,
    },

    school_campus_location: {
        input: "",
        notes: [],
    },
    edited_school_campus_location: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_start_month: {
        input: "",
        notes: [],
    },
    edited_school_start_month: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_class_capacity: {
        input: 0,
        notes: [],
    },
    edited_school_class_capacity: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_duration_full_time: {
        input: 0,
        notes: [],
    },
    edited_school_duration_full_time: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_duration_part_time: {
        input: 0,
        notes: [],
    },
    edited_school_duration_part_time: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },

    school_seat_deposit_in_state: {
        input: '',
        notes: [],
    },
    edited_school_seat_deposit_in_state: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_seat_deposit_out_of_state: {
        input: '',
        notes: [],
    },
    edited_school_seat_deposit_out_of_state: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },

    school_rolling_admissions: {
        input: false,
        notes: [],
    },
    edited_school_rolling_admissions: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_nonrolling_admissions: {
        input: false,
        notes: [],
    },
    edited_school_nonrolling_admissions: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_pre_pa_curriculum: {
        input: false,
        notes: [],
    },
    edited_school_pre_pa_curriculum: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_direct_high_school_entry: {
        input: false,
        notes: [],
    },
    edited_school_direct_high_school_entry: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_part_time_option: {
        input: false,
        notes: [],
    },
    edited_school_part_time_option: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_online_learning: {
        input: false,
        notes: [],
    },
    edited_school_online_learning: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_on_campus_housing: {
        input: false,
        notes: [],
    },
    edited_school_on_campus_housing: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_cadaver_lab: {
        input: false,
        notes: [],
    },
    edited_school_cadaver_lab: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_faith_based_learning: {
        input: false,
        notes: [],
    },
    edited_school_faith_based_learning: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_military_personnel_preference: {
        input: false,
        notes: [],
    },
    edited_school_military_personnel_preference: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },

    school_holistic_review: {
        input: false,
        notes: [],
    },

    edited_school_holistic_review: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },

    school_general_information: "",

    school_exams_general_note: "",

    school_dual_degree_program: {
        input: false,
        notes: [],
    },
    edited_school_dual_degree_program: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_type_of_degree_offered: {
        fields: [],
        notes: [],
    },

    edited_school_type_of_degree_offered: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },

    school_bachelors_degree_required: {
        input: false,
        notes: [],
    },
    edited_school_bachelors_degree_required: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_accreditation_status: {
        input: "",
        notes: []
    },
    edited_school_accreditation_status: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_mission_statement: {
        input: '',
    },
    edited_school_mission_statement: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
    },
    school_in_state_tuition: {
        input: '',
        notes: []
    },
    edited_school_in_state_tuition: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_out_of_state_tuition: {
        input: '',
        notes: []
    },
    edited_school_out_of_state_tuition: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_first_time_pass_rate: {
        input: '',
        notes: []
    },
    edited_school_first_time_pass_rate: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_average_five_year_first_time_pass_rate: {
        input: '',
        notes: []
    },
    edited_school_average_five_year_first_time_pass_rate: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },
    school_pance_pass_rate_note: '',

    school_minimum_gpa_required: {
        input: false,
        school_minimum_overall_gpa_required: null,
        school_minimum_science_gpa_required: null,
        school_minimum_prerequisite_gpa_required: null,
    },

    edited_school_minimum_gpa_required: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        edited_school_minimum_overall_gpa_required: {
            input: null,
            prev: null,
            isEditMode: false,
            notes: null,
        },
        edited_school_minimum_science_gpa_required: {
            input: null,
            prev: null,
            isEditMode: false,
            notes: null,
        },
        edited_school_minimum_prerequisite_gpa_required: {
            input: null,
            prev: null,
            isEditMode: false,
            notes: null,
        },
    },

    school_minimum_gpa_recommended: {
        input: false,
        school_minimum_overall_gpa_recommended: null,
        school_minimum_science_gpa_recommended: null,
        school_minimum_prerequisite_gpa_recommended: null,
    },

    edited_school_minimum_gpa_recommended: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        edited_school_minimum_overall_gpa_recommended: {
            input: null,
            prev: null,
            isEditMode: false,
            notes: null,
        },
        edited_school_minimum_science_gpa_recommended: {
            input: null,
            prev: null,
            isEditMode: false,
            notes: null,
        },
        edited_school_minimum_prerequisite_gpa_recommended: {
            input: null,
            prev: null,
            isEditMode: false,
            notes: null,
        },
    },
    school_other_types_of_gpa_evaluated: [
        {
            gpa_value_required_or_recommended: "required",
            minimum_gpa_value_needed: 0,
            minimum_number_of_credits_evaluated: 0,
            type_of_gpa_evaluated: "",
            notes: [],
        }
    ],

    edited_school_other_types_of_gpa_evaluated: {
        link: '',
        isEditMode: false,
        input: null,
        prev: null,
    },

    school_minimum_gpa_for_specific_course: [
        {
            minimum_gpa_required_for_course: 0,
            courseID: "",
            notes: [],
        }
    ],

    edited_school_minimum_gpa_for_specific_course: {
        link: '',
        isEditMode: false,
        input: null,
        prev: null,
    },

    school_average_gpa_accepted_previous_cycle: {
        average_overall_gpa_accepted_previous_year: {
            input: 0,
            notes: [],
        },
        average_bcp_gpa_accepted_previous_year: {
            input: 0,
            notes: [],
        },
        average_science_gpa_accepted_previous_year: {
            input: 0,
            notes: [],
        },
        average_prerequisite_gpa_accepted_previous_year: {
            input: 0,
            notes: [],
        },
    },

    edited_school_average_gpa_accepted_previous_cycle: {
        link: '',
        isEditMode: false,
        input: null,
        edited_average_overall_gpa_accepted_previous_year: {
            input: null,
            prev: null,
            isEditMode: false,
            notes: null,
        },
        edited_average_bcp_gpa_accepted_previous_year: {
            input: null,
            prev: null,
            isEditMode: false,
            notes: null,
        },
        edited_average_science_gpa_accepted_previous_year: {
            input: null,
            prev: null,
            isEditMode: false,
            notes: null,
        },
        edited_average_prerequisite_gpa_accepted_previous_year: {
            input: null,
            prev: null,
            isEditMode: false,
            notes: null,
        },
    },
    school_gpa_general_note: "",

    school_prereq_required_notes: {
        notes: [],
    },

    school_prereq_required_courses: {
        courses: [],
        notes: [],
    },
    school_prereq_required_optional_courses: [],
    school_prereq_required_course_categories: [],
    school_prereq_recommended_courses: {
        courses: [],
        notes: [],
    },

    edited_school_prereq_required_courses: {
        link: '',
        notes: null,
        isEditMode: false,
        input: null,
        prev: null,
    },

    edited_school_prereq_recommended_courses: {
        link: '',
        notes: null,
        isEditMode: false,
        input: null,
        prev: null,
    },

    edited_school_prereq_required_optional_courses: {
        link: '',
        isEditMode: false,
        input: null,
        prev: null,
    },

    edited_school_prereq_required_course_categories: {
        link: '',
        isEditMode: false,
        input: null,
        prev: null,
    },

    school_grade_criteria: {
        school_minimum_grade_required_for_all_courses: '',
        school_grade_criteria_note_section: [],
    },

    edited_school_grade_criteria: {
        link: '',
        isEditMode: false,
        input: null,
        notes: null,
        edited_school_minimum_grade_required_for_all_courses: {
            input: null,
            prev: null,
        }
    },

    school_time_frame_criteria: {
        school_time_frame_all_courses_must_be_completed: {
            input: '',
            notes: [],
        },
        school_time_frame_science_courses_must_be_completed: {
            input: '',
            notes: [],
        },
        school_time_frame_math_courses_must_be_completed: {
            input: '',
            notes: [],
        },
        school_time_frame_criteria_note_section: [],
    },

    edited_school_time_frame_criteria: {
        link: '',
        isEditMode: false,
        input: null,
        notes: null,
        edited_school_time_frame_all_courses_must_be_completed: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_time_frame_math_courses_must_be_completed: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_time_frame_science_courses_must_be_completed: {
            input: null,
            prev: null,
            notes: null,
        }
    },

    school_pass_fail_criteria: {
        school_pass_fail_grade_accepted: false,
        school_pass_fail_grade_criteria_note_section: [],
    },

    edited_school_pass_fail_criteria: {
        link: '',
        isEditMode: false,
        input: null,
        notes: null,
        edited_school_pass_fail_grade_accepted: {
            input: null,
            prev: null,
        }
    },

    school_ap_criteria: {
        school_ap_courses_accepted: false,
        school_ap_courses_criteria_note_section: [],
    },

    edited_school_ap_criteria: {
        link: '',
        isEditMode: false,
        input: null,
        notes: null,
        edited_school_ap_courses_accepted: {
            input: null,
            prev: null,
        }
    },

    school_community_college_criteria: {
        school_community_college_credits_accepted: false,
        school_community_college_criteria_note_section: [],
    },

    edited_school_community_college_criteria: {
        link: '',
        isEditMode: false,
        input: null,
        notes: null,
        edited_school_community_college_credits_accepted: {
            input: null,
            prev: null,
        }
    },

    school_clep_criteria: {
        school_clep_credits_accepted: false,
        school_clep_credits_criteria_note_section: [],
    },

    edited_school_clep_criteria: {
        link: '',
        isEditMode: false,
        input: null,
        notes: null,
        edited_school_clep_credits_accepted: {
            input: null,
            prev: null,
        }
    },

    school_online_courses_criteria: {
        school_online_courses_accepted: false,
        school_online_courses_criteria_note_section: [],
    },

    edited_school_online_courses_criteria: {
        link: '',
        isEditMode: false,
        input: null,
        notes: null,
        edited_school_online_courses_accepted: {
            input: null,
            prev: null,
        }
    },

    school_prerequisite_completion_criteria: {
        school_all_courses_most_be_completed_before_applying: false,
        school_courses_can_be_in_progress_while_applying: false,
        school_maximum_number_of_courses_pending_while_applying: null,
        school_maximum_number_of_credits_pending_while_applying: null,
        school_maximum_number_of_science_courses_pending_while_applying: null,
        school_maximum_number_of_non_science_courses_pending_while_applying: null,
        school_minimum_grade_required_for_pending_courses: null,
        school_date_pending_courses_must_be_completed: null,
        school_semester_pending_courses_must_be_completed: null,
        school_prerequisite_completion_criteria_note_section: [],
    },

    edited_school_prerequisite_completion_criteria: {
        link: '',
        isEditMode: false,
        input: null,
        notes: null,
        edited_school_all_courses_most_be_completed_before_applying: {
            input: null,
            prev: null,
        },
        edited_school_courses_can_be_in_progress_while_applying: {
            input: null,
            prev: null,
        },
        edited_school_maximum_number_of_courses_pending_while_applying: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_maximum_number_of_credits_pending_while_applying: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_maximum_number_of_science_courses_pending_while_applying: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_maximum_number_of_non_science_courses_pending_while_applying: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_minimum_grade_required_for_pending_courses: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_date_pending_courses_must_be_completed: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_semester_pending_courses_must_be_completed: {
            input: null,
            prev: null,
            notes: null,
        },
    },
    

    school_paid_experience_required: {
        input: false,
        school_paid_experience_required_notes: [],
    },

    edited_school_paid_experience_required: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },

    school_patient_experience: {
        school_patient_experience_required: false,
        school_patient_experience_recommended: false,
        school_minimum_patient_care_experience_hours_required: null,
        school_minimum_patient_care_experience_hours_recommended: null,
        school_minimum_time_frame_patient_care_experience_needs_to_be_completed: null,
        school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: null,
        school_average_patient_care_experience_hours_accepted_previous_cycle: 0,
        school_patient_care_experience_general_notes: [],
    },

    edited_school_patient_experience: {
        link: '',
        isEditMode: false,
        input: null,
        notes: null,
        edited_school_patient_experience_required: {
            input: null,
            prev: null,
        },
        edited_school_patient_experience_recommended: {
            input: null,
            prev: null,
        },
        edited_school_minimum_patient_care_experience_hours_required: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_minimum_patient_care_experience_hours_recommended: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_average_patient_care_experience_hours_accepted_previous_cycle:{
            input: null,
            prev: null,
        },
    },

    school_healthcare_experience: {
        school_healthcare_experience_required: false,
        school_healthcare_experience_recommended: false,
        school_minimum_healthcare_experience_hours_required: null,
        school_minimum_time_frame_healthcare_experience_needs_to_be_completed: null,
        school_minimum_healthcare_experience_hours_recommended: null,
        school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended: null,
        school_average_healthcare_experience_hours_accepted_previous_cycle: 0,
        school_healthcare_experience_general_notes: [],
    },

    edited_school_healthcare_experience: {
        link: '',
        isEditMode: false,
        input: null,
        notes: null,
        edited_school_healthcare_experience_required: {
            input: null,
            prev: null,
        },
        edited_school_healthcare_experience_recommended: {
            input: null,
            prev: null,
        },
        edited_school_minimum_healthcare_experience_hours_required: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_minimum_healthcare_experience_hours_recommended: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_average_healthcare_experience_hours_accepted_previous_cycle: {
            input: null,
            prev: null,
        },
    },

    school_community_service: {
        school_community_service_required: false,
        school_minimum_community_service_hours_required: null,
        school_community_service_recommended: false,
        school_minimum_community_service_hours_recommended: null,
        school_average_community_service_hours_accepted_previous_cycle: 0,
        school_community_service_general_notes: [],
    },

    edited_school_community_service: {
        link: '',
        isEditMode: false,
        input: null,
        notes: null,
        edited_school_community_service_required: {
            input: null,
            prev: null,
        },
        edited_school_minimum_community_service_hours_required: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_community_service_recommended: {
            input: null,
            prev: null,
        },
        edited_school_minimum_community_service_hours_recommended: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_average_community_service_hours_accepted_previous_cycle: {
            input: null,
            prev: null,
        },
    },

    school_volunteer_service: {
        school_volunteer_service_required: false,
        school_minimum_volunteer_service_hours_required: null,
        school_volunteer_service_recommended: false,
        school_minimum_volunteer_service_hours_recommended: null,
        school_average_volunteer_service_hours_accepted_previous_cycle: 0,
        school_volunteer_service_general_notes: [],
    },

    edited_school_volunteer_service: {
        link: '',
        isEditMode: false,
        input: null,
        notes: null,
        edited_school_volunteer_service_required: {
            input: null,
            prev: null,
        },
        edited_school_minimum_volunteer_service_hours_required: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_volunteer_service_recommended:  {
            input: null,
            prev: null,
        },
        edited_school_minimum_volunteer_service_hours_recommended:  {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_average_volunteer_service_hours_accepted_previous_cycle:  {
            input: null,
            prev: null,
        },
    },

    school_pa_shadowing_required: {
        input: false,
        school_minimum_pa_shadowing_hours_required: null,
        school_minimum_pa_shadowing_hours_required_notes: [],
    },

    edited_school_pa_shadowing_required: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
        edited_school_minimum_pa_shadowing_hours_required: {
            input: null,
            prev: null,
            isEditMode: false,
        }
    },

    school_pa_shadowing_recommended: {
        input: false,
        school_minimum_pa_shadowing_hours_recommended: null,
        school_minimum_pa_shadowing_hours_recommended_notes: [],
    },

    edited_school_pa_shadowing_recommended: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
        edited_school_minimum_pa_shadowing_hours_recommended: {
            input: null,
            prev: null,
            isEditMode: false,
        }
    },

    school_average_pa_shadowing_hours_accepted_previous_cycle: {
        input: 0,
        school_average_pa_shadowing_hours_accepted_previous_cycle_notes: [],
    },

    edited_school_average_pa_shadowing_hours_accepted_previous_cycle: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },


    school_required_optional_exams: [],

    edited_school_required_optional_exams: {
        isEditMode: false,
        link: '',
        input: null,
        prev: null,
    },

    school_gre: {
        school_gre_required: false,
        school_gre_recommended: false,
        school_caspa_gre_institution_code: null,
        school_gre_institution_code: null,

        school_minimum_time_frame_gre_must_be_completed: null,

        school_mcat_accepted_in_place_of_gre: null,

        school_gre_exempt_with_masters_degree: null,

        school_gre_exempt_with_phd_degree: null,
        
        school_minimum_gre_scores_required: null,
        school_gre_minimum_verbal_score: null,
        school_gre_minimum_quantitative_score: null,
        school_gre_minimum_analytical_writing_score: null,
        school_gre_minimum_combined_score: null,
        school_minimum_gre_score_notes: null,

        school_gre_minimum_verbal_percentile: null,
        school_gre_minimum_quantitative_percentile: null,
        school_gre_minimum_analytical_writing_percentile: null,
        school_gre_minimum_combined_percentile: null,
        school_minimum_gre_percentile_notes: null,

        school_average_gre_verbal_score_accepted_previous_year: null,
        school_average_gre_quantitative_score_accepted_previous_year: null,
        school_average_gre_analytical_writing_score_accepted_previous_year: null,
        school_average_gre_combined_score_accepted_previous_year: null,

        school_average_gre_verbal_percentile_accepted_previous_year: null,
        school_average_gre_quantitative_percentile_accepted_previous_year: null,
        school_average_gre_analytical_writing_percentile_accepted_previous_year: null,
        school_average_gre_combined_percentile_accepted_previous_year: null,

        school_gre_general_notes: [],

    },

    edited_school_gre: {
        isEditMode: false,
        link: '',
        input: null,
        edited_school_gre_general_notes: null,
        edited_school_gre_required: {
            input: null,
            prev: null,
        },
        edited_school_gre_recommended: {
            input: null,
            prev: null,
        },
        edited_school_caspa_gre_institution_code: {
            input: null,
            prev: null,
        },
        edited_school_gre_institution_code: {
            input: null,
            prev: null,
        },

        edited_school_minimum_time_frame_gre_must_be_completed: {
            input: null,
            prev: null,
            notes: null,
        },

        edited_school_mcat_accepted_in_place_of_gre: {
            input: null,
            prev: null,
            notes: null,
        },

        edited_school_gre_exempt_with_masters_degree: {
            input: null,
            prev: null,
            notes: null,
        },

        edited_school_gre_exempt_with_phd_degree: {
            input: null,
            prev: null,
            notes: null,
        },
        edited_school_minimum_gre_score_notes: null,
        edited_school_minimum_gre_percentile_notes: null,
        edited_school_minimum_gre_scores_required: {
            input: null,
            prev: null,
        },
        edited_school_gre_minimum_verbal_score: {
            input: null,
            prev: null,
        },
        edited_school_gre_minimum_quantitative_score: {
            input: null,
            prev: null,
        },
        edited_school_gre_minimum_analytical_writing_score: {
            input: null,
            prev: null,
        },
        edited_school_gre_minimum_combined_score: {
            input: null,
            prev: null,
        },

        edited_school_gre_minimum_verbal_percentile: {
            input: null,
            prev: null,
        },
        edited_school_gre_minimum_quantitative_percentile: {
            input: null,
            prev: null,
        },
        edited_school_gre_minimum_analytical_writing_percentile: {
            input: null,
            prev: null,
        },
        edited_school_gre_minimum_combined_percentile: {
            input: null,
            prev: null,
        },

        edited_school_average_gre_verbal_score_accepted_previous_year: {
            input: null,
            prev: null,
        },
        edited_school_average_gre_quantitative_score_accepted_previous_year: {
            input: null,
            prev: null,
        },
        edited_school_average_gre_analytical_writing_score_accepted_previous_year: {
            input: null,
            prev: null,
        },
        edited_school_average_gre_combined_score_accepted_previous_year:{
            input: null,
            prev: null,
        },

        edited_school_average_gre_verbal_percentile_accepted_previous_year: {
            input: null,
            prev: null,
        },
        edited_school_average_gre_quantitative_percentile_accepted_previous_year: {
            input: null,
            prev: null,
        },
        edited_school_average_gre_analytical_writing_percentile_accepted_previous_year: {
            input: null,
            prev: null,
        },
        edited_school_average_gre_combined_percentile_accepted_previous_year: {
            input: null,
            prev: null,
        },


    },

    school_pacat: {
        school_pacat_required: false,
        school_pacat_recommended: false,
        school_pacat_exam_school_code: null,
        school_pacat_exam_scaled_minimum_score_required: null,
        school_pacat_exam_group_scaled_minimum_score_required: null,
        school_pacat_exam_notes: [],
    },

    edited_school_pacat: {
        link: '',
        input: null,
        notes: null,
        edited_school_pacat_required: {
            input: null,
            prev: null,
            isEditMode: false,
        },
        edited_school_pacat_recommended: {
            input: null,
            prev: null,
            isEditMode: false,
        },
        edited_school_pacat_exam_school_code: {
            input: null,
            prev: null,
            isEditMode: false,
        },
        edited_school_pacat_exam_scaled_minimum_score_required: {
            input: null,
            prev: null,
            isEditMode: false,
        },
        edited_school_pacat_exam_group_scaled_minimum_score_required: {
            input: null,
            prev: null,
            isEditMode: false,
        },


    },

    school_casper: {
        school_casper_required: false,
        school_casper_recommended: false,
        school_casper_exam_notes: [],
    },

    edited_school_casper: {
        link: '',
        input: null,
        notes: null,
        edited_school_casper_required: {
            input: null,
            prev: null,
            isEditMode: false,
        },
        edited_school_casper_recommended: {
            input: null,
            prev: null,
            isEditMode: false,
        }
    },

    school_english_proficiency_exams: {
        school_english_proficiency_exams_required: false,
        notes: [],

        school_toefl_required: null,
        school_minimum_time_frame_toefl_needs_to_be_completed: null,
        school_toefl_exempt_with_masters_degree: null,
        school_toefl_exempt_with_doctoral_degree: null,

        school_toefl_ibt_minimum_total_score_required: null,
        school_toefl_ibt_minimum_reading_score_required: null,
        school_toefl_ibt_minimum_writing_score_required: null,
        school_toefl_ibt_minimum_listening_score_required: null,
        school_toefl_ibt_minimum_speaking_score_required: null,
        school_toefl_ibt_minimum_score_notes: null,

        school_toefl_pbt_minimum_total_score_required: null,
        school_toefl_pbt_minimum_reading_score_required: null,
        school_toefl_pbt_minimum_writing_score_required: null,
        school_toefl_pbt_minimum_listening_score_required: null,
        school_toefl_pbt_minimum_speaking_score_required: null,
        school_toefl_pbt_minimum_score_notes: null,

        school_ielt_required: null,
        school_ielt_minimum_total_score_required: null,
        school_ielt_minimum_score_notes: null,

        school_melab_required: null,
        school_melab_minimum_total_score_required: null,
        school_melab_minimum_score_notes: null,

        school_pte_academic_required: null,
        school_pte_academic_minimum_total_score_required: null,
        school_pte_academic_minimum_score_notes: null,

        school_itep_academic_plus_required: null,
        school_itep_academic_plus_minimum_total_score_required: null,
        school_itep_academic_plus_minimum_score_notes: null,

    },

    edited_school_english_proficiency_exams: {
        link: '',
        isEditMode: false,
        input: null,
        edited_notes: null,
        edited_school_ielt_minimum_score_notes: null,
        edited_school_itep_academic_plus_minimum_score_notes: null,
        edited_school_melab_minimum_score_notes: null,
        edited_school_pte_academic_minimum_score_notes: null,
        edited_school_toefl_ibt_minimum_score_notes: null,
        edited_school_toefl_pbt_minimum_score_notes: null,
        edited_school_english_proficiency_exams_required: {
            input: null,
            prev: null,
        },

        edited_school_toefl_required: {
            input: null,
            prev: null,
        },
        edited_school_minimum_time_frame_toefl_needs_to_be_completed: {
            input: null,
            prev: null,
        },
        edited_school_toefl_exempt_with_masters_degree: {
            input: null,
            prev: null,
        },
        edited_school_toefl_exempt_with_doctoral_degree: {
            input: null,
            prev: null,
        },

        edited_school_toefl_ibt_minimum_total_score_required: {
            input: null,
            prev: null,
        },
        edited_school_toefl_ibt_minimum_reading_score_required: {
            input: null,
            prev: null,
        },
        edited_school_toefl_ibt_minimum_writing_score_required: {
            input: null,
            prev: null,
        },
        edited_school_toefl_ibt_minimum_listening_score_required: {
            input: null,
            prev: null,
        },
        edited_school_toefl_ibt_minimum_speaking_score_required: {
            input: null,
            prev: null,
        },

        edited_school_toefl_pbt_minimum_total_score_required: {
            input: null,
            prev: null,
        },
        edited_school_toefl_pbt_minimum_reading_score_required: {
            input: null,
            prev: null,
        },
        edited_school_toefl_pbt_minimum_writing_score_required: {
            input: null,
            prev: null,
        },
        edited_school_toefl_pbt_minimum_listening_score_required: {
            input: null,
            prev: null,
        },
        edited_school_toefl_pbt_minimum_speaking_score_required: {
            input: null,
            prev: null,
        },

        edited_school_ielt_required: {
            input: null,
            prev: null,
        },
        edited_school_ielt_minimum_total_score_required: {
            input: null,
            prev: null,
        },

        edited_school_melab_required: {
            input: null,
            prev: null,
        },
        edited_school_melab_minimum_total_score_required:{
            input: null,
            prev: null,
        },

        edited_school_pte_academic_required: {
            input: null,
            prev: null,
        },
        edited_school_pte_academic_minimum_total_score_required: {
            input: null,
            prev: null,
        },

        edited_school_itep_academic_plus_required: {
            input: null,
            prev: null,
        },
        edited_school_itep_academic_plus_minimum_total_score_required: {
            input: null,
            prev: null,
        },
    },

    school_evaluations_required: {
        input: false,
        school_minimum_number_of_evaluations_required: null,
        school_required_evaluator_title: null,
        school_minimum_time_evaluator_knows_applicant: null,
        school_optional_evaluators_required: null,
        school_evaluations_required_notes: [],
    },

    edited_school_evaluations_required: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
        edited_school_minimum_number_of_evaluations_required: {
            input: null,
            prev: null,
        },
        edited_school_required_evaluator_title: {
            input: null,
            prev: null,
        },
        edited_school_minimum_time_evaluator_knows_applicant: {
            input: null,
            prev: null,
        },
        edited_school_optional_evaluators_required: {
            input: null,
            prev: null,
        },
    },

    school_evaluations_recommended: {
        input: false,
        school_minimum_number_of_evaluations_recommended: null,
        school_recommended_evaluator_title: null,
        school_minimum_time_evaluator_knows_applicant: null,
        school_optional_evaluators_recommended: null,
        school_evaluations_recommended_notes: [],
    },

    edited_school_evaluations_recommended: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
        edited_school_minimum_number_of_evaluations_recommended: {
            input: null,
            prev: null,
        },
        edited_school_recommended_evaluator_title: {
            input: null,
            prev: null,
        },
        edited_school_minimum_time_evaluator_knows_applicant: {
            input: null,
            prev: null,
        },
        edited_school_optional_evaluators_recommended: {
            input: null,
            prev: null,
        },
    },

    school_international_students_accepted: {
        input: false,
        notes: [],
    },
    edited_school_international_students_accepted: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
    },

    school_certifications_required: {
        input: false,
        school_certifications_required_options: null,
        school_certification_notes: [],
    },

    edited_school_certifications_required: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
        edited_school_certifications_required_options: {
            input: null,
            prev: null,
        },
    },

    school_application_submitted_on_caspa: {
        input: false,
        school_caspa_application_deadline_date: null,
        school_caspa_application_deadline_type: null,
        school_caspa_application_notes: [],
    },
    edited_school_application_submitted_on_caspa: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
        edited_school_caspa_application_deadline_date: {
            input: null,
            prev: null,
            isEditMode: false,
        },
        edited_school_caspa_application_deadline_type: {
            input: null,
            prev: null,
            isEditMode: false,
        }
    },

    school_application_submitted_directly_to_school: {
        input: false,
        school_application_direct_to_school_deadline: null,
        school_application_direct_to_school_fee: null,
        school_application_direct_to_school_notes: [],
    },

    edited_school_application_submitted_directly_to_school: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
        edited_school_application_direct_to_school_deadline: {
            input: null,
            prev: null,
            isEditMode: false,
        },
        edited_school_application_direct_to_school_fee: {
            input: null,
            prev: null,
            isEditMode: false,
        }
    },

    school_supplemental_application_required: {
        input: false,
        school_supplemental_application_deadline: null,
        school_supplemental_application_fee: null,
        school_supplemental_application_link: null,
        school_supplemental_application_link_provided_with_invite_only: null,
        school_supplemental_application_notes: [],
    },

    edited_school_supplemental_application_required: {
        input: null,
        prev: null,
        isEditMode: false,
        link: '',
        notes: null,
        edited_school_supplemental_application_deadline: {
            input: null,
            prev: null,
            isEditMode: false,
        },
        edited_school_supplemental_application_fee: {
            input: null,
            prev: null,
            isEditMode: false,
        },
        edited_school_supplemental_application_link: {
            input: null,
            prev: null,
            isEditMode: false,
        },
        edited_school_supplemental_application_link_provided_with_invite_only: {
            input: null,
            prev: null,
            isEditMode: false,
        }
    },
    
    school_preference: '',

}

export const generalInfoFields: {label: string, name: string}[] = [
    {
        label: 'School Name',
        name: 'school_name'
    },
    {
        label: 'School Logo',
        name: 'school_logo'
    },
    {
        label: 'Street Address',
        name: 'school_street',
    },
    {
        label: 'City',
        name: 'school_city'
    },
    {
        label: 'Country',
        name: 'school_country'
    },
    {
        label: 'State',
        name: 'school_state'
    },
    {
        label: 'Zip Code',
        name: 'school_zip_code'
    },
    {
        label: 'Website',
        name: 'school_website'
    },
    {
        label: 'Email',
        name: 'school_email'
    },
    {
        label: 'Phone Number',
        name: 'school_phone_number'
    },
    {
        label: 'Campus Location',
        name: 'school_campus_location'
    },
    {
        label: 'Start Month',
        name: 'school_start_month'
    },
    {
        label: 'Class Capacity',
        name: 'school_class_capacity'
    },
    {
        label: 'Duration (Full-Time)',
        name: 'school_duration_full_time'
    },
    {
        label: 'Duration (Part-Time)',
        name: 'school_duration_part_time'
    },
    {
        label: 'Rolling Admissions',
        name: 'school_rolling_admissions'
    },
    {
        label: 'Non-Rolling Admissions',
        name: 'school_nonrolling_admissions'
    },
    {
        label: 'Pre PA Curriculum',
        name: 'school_pre_pa_curriculum'
    },
    {
        label: 'Direct High School Entry',
        name: 'school_direct_high_school_entry'
    },
    {
        label: 'Part-time Options',
        name: 'school_part_time_option'
    },
    {
        label: 'Online Learning',
        name: 'school_online_learning'
    },
    {
        label: 'On-Campus Housing',
        name: 'school_on_campus_housing'
    },
    {
        label: 'Cadaver Lab',
        name: 'school_cadaver_lab'
    },
    {
        label: 'Faith-Based Learning',
        name: 'school_faith_based_learning'
    },
    {
        label: 'Military Personnel Preference',
        name: 'school_military_personnel_preference'
    },
    {
        label: 'Holistic Review',
        name: 'school_holistic_review'
    },
    {
        label: 'General Information',
        name: 'school_general_information'
    }
];

export const tuitionFields: {label: string, name: string}[] = [
    {
        label: 'In-State Tuition',
        name: 'school_in_state_tuition',
    },
    {
        label: 'Out-of-State Tuition',
        name: 'school_out_of_state_tuition'
    },
    {
        label: 'In-State Seat Deposit',
        name: 'school_seat_deposit_in_state'
    },
    {
        label: 'Out-of-State Seat Deposit',
        name: 'school_seat_deposit_out_of_state'
    }

]

export const degreeInfoFields: {label: string, name: string}[] = [
    {
        label: 'Type of Degrees Offered',
        name: 'school_type_of_degree_offered'
    },
    {
        label: 'Dual-Degree Program',
        name: 'school_dual_degree_program'
    },
    {
        label: 'Bachelors Degree Required',
        name: 'school_bachelors_degree_required'
    }
]

export const paShadowingFields: {label: string, name: string, altNoteName?: string}[] = [
    {
        label: 'PA Shadowing Required',
        name: 'school_pa_shadowing_required',
        altNoteName: 'school_minimum_pa_shadowing_hours_required_notes'
    },
    {
        label: 'PA Shadowing Recommended',
        name: 'school_pa_shadowing_recommended',
        altNoteName: 'school_minimum_pa_shadowing_hours_recommended_notes'
    },
    {
        label: 'Average PA Shadowing Hours Accepted Previous Cycle',
        name: 'school_average_pa_shadowing_hours_accepted_previous_cycle',
        altNoteName: 'school_average_pa_shadowing_hours_accepted_previous_cycle_notes'
    }
]

export const experienceFields:  {label: string, name: string, altNoteName?: string}[] = [
    {
        label: 'Paid Experience Required',
        name: 'school_paid_experience_required',
        altNoteName: 'school_paid_experience_required_notes'
    },
    {
        label: 'Patient Experience (PCE)',
        name: 'school_patient_experience',
        altNoteName: 'school_patient_care_experience_general_notes',
    },
    {
        label: 'Healthcare Experience (HCE)',
        name: 'school_healthcare_experience',
        altNoteName: 'school_healthcare_experience_general_notes'
    },
    {
        label: 'Community Service',
        name: 'school_community_service',
        altNoteName: 'school_community_service_general_notes'
    },
    {
        label: 'Volunteer Service',
        name: 'school_volunteer_service',
        altNoteName: 'school_volunteer_service_general_notes'
    }
]

export const booleanFields: {label: string, name: string, altInputName?: string, altNoteName?: string}[] = [
    {
        label: "Pass/Fail Courses Accepted",
        name: "school_pass_fail_criteria",
        altInputName: 'school_pass_fail_grade_accepted',
        altNoteName: "school_pass_fail_grade_criteria_note_section",
      },
      {
        label: "AP Courses Accepted",
        name: "school_ap_criteria",
        altInputName: 'school_ap_courses_accepted',
        altNoteName: "school_ap_courses_criteria_note_section",
      },
      {
        label: "Community College Courses Accepted",
        name: "school_community_college_criteria",
        altInputName: 'school_community_college_credits_accepted',
        altNoteName: "school_community_college_criteria_note_section",
      },
      {
        label: "CLEP Credits Accepted",
        name: "school_clep_criteria",
        altInputName: 'school_clep_credits_accepted',
        altNoteName: "school_clep_credits_criteria_note_section",
      },
      {
        label: "Online Courses Accepted",
        name: "school_online_courses_criteria",
        altInputName: 'school_online_courses_accepted',
        altNoteName: "school_online_courses_criteria_note_section",
      },
]

export const gpaFields: {label: string, name: string, altNoteName?: string}[] = [
    {
        label: 'Minimum GPA Required',
        name: 'school_minimum_gpa_required',
    },
    {
        label: 'Minimum GPA Recommended',
        name: 'school_minimum_gpa_recommended',
    },
    {
        label: 'Other Types of GPA Evaluated',
        name: 'school_other_types_of_gpa_evaluated',
    }
]


export const userPermissions: {label: string, value: string}[] = [
    {
        label: 'Edit input fields with verification required',
        value: 'canEditWithVerificationNeeded'
    },
    {
        label: 'Edit input fields without verification required',
        value: 'canEditWithoutVerificationNeeded'
    },
    {
        label: 'Verify input fields',
        value: 'canVerify'
    },
    {
        label: 'Make school data live',
        value: 'canMakeLive'
    },
    {
        label: 'Add / delete schools',
        value: 'canAddOrDelete'
    }
]

export const defaultUserWithPassword = {
    id: '',
    displayName: '',
    email: '',
    password: '',
    isSuperAdmin: false,
    permissions: {
        canEditWithoutVerificationNeeded: false,
        canEditWithVerificationNeeded: false,
        canVerify: false,
        canMakeLive: false,
        canAddOrDelete: false,
    },
    activeTasks: [],
    completedTasks: [],
    archivedTasks: [],
  }

  export const defaultUserWithoutPassword = {
    id: '',
    displayName: '',
    email: '',
    isSuperAdmin: false,
    permissions: {
        canEditWithoutVerificationNeeded: false,
        canEditWithVerificationNeeded: false,
        canVerify: false,
        canMakeLive: false,
        canAddOrDelete: false,
    },
    activeTasks: [],
    completedTasks: [],
    archivedTasks: [],
  }


  export const mockUser = {
    id: '',
    displayName: '',
    email: '',
    isSuperAdmin: false,
    permissions: {
        canEditWithoutVerificationNeeded: false,
        canEditWithVerificationNeeded: true,
        canVerify: true,
        canMakeLive: false,
        canAddOrDelete: true,
    },
    activeTasks: [],
    completedTasks: [],
    archivedTasks: [],
  }
  
    
   
    
    

    