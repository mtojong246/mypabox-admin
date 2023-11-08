export interface Note {
    type: string;
    note: string;
}

interface AdditionalField {
    input: string;
}

export interface StringInput {
    input: string;
    notes: Note[];
}

export interface StringInputWithFields {
    fields: AdditionalField[];
    notes: Note[];
}

export interface NumberInput {
    input: number;
    notes: Note[];
}

export interface BooleanInput {
    input: boolean;
    notes?: Note[];
}

export interface OtherTypesOfGpaEvaluted {
    gpa_value_required_or_recommended: string;
    minimum_gpa_value_needed: number;
    minimum_number_of_credits_evaluated: number;
    type_of_gpa_evaluated: string;
    notes: Note[];
}

export interface MinimumGpaSpecificCourse {
    minimum_gpa_required_for_course: number,
    courseID: string,
    notes: Note[],
}

export interface PreviousCycle {
    average_overall_gpa_accepted_previous_year: NumberInput;
    average_bcp_gpa_accepted_previous_year: NumberInput;
    average_science_gpa_accepted_previous_year: NumberInput;
    average_prerequisite_gpa_accepted_previous_year: NumberInput;
}

export interface SchoolPrereqRequiredCourse {
    school_required_course_id: string;
    school_required_course_lab: boolean;
    school_required_course_lab_preferred: boolean;
    school_required_course_credit_hours: number;
    school_required_course_quarter_hours: number;
    school_required_course_note_section: string;
}

export interface SchoolRequiredOptionalCourse {
    school_optional_course_id: string;
    school_optional_course_lab: boolean;
    school_optional_course_lab_preferred: boolean;
    school_optional_course_credit_hours: number;
    school_optional_course_quarter_hours: number;
    school_optional_course_note_section: string;
}

export interface SchoolPrereqRequiredOptionalCourse {
    school_minimum_number_of_courses_to_be_completed: number;
    school_required_optional_courses_list: SchoolRequiredOptionalCourse[];
    school_optional_course_note_section: Note[];
}

export interface SchoolPrereqRequiredCourseCategory {
    school_required_course_category: string;
    school_required_course_category_number_of_credits_need_to_be_completed: number;
    school_required_course_category_number_of_quarter_hours_need_to_be_completed: number;
    school_required_course_category_number_of_courses_that_need_lab: number;
    school_required_course_category_extra_included_courses: {
        school_required_course_id: string;
        school_required_course_note: string;
    }[],
    school_required_course_category_excluded_courses: {
        school_required_course_id: string;
        school_required_course_note: string;
    }[],
    school_required_course_category_note_section: Note[];
}

export interface SchoolPrereqRecommendedCourse {
    school_recommended_course_id: string;
    school_recommended_course_lab: boolean;
    school_recommended_course_lab_preferred: boolean;
    school_recommended_course_credit_hours: number;
    school_recommended_course_quarter_hours: number;
    school_recommended_course_note_section: string;
}

export interface NoNoteString {
    input: string;
};

export interface School {
    id: number;
    school_name: NoNoteString;
    school_logo: NoNoteString;
    school_street: NoNoteString;
    school_city: NoNoteString;
    school_state: NoNoteString;
    school_zip_code: NoNoteString;
    school_country: NoNoteString;
    school_website: NoNoteString;
    school_email: {
        input: {
            category: string;
            email: string;
        }[],
        notes: Note[];
    }
    school_phone_number: {
        input: {
            category: string;
            number: string;
        }[];
        notes: Note[];
    }

    school_campus_location: StringInput;
    school_start_month: StringInput;
    school_class_capacity: NumberInput;
    school_duration_full_time: NumberInput;
    school_duration_part_time: NumberInput;

    school_seat_deposit_in_state: NumberInput;
    school_seat_deposit_out_of_state: NumberInput;

    school_rolling_admissions: BooleanInput;
    school_nonrolling_admissions: BooleanInput;
    school_pre_pa_curriculum: BooleanInput;
    school_direct_high_school_entry: BooleanInput;
    school_part_time_option: BooleanInput;
    school_online_learning: BooleanInput;
    school_on_campus_housing: BooleanInput;
    school_cadaver_lab: BooleanInput;
    school_faith_based_learning: BooleanInput;
    school_military_personnel_preference: BooleanInput;

    school_general_information: string;

    school_dual_degree_program: BooleanInput;
    school_type_of_degree_offered: StringInputWithFields;
    school_bachelors_degree_required: BooleanInput;

    school_accreditation_status: StringInput;

    school_mission_statement: string;

    school_in_state_tuition: NumberInput;
    school_out_of_state_tuition: NumberInput;

    school_first_time_pass_rate: NumberInput;
    school_average_five_year_first_time_pass_rate: NumberInput;
    school_pance_pass_rate_note: string;

    school_minimum_gpa_required: boolean;
    school_minimum_overall_gpa_required: NumberInput;
    school_minimum_science_gpa_required: NumberInput;
    school_minimum_prerequisite_gpa_required: NumberInput;

    school_minimum_gpa_recommended: boolean;
    school_minimum_overall_gpa_recommended: NumberInput;
    school_minimum_science_gpa_recommended: NumberInput;
    school_minimum_prerequisite_gpa_recommended: NumberInput;

    school_other_types_of_gpa_evaluated: OtherTypesOfGpaEvaluted[];
    school_minimum_gpa_for_specific_course: MinimumGpaSpecificCourse[];

    school_average_gpa_accepted_previous_cycle: {
        average_overall_gpa_accepted_previous_year: NumberInput;
        average_bcp_gpa_accepted_previous_year: NumberInput;
        average_science_gpa_accepted_previous_year: NumberInput;
        average_prerequisite_gpa_accepted_previous_year: NumberInput;
    }

    school_gpa_general_note: string;

    school_prereq_required_courses: SchoolPrereqRequiredCourse[];
    school_prereq_required_optional_courses: SchoolPrereqRequiredOptionalCourse[];
    school_prereq_required_course_categories: SchoolPrereqRequiredCourseCategory[];
    school_prereq_recommended_courses: SchoolPrereqRecommendedCourse[];

    school_grade_criteria: {
        school_minimum_grade_required_for_all_courses: string;
        school_grade_criteria_note_section: Note[]
    }

    school_time_frame_criteria: {
        school_time_frame_all_courses_must_be_completed: StringInput;
        school_time_frame_science_courses_must_be_completed: StringInput;
        school_time_frame_math_courses_must_be_completed: StringInput;
        school_time_frame_criteria_note_section: Note[];
    }

    school_pass_fail_criteria: {
        school_pass_fail_grade_accepted: boolean;
        school_pass_fail_grade_criteria_note_section: Note[];
    }

    school_ap_criteria: {
        school_ap_courses_accepted: boolean;
        school_ap_courses_criteria_note_section: Note[];
    }

    school_community_college_criteria: {
        school_community_college_credits_accepted: boolean;
        school_community_college_criteria_note_section: Note[];
    }

    school_clep_criteria: {
        school_clep_credits_accepted: boolean;
        school_clep_credits_criteria_note_section: Note[];
    }

    school_online_courses_criteria: {
        school_online_courses_accepted: boolean;
        school_online_courses_criteria_note_section: Note[];
    }

    school_prerequisite_completion_criteria: {
        school_all_courses_most_be_completed_before_applying: boolean;
        school_courses_can_be_in_progress_while_applying: boolean;
        school_maximum_number_of_courses_pending_while_applying?: NumberInput;
        school_maximum_number_of_credits_pending_while_applying?: NumberInput;
        school_maximum_number_of_science_courses_pending_while_applying?: NumberInput;
        school_maximum_number_of_non_science_courses_pending_while_applying?: NumberInput;
        school_minimum_grade_required_for_pending_courses?: StringInput;
        school_date_pending_courses_must_be_completed?: StringInput;
        school_semester_pending_courses_must_be_completed?: StringInput;
        school_prerequisite_completion_criteria_note_section: Note[];
    }

    school_paid_experience_required: {
        input: boolean;
        school_paid_experience_required_notes: Note[]
    }

    school_patient_experience: {
        school_patient_experience_required: boolean;
        school_minimum_patient_care_experience_hours_required: {
            input: number;
            school_minimum_patient_care_experience_hours_required_notes: Note[];
        } | null;
        school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
            input: string;
            school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes: Note[];
        } | null;
        school_average_patient_care_experience_hours_accepted_previous_cycle: number;
        school_patient_care_experience_general_notes: Note[]
    }

    school_healthcare_experience: {
        school_healthcare_experience_required: boolean;
        school_minimum_healthcare_experience_hours_required: {
            input: number;
            school_minimum_healthcare_experience_hours_required_notes: Note[]
        } | null;
        school_minimum_time_frame_healthcare_experience_needs_to_be_completed: {
            input: string;
            school_minimum_time_frame_healthcare_experience_needs_to_be_completed_notes: Note[]
        } | null;
        school_average_healthcare_experience_hours_accepted_previous_cycle: number;
        school_healthcare_experience_general_notes: Note[]
    }

    school_community_service: {
        school_community_service_required: boolean;
        school_minimum_community_service_hours_required: {
            input: number;
            school_minimum_community_service_hours_required_notes: Note[]
        } | null;
        school_community_service_recommended: boolean;
        school_minimum_community_service_hours_recommended: {
            input: number;
            school_minimum_community_service_hours_recommended_notes: Note[]
        } | null;
        school_average_community_service_hours_accepted_previous_cycle: number;
        school_community_service_general_notes: Note[];
    }

    school_volunteer_service: {
        school_volunteer_service_required: boolean;
        school_minimum_volunteer_service_hours_required: {
            input: number;
            school_minimum_volunteer_service_hours_required_notes: Note[]
        } | null;
        school_volunteer_service_recommended: boolean;
        school_minimum_volunteer_service_hours_recommended: {
            input: number;
            school_minimum_volunteer_service_hours_recommended_notes: Note[]
        } | null;
        school_average_volunteer_service_hours_accepted_previous_cycle: number;
        school_volunteer_service_general_notes: Note[];
    }

    school_pa_shadowing_required: {
        input: boolean;
        school_minimum_pa_shadowing_hours_required: number | null;
        school_minimum_pa_shadowing_hours_required_notes: Note[];
    }

    school_pa_shadowing_recommended: {
        input: boolean;
        school_minimum_pa_shadowing_hours_recommended: number | null;
        school_minimum_pa_shadowing_hours_recommended_notes: Note[];
    }

    school_average_pa_shadowing_hours_accepted_previous_cycle: {
        input: number;
        school_average_pa_shadowing_hours_accepted_previous_cycle_notes: Note[]
    }

    school_required_optional_exams: {
        school_minimum_number_of_exams_to_be_completed: number;
        school_required_optional_exams_list: string[];
        school_optional_exams_notes: Note[];
    }[];

    school_gre: {
        school_gre_required: boolean;
        school_gre_recommended: boolean;
        school_caspa_gre_institution_code: number | null;
        school_gre_institution_code: number | null;

        school_minimum_time_frame_gre_must_be_completed: {
            input: string;
            school_minimum_time_frame_gre_must_be_completed_notes: Note[];
        } | null;

        school_mcat_accepted_in_place_of_gre: {
            input: boolean;
            school_mcat_accepted_in_place_of_gre_notes: Note[];
        } | null;

        school_gre_exempt_with_masters_degree: {
            input: boolean;
            school_gre_exempt_with_masters_degree_notes: Note[];
        } | null;

        school_gre_exempt_with_phd_degree: {
            input: boolean; 
            school_gre_exempt_with_phd_degree_notes: Note[];
        } | null;

        school_minimum_gre_scores_required: boolean | null;
        school_gre_minimum_verbal_score: number | null;
        school_gre_minimum_quantitative_score: number | null;
        school_gre_minimum_analytical_writing_score: number | null;
        school_gre_minimum_combined_score: number | null;
        school_minimum_gre_score_notes: Note[] | null;

        school_gre_minimum_verbal_percentile: number | null;
        school_gre_minimum_quantitative_percentile: number | null;
        school_gre_minimum_analytical_writing_percentile: number | null;
        school_gre_minimum_combined_percentile: number | null;
        school_minimum_gre_percentile_notes: Note[] | null;

        school_average_gre_verbal_score_accepted_previous_year: number;
        school_average_gre_quantitative_score_accepted_previous_year: number;
        school_average_gre_analytical_writing_score_accepted_previous_year: number;
        school_average_gre_combined_score_accepted_previous_year: number;

        school_average_gre_verbal_percentile_accepted_previous_year: number;
        school_average_gre_quantitative_percentile_accepted_previous_year: number;
        school_average_gre_analytical_writing_percentile_accepted_previous_year: number;
        school_average_gre_combined_percentile_accepted_previous_year: number;

        school_gre_general_notes: Note[];

    }

    school_pacat: {
        school_pacat_required: boolean;
        school_pacat_recommended: boolean;
        school_pacat_exam_school_code: number | null;
        school_pacat_exam_scaled_minimum_score_required: number | null;
        school_pacat_exam_group_scaled_minimum_score_required: number | null;
        school_pacat_exam_notes: Note[]
    }

    school_casper: {
        school_casper_required: boolean;
        school_casper_recommended: boolean;
        school_casper_exam_notes: Note[]
    }

    school_english_proficiency_exams: {
        school_english_proficiency_exams_required: boolean;

        school_toefl_required: boolean | null;
        school_minimum_time_frame_toefl_needs_to_be_completed: string | null;
        school_toefl_exempt_with_masters_degree: boolean | null;
        school_toefl_exempt_with_doctoral_degree: boolean | null;

        school_toefl_ibt_minimum_total_score_required: number | null;
        school_toefl_ibt_minimum_reading_score_required: number | null;
        school_toefl_ibt_minimum_writing_score_required: number | null;
        school_toefl_ibt_minimum_listening_score_required: number | null;
        school_toefl_ibt_minimum_speaking_score_required: number | null;
        school_toefl_ibt_minimum_score_notes: Note[] | null;

        school_toefl_pbt_minimum_total_score_required: number | null;
        school_toefl_pbt_minimum_reading_score_required: number | null;
        school_toefl_pbt_minimum_writing_score_required: number | null;
        school_toefl_pbt_minimum_listening_score_required: number | null;
        school_toefl_pbt_minimum_speaking_score_required: number | null;
        school_toefl_pbt_minimum_score_notes: Note[] | null;

        school_ielt_required: boolean | null;
        school_ielt_minimum_total_score_required: number | null;
        school_ielt_minimum_score_notes: Note[] | null;

        school_melab_required: boolean | null;
        school_melab_minimum_total_score_required: number | null;
        school_melab_minimum_score_notes: Note[] | null;

        school_pte_academic_required: boolean | null;
        school_pte_academic_minimum_total_score_required: number | null;
        school_pte_academic_minimum_score_notes: Note[]

        school_itep_academic_plus_required: boolean | null;
        school_itep_academic_plus_minimum_total_score_required: number | null;
        school_itep_academic_plus_minimum_score_notes: Note[]


    }

    school_evaluations_required: {
        input: boolean;
        school_minimum_number_of_evaluations_required: number | null;
        school_required_evaluator_title: string[] | null;
        school_minimum_time_evaluator_knows_applicant: string | null;
        school_optional_evaluators_required: {
            school_minimum_number_of_evaluators_required_in_group: number;
            school_required_optional_group_evaluator_title: string[];
            school_minimum_time_evaluator_knows_applicant: string;
        }[] | null;
        school_evaluations_required_notes: Note[];
    }

    school_evaluations_recommended: {
        input: boolean;
        school_minimum_number_of_evaluations_recommended: number | null;
        school_recommended_evaluator_title: string[] | null;
        school_minimum_time_evaluator_knows_applicant: string | null;
        school_optional_evaluators_recommended: {
            school_minimum_number_evaluators_recommended_in_group: number;
            school_recommended_optional_group_evaluator_title: string[];
            school_minimum_time_evaluator_knows_applicant: string;
        }[] | null;
        school_evaluations_recommended_notes: Note[];
    }

    school_international_students_accepted: {
        input: boolean;
        school_international_students_notes: Note[];
    }

    school_certifications_required: {
        input: boolean;
        school_certifications_required_options: string[] | null;
        school_certification_notes: Note[];
    }

    school_application_submitted_on_caspa: {
        input: boolean;
        school_caspa_application_deadline_date: string | null;
        school_caspa_application_deadline_type: string | null;
        school_caspa_application_notes: Note[];
    }

    school_application_submitted_directly_to_school: {
        input: boolean;
        school_application_direct_to_school_deadline: string | null;
        school_application_direct_to_school_fee: number | null;
        school_application_direct_to_school_notes: Note[];
    }

    school_supplemental_application_required: {
        input: boolean;
        school_supplemental_application_deadline: string | null;
        school_supplemental_application_fee: number | null;
        school_supplemental_application_link: string | null;
        school_supplemental_application_link_provided_with_invite_only: boolean | null;
        school_supplemental_application_notes: Note[];
    }

    


}

export interface SchoolState {
    schools: School[];
}

export interface DataPoints {
    name: string;
    value: string;
    margin: string;
    type: string;
}