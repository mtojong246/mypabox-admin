export interface Change {
    editedBy: string;
    timestamp: string;
}

export interface NewNote {
    type: string;
    note: string;
}

export interface NoteInput {
    original: NewNote[];
    draft: NewNote[];
    changes: (ModifiedNoteChange | AddedOrRemovedNoteChange)[];
}

export interface ModifiedNoteChange extends Change {
    type: 'modified';
    field: 'type' | 'note';
    original: string;
    modified: string;
}

export interface AddedOrRemovedNoteChange extends Change {
    type: 'added' | 'removed';
    field: 'notes';
    value: NewNote;
}

export interface BasicStringInput {
    original: string;
    draft: string;
    changes: ModifiedStringChange[];
}

export interface ModifiedStringChange extends Change {
    type: 'modified';
    field: string;
    original: string;
    modified: string;
}

export interface BasicNumberInput {
    original: number;
    draft: number;
    changes: ModifiedNumberChange[];
}

export interface ModifiedNumberChange extends Change {
    type: 'modified';
    field: string;
    original: number;
    modified: number;
}

export interface BasicBooleanInput {
    original: boolean;
    draft: boolean;
    changes: ModifiedBooleanChange[];
}

export interface ModifiedBooleanChange extends Change {
    type: 'modified';
    field: string;
    original: boolean;
    modified: boolean;
}



export interface NewSchool {
    id: string;
    isLive: boolean;
    school_name: {
        input: BasicStringInput;
        link: string;
    }
    school_logo: {
        input: BasicStringInput;
        link: string;
    }
    school_street: {
        input: BasicStringInput;
        link: string;
    }
    school_city: {
        input: BasicStringInput;
        link: string;
    }
    school_state: {
        input: BasicStringInput;
        link: string;
    }
    school_zip_code: {
        input: BasicStringInput;
        link: string;
    }
    school_country: {
        input: BasicStringInput;
        link: string;
    }
    school_website: {
        input: BasicStringInput;
        link: string;
    }
    school_email: {
        input: {
            original: {
                category: string;
                email: string;
            }[];
            draft: {
                category: string;
                email: string;
            }[];
            changes: (
                {
                    type: 'modified';
                    field: 'category' | 'email';
                    original: string;
                    modified: string;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'added' | 'removed';
                    field: string;
                    value: { category: string, email: string };
                    editedBy: string;
                    timestamp: string;
                }
            )[];
        }[],
        notes: NoteInput;
        link: string;
    };
    school_phone_number: {
        input: {
            original: {
                category: string;
                number: string;
            }[];
            draft: {
                category: string;
                number: string;
            }[];
            changes: (
                {
                    type: 'modified';
                    field: 'category' | 'number';
                    original: string;
                    modified: string;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'added' | 'removed';
                    field: string;
                    value: { category: string, number: string };
                    editedBy: string;
                    timestamp: string;
                }
            )[];
        },
        notes: NoteInput;
        link: string;
    };
    school_campus_location: {
        input: BasicStringInput;
        notes: NoteInput;
        link: string;
    };
    school_start_month: {
        input: BasicStringInput;
        notes: NoteInput;
        link: string;
    };
    school_class_capacity: {
        input: BasicNumberInput;
        notes: NoteInput;
        link: string;
    };
    school_duration_full_time: {
        input: BasicNumberInput;
        notes: NoteInput;
        link: string;
    };
    school_duration_part_time: {
        input: BasicNumberInput;
        notes: NoteInput;
        link: string;
    };
    school_seat_deposit_in_state: {
        input: BasicStringInput;
        notes: NoteInput;
        link: string;
    };
    school_seat_deposit_out_of_state: {
        input: BasicStringInput;
        notes: NoteInput;
        link: string;
    };
    school_rolling_admissions: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };
    school_nonrolling_admissions: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };
    school_pre_pa_curriculum: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };
    school_direct_high_school_entry: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };
    school_part_time_option: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };
    school_online_learning: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };
    school_on_campus_housing: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };
    school_cadaver_lab: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };
    school_faith_based_learning: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };
    school_military_personnel_preference: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };
    school_holistic_review: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };
    school_general_information: {
        input: BasicStringInput;
        link: string;
    };
    school_exams_general_note: {
        input: BasicStringInput;
        link: string;
    };
    school_dual_degree_program: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };

    school_type_of_degree_offered: {
        input: {
            original: string[];
            draft: string[];
            changes: (
                {
                    type: 'modified';
                    field: string;
                    original: string;
                    modified: string;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'added' | 'removed';
                    field: string;
                    value: string;
                    editedBy: string;
                    timestamp: string;
                }
            )[];
        };
        notes: NoteInput;
        link: string;
    };
    school_bachelors_degree_required: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    };

    school_accreditation_status: {
        input: BasicStringInput;
        notes: NoteInput;
        link: string;
    };
    school_mission_statement: {
        input: BasicStringInput;
        link: string;
    };

    school_in_state_tuition: {
        input: BasicStringInput;
        notes: NoteInput;
        link: string;
    };
    school_out_of_state_tuition: {
        input: BasicStringInput;
        notes: NoteInput;
        link: string;
    };
    school_first_time_pass_rate: {
        input: BasicStringInput;
        notes: NoteInput;
        link: string;
    };
    school_average_five_year_first_time_pass_rate: {
        input: BasicStringInput;
        notes: NoteInput;
        link: string;
    };
    school_pance_pass_rate_note: {
        input: BasicStringInput;
        link: string;
    };

    school_minimum_gpa_required: {
        original: boolean;
        draft: boolean;
        changes: ModifiedBooleanChange[];
        school_minimum_overall_gpa_required: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_minimum_science_gpa_required: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_minimum_prerequisite_gpa_required: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        link: string;
    };
    school_minimum_gpa_recommended: {
        original: boolean;
        draft: boolean;
        changes: ModifiedBooleanChange[];
        school_minimum_overall_gpa_recommended: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_minimum_science_gpa_recommended: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_minimum_prerequisite_gpa_recommended: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        link: string;
    };

    school_other_types_of_gpa_evaluated: {
        input: {
            original: {
                gpa_value_required_or_recommended: string;
                minimum_gpa_value_needed: number;
                minimum_number_of_credits_evaluated: number;
                type_of_gpa_evaluated: number;
                notes: NewNote[];
            }[];
            draft: {
                gpa_value_required_or_recommended: string;
                minimum_gpa_value_needed: number;
                minimum_number_of_credits_evaluated: number;
                type_of_gpa_evaluated: number;
                notes: NewNote[];
            }[];
            changes: (
                {
                    type: 'added' | 'removed';
                    field: string;
                    value: {
                        gpa_value_required_or_recommended: string;
                        minimum_gpa_value_needed: number;
                        minimum_number_of_credits_evaluated: number;
                        type_of_gpa_evaluated: number;
                        notes: NewNote[];
                    };
                    editedBy: string;
                    timestamp: string;
                } 
                | 
                {
                    type: 'modifiedStringField';
                    field: string;
                    original: string;
                    modified: string;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'modifiedNumberField';
                    field: string;
                    original: number;
                    modified: number;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'addedOrRemovedNotes';
                    field: string;
                    value: NewNote;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'modifiedNotes';
                    field: string;
                    noteField: 'type' | 'note';
                    original: string;
                    modified: string;
                    editedBy: string;
                    timestamp: string;
                }
            )[];
        }
        link: string;
    };

    school_minimum_gpa_for_specific_course: {
        input: {
            original: {
                minimum_gpa_required_for_course: number,
                courseID: string,
                notes: NewNote[],
            }[];
            draft: {
                minimum_gpa_required_for_course: number,
                courseID: string,
                notes: NewNote[],
            }[];
            changes: (
                {
                    type: 'added' | 'removed';
                    field: string;
                    value: {
                        minimum_gpa_required_for_course: number,
                        courseID: string,
                        notes: NewNote[],
                    };
                    editedBy: string;
                    timestamp: string;
                } 
                | 
                {
                    type: 'modifiedStringField';
                    field: string;
                    original: string;
                    modified: string;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'modifiedNumberField';
                    field: string;
                    original: number;
                    modified: number;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'addedOrRemovedNotes';
                    field: string;
                    value: NewNote;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'modifiedNotes';
                    field: string;
                    noteField: 'type' | 'note';
                    original: string;
                    modified: string;
                    editedBy: string;
                    timestamp: string;
                }
            )[];
        };
        link: string;
    }


    school_average_gpa_accepted_previous_cycle: {
        average_overall_gpa_accepted_previous_year: {
            input: BasicNumberInput;
            notes: NoteInput;
        };
        average_bcp_gpa_accepted_previous_year: {
            input: BasicNumberInput;
            notes: NoteInput;
        };
        average_science_gpa_accepted_previous_year: {
            input: BasicNumberInput;
            notes: NoteInput;
        };
        average_prerequisite_gpa_accepted_previous_year: {
            input: BasicNumberInput;
            notes: NoteInput;
        };
        link: string;
    };


    school_gpa_general_note: {
        input: BasicStringInput;
        link: string;
    }


    school_grade_criteria: {
        school_minimum_grade_required_for_all_courses: {
            input: BasicStringInput;
        };
        notes: NoteInput;
        link: string;
    }

    school_time_frame_criteria: {
        school_time_frame_all_courses_must_be_completed: {
            input: BasicStringInput;
            notes: NoteInput;
        };
        school_time_frame_science_courses_must_be_completed: {
            input: BasicStringInput;
            notes: NoteInput;
        };
        school_time_frame_math_courses_must_be_completed: {
            input: BasicStringInput;
            notes: NoteInput;
        };
        notes: NoteInput;
        link: string;
    }

    school_pass_fail_criteria: {
        school_pass_fail_grade_accepted: {
            input: BasicBooleanInput;
        };
        notes: NoteInput;
        link: string;
    };


    school_ap_criteria: {
        school_ap_courses_accepted: {
            input: BasicBooleanInput;
        };
        notes: NoteInput;
        link: string;
    };

    school_community_college_criteria: {
        school_community_college_credits_accepted: {
            input: BasicBooleanInput;
        };
        notes: NoteInput;
        link: string;
    }

    school_clep_criteria: {
        school_clep_credits_accepted: {
            input: BasicBooleanInput;
        };
        notes: NoteInput;
        link: string;
    }

    school_online_courses_criteria: {
        school_online_courses_accepted: {
            input: BasicBooleanInput;
        };
        notes: NoteInput;
        link: string;
    }


    school_prerequisite_completion_criteria: {
        school_all_courses_most_be_completed_before_applying: {
            input: BasicBooleanInput;
        };
        school_courses_can_be_in_progress_while_applying: {
            input: BasicBooleanInput;
        };
        school_maximum_number_of_courses_pending_while_applying: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_maximum_number_of_credits_pending_while_applying: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_maximum_number_of_science_courses_pending_while_applying: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_maximum_number_of_non_science_courses_pending_while_applying: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_minimum_grade_required_for_pending_courses: {
            input: BasicStringInput;
            notes: NoteInput;
        } | null;
        school_date_pending_courses_must_be_completed: {
            input: BasicStringInput;
            notes: NoteInput;
        } | null;
        school_semester_pending_courses_must_be_completed: {
            input: BasicStringInput;
            notes: NoteInput;
        } | null;
        notes: NoteInput;
        link: string;
    }


    school_paid_experience_required: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    }

    school_patient_experience: {
        school_patient_experience_required: {
            input: BasicBooleanInput;
        };
        school_patient_experience_recommended: {
            input: BasicBooleanInput;
        };
        school_minimum_patient_care_experience_hours_required: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_minimum_patient_care_experience_hours_recommended: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_minimum_time_frame_patient_care_experience_needs_to_be_completed: {
            input: BasicStringInput;
            notes: NoteInput;
        } | null;
        school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: {
            input: BasicStringInput;
            notes: NoteInput;
        } | null;
        school_average_patient_care_experience_hours_accepted_previous_cycle: {
            input: BasicNumberInput;
        }
        notes: NoteInput;
        link: string;
    }

    school_healthcare_experience: {
        school_healthcare_experience_required: {
            input: BasicBooleanInput;
        };
        school_healthcare_experience_recommended: {
            input: BasicBooleanInput;
        };
        school_minimum_healthcare_experience_hours_required: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_minimum_healthcare_experience_hours_recommended: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_minimum_time_frame_healthcare_experience_needs_to_be_completed: {
            input: BasicStringInput;
            notes: NoteInput;
        } | null;
        school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended: {
            input: BasicStringInput;
            notes: NoteInput;
        } | null;
        school_average_healthcare_experience_hours_accepted_previous_cycle: {
            input: BasicNumberInput;
        }
        notes: NoteInput;
        link: string;
    };

    school_community_service: {
        school_community_service_required: {
            input: BasicBooleanInput;
        }
        school_minimum_community_service_hours_required: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_community_service_recommended: {
            input: BasicBooleanInput;
        }
        school_minimum_community_service_hours_recommended: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_average_community_service_hours_accepted_previous_cycle: {
            input: BasicNumberInput;
        }
        notes: NoteInput;
        link: string;
    };


    school_volunteer_service: {
        school_volunteer_service_required: {
            input: BasicBooleanInput;
        };
        school_minimum_volunteer_service_hours_required: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_volunteer_service_recommended: {
            input: BasicBooleanInput;
        }
        school_minimum_volunteer_service_hours_recommended: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        school_average_volunteer_service_hours_accepted_previous_cycle: {
            input: BasicNumberInput;
        }
        notes: NoteInput;
        link: string;
    }

    school_pa_shadowing_required: {
        original: boolean;
        draft: boolean;
        changes: ModifiedBooleanChange[];
        school_minimum_pa_shadowing_hours_required: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        notes: NoteInput;
        link: string;
    }

    school_pa_shadowing_recommended: {
        original: boolean;
        draft: boolean;
        changes: ModifiedBooleanChange[];
        school_minimum_pa_shadowing_hours_recommended: {
            input: BasicNumberInput;
            notes: NoteInput;
        } | null;
        notes: NoteInput;
        link: string;
    }

    school_average_pa_shadowing_hours_accepted_previous_cycle: {
        input: BasicNumberInput;
        notes: NoteInput;
        link: string;
    }


    school_required_optional_exams: {
        input: {
            original: {
                school_minimum_number_of_exams_to_be_completed: number;
                school_required_optional_exams_list: string[];
                school_optional_exams_notes: NewNote[];
            }[];
            draft: {
                school_minimum_number_of_exams_to_be_completed: number;
                school_required_optional_exams_list: string[];
                school_optional_exams_notes: NewNote[];
            }[];
            changes: (
                {
                    type: 'added' | 'removed';
                    field: string;
                    value: {
                        school_minimum_number_of_exams_to_be_completed: number;
                        school_required_optional_exams_list: string[];
                        school_optional_exams_notes: NewNote[];
                    };
                    editedBy: string;
                    timestamp: string;
                } 
                |
                {
                    type: 'modifiedNumberField';
                    field: string;
                    original: number;
                    modified: number;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'addedOrRemovedStringFromArray';
                    field: string;
                    value: string;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'modifiedStringFromArray';
                    field: string;
                    original: string;
                    modified: string;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'addedOrRemovedNotes';
                    field: string;
                    value: NewNote;
                    editedBy: string;
                    timestamp: string;
                }
                |
                {
                    type: 'modifiedNotes';
                    field: string;
                    noteField: 'type' | 'note';
                    original: string;
                    modified: string;
                    editedBy: string;
                    timestamp: string;
                }
            )[];
        }
        link: string;
    };

    school_gre: {
        school_gre_required: {
            input: BasicBooleanInput;
        };
        school_gre_recommended: {
            input: BasicBooleanInput;
        };
        school_caspa_gre_institution_code: {
            input: BasicNumberInput;
        } | null;
        school_gre_institution_code: {
            input: BasicNumberInput;
        } | null;

        school_minimum_time_frame_gre_must_be_completed: {
            input: BasicStringInput;
            notes: NoteInput;
        } | null;

        school_mcat_accepted_in_place_of_gre: {
            input: BasicBooleanInput;
            notes: NoteInput;
        } | null;

        school_gre_exempt_with_masters_degree: {
            input: BasicBooleanInput;
            notes: NoteInput;
        } | null;

        school_gre_exempt_with_phd_degree: {
            input: BasicBooleanInput;
            notes: NoteInput;
        } | null;

        // school_minimum_gre_scores_required: boolean | null;
        // school_gre_minimum_verbal_score: number | null;
        // school_gre_minimum_quantitative_score: number | null;
        // school_gre_minimum_analytical_writing_score: number | null;
        // school_gre_minimum_combined_score: number | null;
        // school_minimum_gre_score_notes: Note[] | null;

        // school_gre_minimum_verbal_percentile: number | null;
        // school_gre_minimum_quantitative_percentile: number | null;
        // school_gre_minimum_analytical_writing_percentile: number | null;
        // school_gre_minimum_combined_percentile: number | null;
        // school_minimum_gre_percentile_notes: Note[] | null;

        // school_average_gre_verbal_score_accepted_previous_year: number | null;
        // school_average_gre_quantitative_score_accepted_previous_year: number | null;
        // school_average_gre_analytical_writing_score_accepted_previous_year: number | null;
        // school_average_gre_combined_score_accepted_previous_year: number | null;

        // school_average_gre_verbal_percentile_accepted_previous_year: number | null;
        // school_average_gre_quantitative_percentile_accepted_previous_year: number | null;
        // school_average_gre_analytical_writing_percentile_accepted_previous_year: number | null;
        // school_average_gre_combined_percentile_accepted_previous_year: number | null;

        // school_gre_general_notes: Note[];

    }

    

    school_pacat: {
        school_pacat_required: {
            input: BasicBooleanInput;
        };
        school_pacat_recommended: {
            input: BasicBooleanInput;
        };
        school_pacat_exam_school_code: {
            input: BasicNumberInput;
        } | null;
        school_pacat_exam_scaled_minimum_score_required: {
            input: BasicNumberInput;
        } | null;
        school_pacat_exam_group_scaled_minimum_score_required: {
            input: BasicNumberInput;
        } | null;
        notes: NoteInput;
    }

    

    school_casper: {
        school_casper_required: {
            input: BasicBooleanInput;
        };
        school_casper_recommended: {
            input: BasicBooleanInput;
        };
        notes: NoteInput;
    }

    

    // school_english_proficiency_exams: {
    //     school_english_proficiency_exams_required: boolean;
    //     notes: Note[];

    //     school_toefl_required: boolean | null;
    //     school_minimum_time_frame_toefl_needs_to_be_completed: string | null;
    //     school_toefl_exempt_with_masters_degree: boolean | null;
    //     school_toefl_exempt_with_doctoral_degree: boolean | null;

    //     school_toefl_ibt_minimum_total_score_required: number | null;
    //     school_toefl_ibt_minimum_reading_score_required: number | null;
    //     school_toefl_ibt_minimum_writing_score_required: number | null;
    //     school_toefl_ibt_minimum_listening_score_required: number | null;
    //     school_toefl_ibt_minimum_speaking_score_required: number | null;
    //     school_toefl_ibt_minimum_score_notes: Note[] | null;

    //     school_toefl_pbt_minimum_total_score_required: number | null;
    //     school_toefl_pbt_minimum_reading_score_required: number | null;
    //     school_toefl_pbt_minimum_writing_score_required: number | null;
    //     school_toefl_pbt_minimum_listening_score_required: number | null;
    //     school_toefl_pbt_minimum_speaking_score_required: number | null;
    //     school_toefl_pbt_minimum_score_notes: Note[] | null;

    //     school_ielt_required: boolean | null;
    //     school_ielt_minimum_total_score_required: number | null;
    //     school_ielt_minimum_score_notes: Note[] | null;

    //     school_melab_required: boolean | null;
    //     school_melab_minimum_total_score_required: number | null;
    //     school_melab_minimum_score_notes: Note[] | null;

    //     school_pte_academic_required: boolean | null;
    //     school_pte_academic_minimum_total_score_required: number | null;
    //     school_pte_academic_minimum_score_notes: Note[] | null,

    //     school_itep_academic_plus_required: boolean | null;
    //     school_itep_academic_plus_minimum_total_score_required: number | null;
    //     school_itep_academic_plus_minimum_score_notes: Note[] | null;


    // }

    

    // school_evaluations_required: {
    //     input: boolean;
    //     school_minimum_number_of_evaluations_required: number | null;
    //     school_required_evaluator_title: string[] | null;
    //     school_minimum_time_evaluator_knows_applicant: string | null;
    //     school_optional_evaluators_required: {
    //         school_minimum_number_of_evaluators_required_in_group: number;
    //         school_required_optional_group_evaluator_title: string[];
    //         school_minimum_time_evaluator_knows_applicant: string;
    //     }[] | null;
    //     school_evaluations_required_notes: Note[];
    // }

    

    // school_evaluations_recommended: {
    //     input: boolean;
    //     school_minimum_number_of_evaluations_recommended: number | null;
    //     school_recommended_evaluator_title: string[] | null;
    //     school_minimum_time_evaluator_knows_applicant: string | null;
    //     school_optional_evaluators_recommended: {
    //         school_minimum_number_evaluators_recommended_in_group: number;
    //         school_recommended_optional_group_evaluator_title: string[];
    //         school_minimum_time_evaluator_knows_applicant: string;
    //     }[] | null;
    //     school_evaluations_recommended_notes: Note[];
    // }

   

    school_international_students_accepted: {
        input: BasicBooleanInput;
        notes: NoteInput;
        link: string;
    }
    

    // school_certifications_required: {
    //     original: boolean;
    //     draft: boolean;
    //     changes: ModifiedBooleanChange[];
    //     school_certifications_required_options: string[] | null;
    //     school_certification_notes: Note[];
    // }

   

    // school_application_submitted_on_caspa: {
    //     input: boolean;
    //     school_caspa_application_deadline_date: string | null;
    //     school_caspa_application_deadline_type: string | null;
    //     school_caspa_application_notes: Note[];
    // }

    

    // school_application_submitted_directly_to_school: {
    //     input: boolean;
    //     school_application_direct_to_school_deadline: string | null;
    //     school_application_direct_to_school_fee: number | string | null;
    //     school_application_direct_to_school_notes: Note[];
    // }

    

    // school_supplemental_application_required: {
    //     input: boolean;
    //     school_supplemental_application_deadline: string | null;
    //     school_supplemental_application_fee: number | string | null;
    //     school_supplemental_application_link: string | null;
    //     school_supplemental_application_link_provided_with_invite_only: boolean | null;
    //     school_supplemental_application_notes: Note[];
    // }

    school_preference: {
        input: BasicStringInput;
        link: string;
    }
    


}