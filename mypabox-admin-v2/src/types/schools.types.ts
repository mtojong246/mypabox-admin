export interface Note {
    type: string;
    note: string;
}

interface AdditionalField {
    input: string;
}

export interface StringInput {
    input: string;
    notes?: Note[];
}

export interface StringInputWithFields {
    fields: AdditionalField[];
    notes?: Note[];
}

export interface NumberInput {
    input: number;
    notes?: Note[];
}

export interface BooleanInput {
    input: boolean;
    notes?: Note[];
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