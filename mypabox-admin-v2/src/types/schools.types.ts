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