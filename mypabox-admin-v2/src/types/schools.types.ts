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

export interface School {
    id: number;
    school_name: StringInput;
    school_logo: StringInput;
    school_street: StringInput;
    school_city: StringInput;
    school_state: StringInput;
    school_zip_code: StringInput;
    school_country: StringInput;
    school_website: StringInput;
    school_email: StringInput;
    school_phone_number: StringInput;

    school_campus_location: StringInput;
    school_start_month: StringInput;
    school_class_capacity: NumberInput;
    school_duration_full_time: StringInput;
    school_duration_part_time: StringInput;

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
    school_acceditation_status_general_note: string;

    school_mission_statement: string;

    school_in_state_tuition: NumberInput;
    school_out_of_state_tuition: NumberInput;
    school_tuition_general_note: string;

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