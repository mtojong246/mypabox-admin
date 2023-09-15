import { School } from "../types/schools.types"

export const defaultSchool: School = {
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
    school_accreditation_status: {
        input: "",
        notes: []
    },
    school_acceditation_status_general_note: "",
    school_mission_statement: "",
    school_in_state_tuition: {
        input: 0,
        notes: []
    },
    school_out_of_state_tuition: {
        input: 0,
        notes: []
    },
    school_tuition_general_note: "",
    school_first_time_pass_rate: {
        input: 0,
        notes: []
    },
    school_average_five_year_first_time_pass_rate: {
        input: 0,
        notes: []
    },
    school_pance_pass_rate_note: '',
    school_minimum_gpa_required: false,
    school_minimum_overall_gpa_required: {
        input: 0,
        notes: []
    },
    school_minimum_science_gpa_required: {
        input: 0,
        notes: []
    },
    school_minimum_prerequisite_gpa_required: {
        input: 0,
        notes: []
    },
    school_minimum_gpa_recommended: false,
    school_minimum_overall_gpa_recommended: {
        input: 0,
        notes: []
    },
    school_minimum_science_gpa_recommended: {
        input: 0,
        notes: []
    },
    school_minimum_prerequisite_gpa_recommended: {
        input: 0,
        notes: []
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
    school_minimum_gpa_for_specific_course: [
        {
            minimum_gpa_required_for_course: 0,
            courseID: "",
            notes: [],
        }
    ],
    school_average_gpa_accepted_previous_cycle: {
        average_overall_gpa_accepted_previous_year: {
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
    school_gpa_general_note: "",

    school_prereq_required_courses: [],
    school_prereq_required_optional_courses: [],
    school_prereq_required_course_categories: [],
    school_prereq_recommended_courses: [],

    school_grade_criteria: {
        school_minimum_grade_required_for_all_courses: '',
        school_grade_criteria_note_section: [],
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

    school_pass_fail_criteria: {
        school_pass_fail_grade_accepted: false,
        school_pass_fail_grade_criteria_note_section: [],
    },

    school_ap_criteria: {
        school_ap_courses_accepted: false,
        school_ap_courses_criteria_note_section: [],
    },

    school_community_college_criteria: {
        school_community_college_credits_accepted: false,
        school_community_college_criteria_note_section: [],
    },

    school_clep_criteria: {
        school_clep_credits_accepted: false,
        school_clep_credits_criteria_note_section: [],
    },

    school_online_courses_criteria: {
        school_online_courses_accepted: false,
        school_online_courses_criteria_note_section: [],
    },

    school_prerequisite_completion_criteria: {
        school_all_courses_most_be_completed_before_applying: false,
        school_courses_can_be_in_progress_while_applying: false,
        school_prerequisite_completion_criteria_note_section: [],
    }

}