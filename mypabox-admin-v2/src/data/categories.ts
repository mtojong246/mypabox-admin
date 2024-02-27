import { options, Option } from "./options";



interface Field {
    name?: string;
    value: string;
    margin?: string;
    type?: string;
    options?: Option[]
}


export interface CategoryType {
    hash: string;
    name: string;
    isEdited: boolean;
    fields: Field[] | [];
}

export const categories: CategoryType[] = [
    {
        hash: '#general-info',
        name: 'General Info',
        isEdited: false,
        fields: [
            {
                name: 'School Name',
                value: 'school_name',
                margin: 'mt-12',
                type: 'text',
            },
            {
                name: 'School Logo',
                value: 'school_logo',
                margin: 'mt-12',
                type: 'text',
            },
            {
                name: 'Street Address',
                value: 'school_street',
                margin: 'mt-12',
                type: 'text',
            },
            {
                name: 'City',
                value: 'school_city',
                margin: 'mt-12',
                type: 'text',
            },
            {
                name: 'State',
                value: 'school_state',
                margin: 'mt-12',
                type: 'select',
            },
            {
                name: 'Zip',
                value: 'school_zip_code',
                margin: 'mt-12',
                type: 'text',
            },
            {
                name: 'Country',
                value: 'school_country',
                margin: 'mt-12',
                type: 'select',
            },
            {
                name: 'Website',
                value: 'school_website',
                margin: 'mt-12',
                type: 'text',
            },
            {
                name: 'School Email',
                value: 'school_email',
                margin: 'mt-12',
                type: 'text',
            },
            {
                name: 'School Phone Number',
                value: 'school_phone_number',
                margin: 'mt-12',
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
                margin: 'mt-12',
                type: 'text',
            },
            {
                name: 'Class Capacity',
                value: 'school_class_capacity',
                margin: 'mt-12',
                type: 'text',
            },
            {
                name: 'Duration (Full-time)',
                value: 'school_duration_full_time',
                margin: 'mt-12',
                type: 'text',
            },
            {
                name: 'Duration (Part-time)',
                value: 'school_duration_part_time',
                margin: 'mt-12',
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
                margin: 'mt-12',
                type: 'bool',
            },
            {
                name: 'Pre-PA Curriculum',
                value: 'school_pre_pa_curriculum',
                margin: 'mt-12',
                type: 'bool',
            },
            {
                name: 'Direct High School Entry',
                value: 'school_direct_high_school_entry',
                margin: 'mt-12',
                type: 'bool',
            },
            {
                name: 'Part-time Option',
                value: 'school_part_time_option',
                margin: 'mt-12',
                type: 'bool',
            },
            {
                name: 'Online Learning',
                value: 'school_online_learning',
                margin: 'mt-12',
                type: 'bool',
            },
            {
                name: 'On-campus Housing',
                value: 'school_on_campus_housing',
                margin: 'mt-12',
                type: 'bool',
            },
            {
                name: 'Cadaver Lab',
                value: 'school_cadaver_lab',
                margin: 'mt-12',
                type: 'bool',
            },
            {
                name: 'Faith-based Learning',
                value: 'school_faith_based_learning',
                margin: 'mt-12',
                type: 'bool',
            },
            {
                name: 'Military Personnel Preference',
                value: 'school_military_personnel_preference',
                margin: 'mt-12',
                type: 'bool',
            },
            {
                name: 'Holistic Review',
                value: 'school_holistic_review',
                margin: 'mt-12',
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
        isEdited: false,
        fields: [
            {
                name: 'Types of Degrees Offered',
                value: 'school_type_of_degree_offered',
                margin: 'mt-12',
                type: 'fields',
            },
            {
                name: 'Dual-Degree Program',
                value: 'school_dual_degree_program',
                margin: 'mt-12',
                type: 'bool',
            },
            {
                name: 'Bachelors Degree Required',
                value: 'school_bachelors_degree_required',
                margin: 'mt-12',
                type: 'bool',
            }
        ]
    },
    {
        hash: '#applications',
        name: 'Applications',
        isEdited: false,
        fields: [
            {
                value: 'school_application_submitted_on_caspa'
            },
            {
                value: 'school_application_submitted_directly_to_school'
            },
            {
                value: 'school_supplemental_application_required'
            },
        ],
    },
    {
        hash: '#accreditation-status',
        name: 'Accreditation Status',
        isEdited: false,
        fields: [
            {
                name: 'Accreditation Status',
                value: 'school_accreditation_status',
                margin: 'mt-12',
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
        isEdited: false,
        fields: [
            {
                name: 'Mission Statement',
                value: 'school_mission_statement',
                margin: 'mt-12',
                type: 'editor',
            }
        ]
    },
    {
        hash: '#tuition',
        name: 'Tuition',
        isEdited: false,
        fields: [
            {
                name: 'In-State Tuition',
                value: 'school_in_state_tuition',
                margin: 'mt-12',
                type: 'text',
            },
            {
                name: 'Out-Of-State Tuition',
                value: 'school_out_of_state_tuition',
                margin: 'mt-12',
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
                margin: 'mt-12',
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
        isEdited: false,
        fields: [
            {
                name: 'First Time Pass Rate',
                value: 'school_first_time_pass_rate',
                margin: 'mt-12',
                type: 'text',
            },
            {
                name: 'Average Five Year First Time Pass Rate',
                value: 'school_average_five_year_first_time_pass_rate',
                margin: 'mt-12',
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
        isEdited: false,
        fields: [
            {
                value: 'school_minimum_gpa_required'
            },
            {
                value: 'school_minimum_gpa_recommended'
            },
            {
                value: 'school_other_types_of_gpa_evaluated'
            },
            {
                value: 'school_minimum_gpa_for_specific_course'
            },
            {
                value: 'school_average_gpa_accepted_previous_cycle'
            },
            
        ],
    },
    {
        hash: '#prerequisites',
        name: 'Prerequisites',
        isEdited: false,
        fields: [
            {
                value: 'school_prereq_required_courses'
            },
            {
                value: 'school_prereq_required_optional_courses'
            },
            {
                value: 'school_prereq_required_course_categories'
            },
            {
                value: 'school_prereq_recommended_courses'
            },
            {
                value: 'school_grade_criteria'
            },
            {
                value: 'school_time_frame_criteria'
            },
            {
                value: 'school_pass_fail_criteria'
            },
            {
                value: 'school_ap_criteria'
            },
            {
                value: 'school_community_college_criteria'
            },
            {
                value: 'school_clep_criteria'
            },
            {
                value: 'school_online_courses_criteria'
            },
            {
                value: 'school_prerequisite_completion_criteria'
            },
            
        ],
    },
    {
        hash: '#experience',
        name: 'Experience',
        isEdited: false,
        fields: [
            {
                value: 'school_paid_experience_required'
            },
            {
                value: 'school_patient_experience'
            },
            {
                value: 'school_healthcare_experience'
            },
            {
                value: 'school_community_service'
            },
            {
                value: 'school_volunteer_service'
            },
            
        ],
    },
    {
        hash: '#pa-shadowing',
        name: 'PA Shadowing',
        isEdited: false,
        fields: [
            {
                value: 'school_pa_shadowing_required'
            },
            {
                value: 'school_pa_shadowing_recommended'
            },
            {
                value: 'school_average_pa_shadowing_hours_accepted_previous_cycle'
            },
            
        ],
    },
    {
        hash: '#exams',
        name: 'Exams',
        isEdited: false,
        fields: [
            {
                value: 'school_required_optional_exams'
            },
            {
                value: 'school_gre'
            },
            {
                value: 'school_pacat'
            },
            {
                value: 'school_casper'
            },
            {
                value: 'school_english_proficiency_exams'
            }
        ],
    },
    {
        hash: '#evaluations',
        name: 'Evaluations',
        isEdited: false,
        fields: [
            {
                value: 'school_evaluations_required'
            },
            {
                value: 'school_evaluations_recommended'
            },
            
        ],
    },
    {
        hash: '#international-students',
        name: 'International Students',
        isEdited: false,
        fields: [
            {
                value: 'school_international_students_accepted'
            }
        ],
    },
    {
        hash: '#certifications',
        name: 'Certifications',
        isEdited: false,
        fields: [
            {
                value: 'school_certifications_required'
            },
            
        ],
    },
    
];