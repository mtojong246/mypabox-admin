import { School } from "../types/schools.types"

export const defaultSchool: School = {
    id: 0,
    school_name: {
        input: "",
    },
    school_logo: {
        input: "",
    },
    school_street: {
        input: "",
    },
    school_city: {
        input: "",
    },
    school_state: {
        input: "",
    },
    school_zip_code: {
        input: "",
    },
    school_country: {
        input: "",
    },
    school_website: {
        input: "",
    },
    school_email: {
        input: [],
        notes: [],
    },
    school_phone_number: {
        input: [],
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
        input: 0,
        notes: [],
    },
    school_duration_part_time: {
        input: 0,
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
        fields: [],
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
    school_mission_statement: "",
    school_in_state_tuition: {
        input: 0,
        notes: []
    },
    school_out_of_state_tuition: {
        input: 0,
        notes: []
    },
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
    school_minimum_overall_gpa_required: null,
    school_minimum_science_gpa_required: null,
    school_minimum_prerequisite_gpa_required: null,
    school_minimum_gpa_recommended: false,
    school_minimum_overall_gpa_recommended: null,
    school_minimum_science_gpa_recommended: null,
    school_minimum_prerequisite_gpa_recommended: null,
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
        school_maximum_number_of_courses_pending_while_applying: null,
        school_maximum_number_of_credits_pending_while_applying: null,
        school_maximum_number_of_science_courses_pending_while_applying: null,
        school_maximum_number_of_non_science_courses_pending_while_applying: null,
        school_minimum_grade_required_for_pending_courses: null,
        school_date_pending_courses_must_be_completed: null,
        school_semester_pending_courses_must_be_completed: null,
        school_prerequisite_completion_criteria_note_section: [],
    },

    school_paid_experience_required: {
        input: false,
        school_paid_experience_required_notes: [],
    },

    school_patient_experience: {
        school_patient_experience_required: false,
        school_minimum_patient_care_experience_hours_required: null,
        school_minimum_time_frame_patient_care_experience_needs_to_be_completed: null,
        school_average_patient_care_experience_hours_accepted_previous_cycle: 0,
        school_patient_care_experience_general_notes: [],
    },

    school_healthcare_experience: {
        school_healthcare_experience_required: false,
        school_minimum_healthcare_experience_hours_required: null,
        school_minimum_time_frame_healthcare_experience_needs_to_be_completed: null,
        school_average_healthcare_experience_hours_accepted_previous_cycle: 0,
        school_healthcare_experience_general_notes: [],
    },

    school_community_service: {
        school_community_service_required: false,
        school_minimum_community_service_hours_required: null,
        school_community_service_recommended: false,
        school_minimum_community_service_hours_recommended: null,
        school_average_community_service_hours_accepted_previous_cycle: 0,
        school_community_service_general_notes: [],
    },

    school_volunteer_service: {
        school_volunteer_service_required: false,
        school_minimum_volunteer_service_hours_required: null,
        school_volunteer_service_recommended: false,
        school_minimum_volunteer_service_hours_recommended: null,
        school_average_volunteer_service_hours_accepted_previous_cycle: 0,
        school_volunteer_service_general_notes: [],
    },

    school_pa_shadowing_required: {
        input: false,
        school_minimum_pa_shadowing_hours_required: null,
        school_minimum_pa_shadowing_hours_required_notes: [],
    },

    school_pa_shadowing_recommended: {
        input: false,
        school_minimum_pa_shadowing_hours_recommended: null,
        school_minimum_pa_shadowing_hours_recommended_notes: [],
    },

    school_average_pa_shadowing_hours_accepted_previous_cycle: {
        input: 0,
        school_average_pa_shadowing_hours_accepted_previous_cycle_notes: [],
    },

    school_required_optional_exams: [],

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

    school_pacat: {
        school_pacat_required: false,
        school_pacat_recommended: false,
        school_pacat_exam_school_code: null,
        school_pacat_exam_scaled_minimum_score_required: null,
        school_pacat_exam_group_scaled_minimum_score_required: null,
        school_pacat_exam_notes: [],
    },

    school_casper: {
        school_casper_required: false,
        school_casper_recommended: false,
        school_casper_exam_notes: [],
    },

    school_english_proficiency_exams: {
        school_english_proficiency_exams_required: false,

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

    school_evaluations_required: {
        input: false,
        school_minimum_number_of_evaluations_required: null,
        school_required_evaluator_title: null,
        school_minimum_time_evaluator_knows_applicant: null,
        school_optional_evaluators_required: null,
        school_evaluations_required_notes: [],
    },

    school_evaluations_recommended: {
        input: false,
        school_minimum_number_of_evaluations_recommended: null,
        school_recommended_evaluator_title: null,
        school_minimum_time_evaluator_knows_applicant: null,
        school_optional_evaluators_recommended: null,
        school_evaluations_recommended_notes: [],
    },

    school_international_students_accepted: {
        input: false,
        school_international_students_notes: [],
    },

    school_certifications_required: {
        input: false,
        school_certifications_required_options: null,
        school_certification_notes: [],
    },

    school_application_submitted_on_caspa: {
        input: false,
        school_caspa_application_deadline_date: null,
        school_caspa_application_deadline_type: null,
        school_caspa_application_notes: [],
    },

    school_application_submitted_directly_to_school: {
        input: false,
        school_application_direct_to_school_deadline: null,
        school_application_direct_to_school_fee: null,
        school_application_direct_to_school_notes: [],
    },

    school_supplemental_application_required: {
        input: false,
        school_supplemental_application_deadline: null,
        school_supplemental_application_fee: null,
        school_supplemental_application_link: null,
        school_supplemental_application_link_provided_with_invite_only: null,
        school_supplemental_application_notes: [],
    }

}