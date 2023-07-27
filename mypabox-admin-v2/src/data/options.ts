export interface Option {
    label: string;
    value: string;
    target: {
        name: string;
        type: string;
        value: string;
    }
}

export const options: Option[] = [
    { label: 'Provisional', value: 'Provisional', target: {name: "school_accreditation_status", type: 'text', value: 'Provisional' }},
    { label: 'Continued', value: 'Continued', target: {name: "school_accreditation_status", type: 'text', value: 'Continued' }},
    { label: 'Clinical Postgraduate Program', value: 'Clinical Postgraduate Program', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Clinical Postgraduate Program' }},
    { label: 'Probation', value: 'Probation', target: {name: "school_accreditation_status", type: 'text', value: 'Probation' }},
    { label: 'Administrative Probation', value: 'Administrative Probation', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Administrative Probation' }},
    { label: 'Accreditation Withheld', value: 'Accreditation Withheld', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Accreditation Withheld' }},
    { label: 'Accreditation Withdrawn', value: 'Accreditation Withdrawn', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Accreditation Withdrawn' }},
    { label: 'Voluntary Inactive Status', value: 'Voluntary Inactive Status', target: {name: "school_accreditation_status", type: 'text', 
    value: 'Voluntary Inactive Status' }},
  ]