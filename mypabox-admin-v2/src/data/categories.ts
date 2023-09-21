import { options, Option } from "./options";



interface Field {
    name: string;
    value: string;
    margin: string;
    type: string;
    options?: Option[]
}


export interface CategoryType {
    hash: string;
    name: string;
    fields: Field[] | [];
}

export const categories: CategoryType[] = [
    {
        hash: '#general-info',
        name: 'General Info',
        fields: [
            {
                name: 'School Name',
                value: 'school_name',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'School Logo',
                value: 'school_logo',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'Street Address',
                value: 'school_street',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'City',
                value: 'school_city',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'State',
                value: 'school_state',
                margin: 'mt-10',
                type: 'select',
            },
            {
                name: 'Zip',
                value: 'school_zip_code',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'Country',
                value: 'school_country',
                margin: 'mt-10',
                type: 'select',
            },
            {
                name: 'Website',
                value: 'school_website',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'School Email',
                value: 'school_email',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'School Phone Number',
                value: 'school_phone_number',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'Campus Location',
                value: 'school_campus_location',
                margin: 'mt-28',
                type: 'text',
            },
            {
                name: 'Start Month',
                value: 'school_start_month',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'Class Capacity',
                value: 'school_class_capacity',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'Duration (Full-time)',
                value: 'school_duration_full_time',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'Duration (Part-time)',
                value: 'school_duration_part_time',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'Seat Deposit (In-state)',
                value: 'school_seat_deposit_in_state',
                margin: 'mt-28',
                type: 'text',
            },
            {
                name: 'Seat Deposit (Out-of-state)',
                value: 'school_seat_deposit_out_of_state',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'Rolling Admissions',
                value: 'school_rolling_admissions',
                margin: 'mt-28',
                type: 'bool',
            },
            {
                name: 'Non-rolling Admissions',
                value: 'school_nonrolling_admissions',
                margin: 'mt-10',
                type: 'bool',
            },
            {
                name: 'Pre-PA Curriculum',
                value: 'school_pre_pa_curriculum',
                margin: 'mt-10',
                type: 'bool',
            },
            {
                name: 'Direct High School Entry',
                value: 'school_direct_high_school_entry',
                margin: 'mt-10',
                type: 'bool',
            },
            {
                name: 'Part-time Option',
                value: 'school_part_time_option',
                margin: 'mt-10',
                type: 'bool',
            },
            {
                name: 'Online Learning',
                value: 'school_online_learning',
                margin: 'mt-10',
                type: 'bool',
            },
            {
                name: 'On-campus Housing',
                value: 'school_on_campus_housing',
                margin: 'mt-10',
                type: 'bool',
            },
            {
                name: 'Cadaver Lab',
                value: 'school_cadaver_lab',
                margin: 'mt-10',
                type: 'bool',
            },
            {
                name: 'Faith-based Learning',
                value: 'school_faith_based_learning',
                margin: 'mt-10',
                type: 'bool',
            },
            {
                name: 'Military Personnel Preference',
                value: 'school_military_personnel_preference',
                margin: 'mt-10',
                type: 'bool',
            },
            {
                name: 'General Information Notes',
                value: 'school_general_information',
                margin: 'mt-28',
                type: 'editor',
            }
        ]
    },
    {
        hash: '#degree-info',
        name: 'Degree Info',
        fields: [
            {
                name: 'Types of Degrees Offered',
                value: 'school_type_of_degree_offered',
                margin: 'mt-10',
                type: 'fields',
            },
            {
                name: 'Dual-Degree Program',
                value: 'school_dual_degree_program',
                margin: 'mt-10',
                type: 'bool',
            },
            {
                name: 'Bachelors Degree Required',
                value: 'school_bachelors_degree_required',
                margin: 'mt-10',
                type: 'bool',
            }
        ]
    },
    {
        hash: '#accreditation-status',
        name: 'Accreditation Status',
        fields: [
            {
                name: 'Accreditation Status',
                value: 'school_accreditation_status',
                margin: 'mt-10',
                type: 'select',
                options: options,
            },
            {
                name: 'Accreditation Status General Notes',
                value: 'school_accreditation_status_general_note',
                margin: 'mt-28',
                type: 'editor',
            }
        ]
    },
    {
        hash: '#mission-statement',
        name: 'Mission Statement',
        fields: [
            {
                name: 'Mission Statement',
                value: 'school_mission_statement',
                margin: 'mt-10',
                type: 'editor',
            }
        ]
    },
    {
        hash: '#tuition',
        name: 'Tuition',
        fields: [
            {
                name: 'In-State Tuition',
                value: 'school_in_state_tuition',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'Out-Of-State Tuition',
                value: 'school_out_of_state_tuition',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'Tuition General Notes',
                value: 'school_tuition_general_note',
                margin: 'mt-28',
                type: 'editor',
            }
        ]
    },
    {
        hash: '#pance-pass-rate',
        name: 'PANCE Pass Rate',
        fields: [
            {
                name: 'First Time Pass Rate',
                value: 'school_first_time_pass_rate',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'Average Five Year First Time Pass Rate',
                value: 'school_average_five_year_first_time_pass_rate',
                margin: 'mt-10',
                type: 'text',
            },
            {
                name: 'PANCE Pass Rate Notes',
                value: 'school_pance_pass_rate_note',
                margin: 'mt-28',
                type: 'editor',
            }
        ]
    },
    {
        hash: '#GPA',
        name: 'GPA',
        fields: [],
    },
    {
        hash: '#prerequisites',
        name: 'Prerequisites',
        fields: [],
    },
    {
        hash: '#experience',
        name: 'Experience',
        fields: [],
    },
    {
        hash: '#shadowing',
        name: 'Shadowing',
        fields: [],
    },
    {
        hash: '#GRE',
        name: 'GRE',
        fields: [],
    },
    {
        hash: '#letters-of-recommendation',
        name: 'Letters of Recommendation',
        fields: [],
    },
    {
        hash: '#certifications',
        name: 'Certifications',
        fields: [],
    },
    {
        hash: '#additional-notes',
        name: 'Additional Notes',
        fields: [],
    },
];