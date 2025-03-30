export interface SchoolFormField {
    label: string,
    name: string,
    type: 'text' | 'boolean' | 'select' | 'time-frame' | 'array' | 'date' | 'percentage' | 'fee' | 'text-area',
    path: string,
    notePath?: string,
    options?: { value: string | number, label: string | number }[],
    draftOptions?: { value: string | number, label: string | number }[],
    modifyValueFn?: (value: any, keys: string[]) => any,
}

export interface Change {
    type: 'modified' | 'added' | 'removed';
    path: string;
    editedBy: string;
    timestamp: string;
    original?: any;
    modified?: any;
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

export interface GenericSchoolField {
    original: any,
    draft: any,
    changes: Change[],
    link: string,
}

export interface NewSchool {
    id: string;
    isLive: boolean;
    school_name: {
        original: {
            input: string;
        }
        draft: {
            input: string;
        }
        changes: Change[];
        link: string;
    };
    school_logo: {
        original: {
            input: string;
        }
        draft: {
            input: string;
        }
        changes: Change[];
        link: string;
    };
    school_street: {
        original: {
            input: string;
        }
        draft: {
            input: string;
        }
        changes: Change[];
        link: string;
    };
    school_city: {
        original: {
            input: string;
        }
        draft: {
            input: string;
        }
        changes: Change[];
        link: string;
    };
    school_state: {
        original: {
            input: string;
        }
        draft: {
            input: string;
        }
        changes: Change[];
        link: string;
    };
    school_zip_code: {
        original: {
            input: string;
        }
        draft: {
            input: string;
        }
        changes: Change[];
        link: string;
    };
    school_country: {
        original: {
            input: string;
        }
        draft: {
            input: string;
        }
        changes: Change[];
        link: string;
    };
    school_website: {
        original: {
            input: string;
        }
        draft: {
            input: string;
        }
        changes: Change[];
        link: string;
    };
    school_email: {
        original: {
            input: {
                category: string;
                email: string;
            }[],
            notes: NewNote[],
        },
        draft: {
            input: {
                category: string;
                email: string;
            }[],
            notes: NewNote[],
        },
        changes: Change[];
        link: string;
    };
    school_phone_number: {
        original: {
            input: {
                category: string;
                number: string;
            }[],
            notes: NewNote[],
        },
        draft: {
            input: {
                category: string;
                number: string;
            }[],
            notes: NewNote[],
        },
        changes: Change[];
        link: string;
    };
    school_campus_location: {
        original: {
            input: string;
            notes: NewNote[];
        },
        draft: {
            input: string;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_start_month: {
        original: {
            input: string;
            notes: NewNote[];
        },
        draft: {
            input: string;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_class_capacity: {
        original: {
            input: number;
            notes: NewNote[];
        },
        draft: {
            input: number;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_duration_full_time: {
        original: {
            input: number;
            notes: NewNote[];
        },
        draft: {
            input: number;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_duration_part_time: {
        original: {
            input: number;
            notes: NewNote[];
        },
        draft: {
            input: number;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_seat_deposit_in_state: {
        original: {
            input: string;
            notes: NewNote[];
        },
        draft: {
            input: string;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_seat_deposit_out_of_state: {
        original: {
            input: string;
            notes: NewNote[];
        },
        draft: {
            input: string;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_rolling_admissions: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_nonrolling_admissions: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_pre_pa_curriculum: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_direct_high_school_entry: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_part_time_option: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_online_learning: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_on_campus_housing: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_cadaver_lab: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_faith_based_learning: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_military_personnel_preference: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_holistic_review: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_general_information: {
        original: {
            input: string;
        },
        draft: {
            input: string;
        },
        changes: Change[];
        link: string;
    };

    school_dual_degree_program: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_bachelors_degree_required: {
        original: {
            input: boolean;
            notes: NewNote[];
        },
        draft: {
            input: boolean;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };

    school_type_of_degree_offered: {
        original: {
            input: {
                value: string;
            }[];
            notes: NewNote[];
        },
        draft: {
            input: {
                value: string;
            }[];
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_accreditation_status: {
        original: {
            input: string;
            notes: NewNote[];
        },
        draft: {
            input: string;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_mission_statement: {
        original: {
            input: string;
        },
        draft: {
            input: string;
        },
        changes: Change[];
        link: string;
    };
    school_in_state_tuition: {
        original: {
            input: string;
            notes: NewNote[];
        },
        draft: {
            input: string;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };
    school_out_of_state_tuition: {
        original: {
            input: string;
            notes: NewNote[];
        },
        draft: {
            input: string;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };

    school_first_time_pass_rate: {
        original: {
            input: string;
            notes: NewNote[];
        },
        draft: {
            input: string;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };

    school_average_five_year_first_time_pass_rate: {
        original: {
            input: string;
            notes: NewNote[];
        },
        draft: {
            input: string;
            notes: NewNote[];
        },
        changes: Change[];
        link: string;
    };

    school_pance_pass_rate_note: {
        original: {
            input: string;
        },
        draft: {
            input: string;
        },
        changes: Change[];
        link: string;
    };

    school_minimum_gpa_required: {
        original: {
            input: {
                school_minimum_gpa_required: {
                    input: boolean;
                };
                school_minimum_overall_gpa_required: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_science_gpa_required: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_prerequisite_gpa_required: {
                    input: number;
                    notes: NewNote[];
                } | null;
            }
        };
        draft: {
            input: {
                school_minimum_gpa_required: {
                    input: boolean;
                };
                school_minimum_overall_gpa_required: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_science_gpa_required: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_prerequisite_gpa_required: {
                    input: number;
                    notes: NewNote[];
                } | null;
            }
        };
        changes: Change[];
        link: string;
    }

    school_minimum_gpa_recommended: {
        original: {
            input: {
                school_minimum_gpa_recommended: {
                    input: boolean;
                };
                school_minimum_overall_gpa_recommended: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_science_gpa_recommended: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_prerequisite_gpa_recommended: {
                    input: number;
                    notes: NewNote[];
                } | null;
            }
        };
        draft: {
            input: {
                school_minimum_gpa_recommended: {
                    input: boolean;
                };
                school_minimum_overall_gpa_recommended: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_science_gpa_recommended: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_prerequisite_gpa_recommended: {
                    input: number;
                    notes: NewNote[];
                } | null;
            }
        };
        changes: Change[];
        link: string;
    };


    school_other_types_of_gpa_evaluated: {
        original: {
            input: {
                gpa_value_required_or_recommended: {
                    input: string;
                };
                minimum_gpa_value_needed: {
                    input: number;
                }
                minimum_number_of_credits_evaluated: {
                    input: number;
                }
                type_of_gpa_evaluated: {
                    input: string;
                }
                notes: NewNote[];
            }[];
        };
        draft: {
            input: {
                gpa_value_required_or_recommended: {
                    input: string;
                };
                minimum_gpa_value_needed: {
                    input: number;
                }
                minimum_number_of_credits_evaluated: {
                    input: number;
                }
                type_of_gpa_evaluated: {
                    input: string;
                }
                notes: NewNote[];
            }[];
        };
        changes: Change[];
        link: string;
    }


    school_minimum_gpa_for_specific_course: {
        original: {
            input: {
                minimum_gpa_required_for_course: {
                    input: number;
                };
                courseID: {
                    input: string;
                };
                notes: NewNote[];
            }[];
        };
        draft: {
            input: {
                minimum_gpa_required_for_course: {
                    input: number;
                };
                courseID: {
                    input: string;
                };
                notes: NewNote[];
            }[];
        };
        changes: Change[];
        link: string;
    }


    school_average_gpa_accepted_previous_cycle: {
        original: {
            input: {
                average_overall_gpa_accepted_previous_year: {
                    input: number;
                    notes: NewNote[];
                };
                average_bcp_gpa_accepted_previous_year: {
                    input: number;
                    notes: NewNote[];
                };
                average_science_gpa_accepted_previous_year: {
                    input: number;
                    notes: NewNote[];
                };
                average_prerequisite_gpa_accepted_previous_year: {
                    input: number;
                    notes: NewNote[];
                };
            }
        };
        draft: {
            input: {
                average_overall_gpa_accepted_previous_year: {
                    input: number;
                    notes: NewNote[];
                };
                average_bcp_gpa_accepted_previous_year: {
                    input: number;
                    notes: NewNote[];
                };
                average_science_gpa_accepted_previous_year: {
                    input: number;
                    notes: NewNote[];
                };
                average_prerequisite_gpa_accepted_previous_year: {
                    input: number;
                    notes: NewNote[];
                };
            }
        };
        changes: Change[];
        link: string;
    }

    school_gpa_general_note: {
        original: {
            input: string;
        };
        draft: {
            input: string;
        };
        changes: Change[];
        link: string;
    };

    school_required_optional_exams: {
        original: {
            input: {
                school_minimum_number_of_exams_to_be_completed: number;
                school_required_optional_exams_list: {
                    value: string,
                }[],
                notes: NewNote[];
            }[];
        };
        draft: {
            input: {
                school_minimum_number_of_exams_to_be_completed: number;
                school_required_optional_exams_list: {
                    value: string,
                }[],
                notes: NewNote[];
            }[];
        };
        changes: Change[];
        link: string;
    };


    school_gre: {
        original: {
            input: {
                school_gre_required: {
                    input: boolean;
                };
                school_gre_recommended: {
                    input: boolean;
                };
                school_caspa_gre_institution_code: {
                    input: number;
                } | null;
                school_gre_institution_code: {
                    input: number;
                } | null;
        
                school_minimum_time_frame_gre_must_be_completed: {
                    input: {
                        quantity: number,
                        units: string,
                    }
                    notes: NewNote[];
                } | null;
        
                school_mcat_accepted_in_place_of_gre: {
                    input: boolean;
                    notes: NewNote[];
                } | null;
        
                school_gre_exempt_with_masters_degree: {
                    input: boolean;
                    notes: NewNote[];
                } | null;
        
                school_gre_exempt_with_phd_degree: {
                    input: boolean; 
                    notes: NewNote[];
                } | null;
        
                school_minimum_gre_scores_required: {
                    input: boolean;
                } | null;
                school_gre_minimum_verbal_score: {
                    input: number;
                } | null;
                school_gre_minimum_quantitative_score: {
                    input: number;
                } | null;
                school_gre_minimum_analytical_writing_score: {
                    input: number;
                } | null;
                school_gre_minimum_combined_score: {
                    input: number;
                } | null;
                school_minimum_gre_score_notes: {
                    notes: NewNote[];
                } | null;
        
                school_gre_minimum_verbal_percentile: {
                    input: number;
                } | null;
                school_gre_minimum_quantitative_percentile: {
                    input: number;
                } | null;
                school_gre_minimum_analytical_writing_percentile: {
                    input: number;
                } | null;
                school_gre_minimum_combined_percentile: {
                    input: number;
                } | null;
                school_minimum_gre_percentile_notes: {
                    notes: NewNote[];
                } | null;
        
                school_average_gre_verbal_score_accepted_previous_year: {
                    input: number;
                } | null;
                school_average_gre_quantitative_score_accepted_previous_year: {
                    input: number;
                } | null;
                school_average_gre_analytical_writing_score_accepted_previous_year: {
                    input: number;
                } | null;
                school_average_gre_combined_score_accepted_previous_year: {
                    input: number;
                } | null;
        
                school_average_gre_verbal_percentile_accepted_previous_year: {
                    input: number;
                } | null;
                school_average_gre_quantitative_percentile_accepted_previous_year: {
                    input: number;
                } | null;
                school_average_gre_analytical_writing_percentile_accepted_previous_year: {
                    input: number;
                } | null;
                school_average_gre_combined_percentile_accepted_previous_year: {
                    input: number;
                } | null;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_gre_required: {
                    input: boolean;
                };
                school_gre_recommended: {
                    input: boolean;
                };
                school_caspa_gre_institution_code: {
                    input: number;
                } | null;
                school_gre_institution_code: {
                    input: number;
                } | null;
        
                school_minimum_time_frame_gre_must_be_completed: {
                    input: {
                        quantity: number,
                        units: string,
                    }
                    notes: NewNote[];
                } | null;
        
                school_mcat_accepted_in_place_of_gre: {
                    input: boolean;
                    notes: NewNote[];
                } | null;
        
                school_gre_exempt_with_masters_degree: {
                    input: boolean;
                    notes: NewNote[];
                } | null;
        
                school_gre_exempt_with_phd_degree: {
                    input: boolean; 
                    notes: NewNote[];
                } | null;
        
                school_minimum_gre_scores_required: {
                    input: boolean;
                } | null;
                school_gre_minimum_verbal_score: {
                    input: number;
                } | null;
                school_gre_minimum_quantitative_score: {
                    input: number;
                } | null;
                school_gre_minimum_analytical_writing_score: {
                    input: number;
                } | null;
                school_gre_minimum_combined_score: {
                    input: number;
                } | null;
                school_minimum_gre_score_notes: {
                    notes: NewNote[];
                } | null;
        
                school_gre_minimum_verbal_percentile: {
                    input: number;
                } | null;
                school_gre_minimum_quantitative_percentile: {
                    input: number;
                } | null;
                school_gre_minimum_analytical_writing_percentile: {
                    input: number;
                } | null;
                school_gre_minimum_combined_percentile: {
                    input: number;
                } | null;
                school_minimum_gre_percentile_notes: {
                    notes: NewNote[];
                } | null;
        
                school_average_gre_verbal_score_accepted_previous_year: {
                    input: number;
                } | null;
                school_average_gre_quantitative_score_accepted_previous_year: {
                    input: number;
                } | null;
                school_average_gre_analytical_writing_score_accepted_previous_year: {
                    input: number;
                } | null;
                school_average_gre_combined_score_accepted_previous_year: {
                    input: number;
                } | null;
        
                school_average_gre_verbal_percentile_accepted_previous_year: {
                    input: number;
                } | null;
                school_average_gre_quantitative_percentile_accepted_previous_year: {
                    input: number;
                } | null;
                school_average_gre_analytical_writing_percentile_accepted_previous_year: {
                    input: number;
                } | null;
                school_average_gre_combined_percentile_accepted_previous_year: {
                    input: number;
                } | null;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }


    school_pacat: {
        original: {
            input: {
                school_pacat_required: boolean;
                school_pacat_recommended: boolean;
                school_pacat_exam_school_code: number | null;
                school_pacat_exam_scaled_minimum_score_required: number | null;
                school_pacat_exam_group_scaled_minimum_score_required: number | null;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_pacat_required: boolean;
                school_pacat_recommended: boolean;
                school_pacat_exam_school_code: number | null;
                school_pacat_exam_scaled_minimum_score_required: number | null;
                school_pacat_exam_group_scaled_minimum_score_required: number | null;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }


    school_casper: {
        original: {
            input: {
                school_casper_required: boolean;
                school_casper_recommended: boolean;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_casper_required: boolean;
                school_casper_recommended: boolean;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }


    school_english_proficiency_exams: {
        original: {
            input: {
                school_english_proficiency_exams_required: {
                    input: boolean;
                };

                school_toefl_required: {
                    input: boolean;
                } | null;
                school_minimum_time_frame_toefl_needs_to_be_completed: {
                    input: {
                        quantity: number,
                        units: string,
                    }
                } | null;
                school_toefl_exempt_with_masters_degree: {
                    input: boolean;
                } | null;
                school_toefl_exempt_with_doctoral_degree: {
                    input: boolean;
                } | null;
        
                school_toefl_ibt_minimum_total_score_required: {
                    input: number;
                } | null;
                school_toefl_ibt_minimum_reading_score_required: {
                    input: number;
                } | null;
                school_toefl_ibt_minimum_writing_score_required: {
                    input: number;
                } | null;
                school_toefl_ibt_minimum_listening_score_required: {
                    input: number;
                } | null;
                school_toefl_ibt_minimum_speaking_score_required: {
                    input: number;
                } | null;
                school_toefl_ibt_minimum_score_notes: {
                    notes: NewNote[];
                } | null;
        
                school_toefl_pbt_minimum_total_score_required: {
                    input: number;
                } | null;
                school_toefl_pbt_minimum_reading_score_required: {
                    input: number;
                } | null;
                school_toefl_pbt_minimum_writing_score_required: {
                    input: number;
                } | null;
                school_toefl_pbt_minimum_listening_score_required: {
                    input: number;
                } | null;
                school_toefl_pbt_minimum_speaking_score_required: {
                    input: number;
                } | null;
                school_toefl_pbt_minimum_score_notes: {
                    notes: NewNote[];
                } | null;
        
                school_ielt_required: {
                    input: boolean;
                } | null;
                school_ielt_minimum_total_score_required: {
                    input: number;
                } | null;
                school_ielt_minimum_score_notes: {
                    notes: NewNote[];
                } | null;
        
                school_melab_required: {
                    input: boolean;
                } | null;
                school_melab_minimum_total_score_required: {
                    input: number;
                } | null;
                school_melab_minimum_score_notes: {
                    notes: NewNote[];
                } | null;
        
                school_pte_academic_required: {
                    input: boolean;
                } | null;
                school_pte_academic_minimum_total_score_required: {
                    input: number;
                } | null;
                school_pte_academic_minimum_score_notes: {
                    notes: NewNote[];
                } | null;
        
                school_itep_academic_plus_required: {
                    input: boolean;
                } | null;
                school_itep_academic_plus_minimum_total_score_required: {
                    input: number;
                } | null;
                school_itep_academic_plus_minimum_score_notes: {
                    notes: NewNote[];
                } | null;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_english_proficiency_exams_required: {
                    input: boolean;
                };

                school_toefl_required: {
                    input: boolean;
                } | null;
                school_minimum_time_frame_toefl_needs_to_be_completed: {
                    input: {
                        quantity: number,
                        units: string,
                    }
                } | null;
                school_toefl_exempt_with_masters_degree: {
                    input: boolean;
                } | null;
                school_toefl_exempt_with_doctoral_degree: {
                    input: boolean;
                } | null;
        
                school_toefl_ibt_minimum_total_score_required: {
                    input: number;
                } | null;
                school_toefl_ibt_minimum_reading_score_required: {
                    input: number;
                } | null;
                school_toefl_ibt_minimum_writing_score_required: {
                    input: number;
                } | null;
                school_toefl_ibt_minimum_listening_score_required: {
                    input: number;
                } | null;
                school_toefl_ibt_minimum_speaking_score_required: {
                    input: number;
                } | null;
                school_toefl_ibt_minimum_score_notes: {
                    notes: NewNote[];
                } | null;
        
                school_toefl_pbt_minimum_total_score_required: {
                    input: number;
                } | null;
                school_toefl_pbt_minimum_reading_score_required: {
                    input: number;
                } | null;
                school_toefl_pbt_minimum_writing_score_required: {
                    input: number;
                } | null;
                school_toefl_pbt_minimum_listening_score_required: {
                    input: number;
                } | null;
                school_toefl_pbt_minimum_speaking_score_required: {
                    input: number;
                } | null;
                school_toefl_pbt_minimum_score_notes: {
                    notes: NewNote[];
                } | null;
        
                school_ielt_required: {
                    input: boolean;
                } | null;
                school_ielt_minimum_total_score_required: {
                    input: number;
                } | null;
                school_ielt_minimum_score_notes: {
                    notes: NewNote[];
                } | null;
        
                school_melab_required: {
                    input: boolean;
                } | null;
                school_melab_minimum_total_score_required: {
                    input: number;
                } | null;
                school_melab_minimum_score_notes: {
                    notes: NewNote[];
                } | null;
        
                school_pte_academic_required: {
                    input: boolean;
                } | null;
                school_pte_academic_minimum_total_score_required: {
                    input: number;
                } | null;
                school_pte_academic_minimum_score_notes: {
                    notes: NewNote[];
                } | null;
        
                school_itep_academic_plus_required: {
                    input: boolean;
                } | null;
                school_itep_academic_plus_minimum_total_score_required: {
                    input: number;
                } | null;
                school_itep_academic_plus_minimum_score_notes: {
                    notes: NewNote[];
                } | null;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    };

    school_exams_general_note: {
        original: {
            input: string;
        };
        draft: {
            input: string;
        };
        changes: Change[];
        link: string;
    };

    school_prereq_required_notes: {
        original: {
            input: string;
        };
        draft: {
            input: string;
        };
        changes: Change[];
        link: string;
    };

    school_prereq_required_courses_and_categories: {
        original: {
            input: {
                school_prereq_required_courses: {
                    input: {
                        school_required_course_id: string;
                        school_required_course_lab: boolean;
                        school_required_course_lab_preferred: boolean;
                        school_required_course_credit_hours: number;
                        school_required_course_quarter_hours: number;
                        school_required_course_note_section: string;
                    }[];
                    notes: NewNote[];
                };
                school_prereq_required_optional_courses: {
                    input: {
                        school_minimum_number_of_courses_to_be_completed: number;
                        school_required_optional_courses_list: {
                            school_optional_course_id: string;
                            school_optional_course_lab: boolean;
                            school_optional_course_lab_preferred: boolean;
                            school_optional_course_credit_hours: number;
                            school_optional_course_quarter_hours: number;
                            school_optional_course_note_section: string;
                        }[];
                        notes: NewNote[];
                    }[];
                };
                school_prereq_required_course_categories: {
                    input: {
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
                        notes: NewNote[];
                    }[];
                };
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_prereq_required_courses: {
                    input: {
                        school_required_course_id: string;
                        school_required_course_lab: boolean;
                        school_required_course_lab_preferred: boolean;
                        school_required_course_credit_hours: number;
                        school_required_course_quarter_hours: number;
                        school_required_course_note_section: string;
                    }[];
                    notes: NewNote[];
                };
                school_prereq_required_optional_courses: {
                    input: {
                        school_minimum_number_of_courses_to_be_completed: number;
                        school_required_optional_courses_list: {
                            school_optional_course_id: string;
                            school_optional_course_lab: boolean;
                            school_optional_course_lab_preferred: boolean;
                            school_optional_course_credit_hours: number;
                            school_optional_course_quarter_hours: number;
                            school_optional_course_note_section: string;
                        }[];
                        notes: NewNote[];
                    }[];
                };
                school_prereq_required_course_categories: {
                    input: {
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
                        notes: NewNote[];
                    }[];
                };
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_prereq_required_courses: {
        original: {
            input: {
                school_required_course_id: string;
                school_required_course_lab: boolean;
                school_required_course_lab_preferred: boolean;
                school_required_course_credit_hours: number;
                school_required_course_quarter_hours: number;
                school_required_course_note_section: string;
            }[];
            notes: NewNote[];
        };
        draft: {
            input: {
                school_required_course_id: string;
                school_required_course_lab: boolean;
                school_required_course_lab_preferred: boolean;
                school_required_course_credit_hours: number;
                school_required_course_quarter_hours: number;
                school_required_course_note_section: string;
            }[];
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
        
    }


    school_prereq_required_optional_courses: {
        original: {
            input: {
                school_minimum_number_of_courses_to_be_completed: number;
                school_required_optional_courses_list: {
                    school_optional_course_id: string;
                    school_optional_course_lab: boolean;
                    school_optional_course_lab_preferred: boolean;
                    school_optional_course_credit_hours: number;
                    school_optional_course_quarter_hours: number;
                    school_optional_course_note_section: string;
                }[];
                notes: NewNote[];
            }
        };
        draft: {
            input: {
                school_minimum_number_of_courses_to_be_completed: number;
                school_required_optional_courses_list: {
                    school_optional_course_id: string;
                    school_optional_course_lab: boolean;
                    school_optional_course_lab_preferred: boolean;
                    school_optional_course_credit_hours: number;
                    school_optional_course_quarter_hours: number;
                    school_optional_course_note_section: string;
                }[];
                notes: NewNote[];
            }
        };
        changes: Change[];
        link: string;
    }

    school_prereq_required_course_categories: {
        original: {
            input: {
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
                notes: NewNote[];
            }[];
        };
        draft: {
            input: {
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
                notes: NewNote[];
            }[];
        };
        changes: Change[];
        link: string;
    }

    school_prereq_recommended_courses: {
        original: {
            input: {
                school_recommended_course_id: string;
                school_recommended_course_lab: boolean;
                school_recommended_course_lab_preferred: boolean;
                school_recommended_course_credit_hours: number;
                school_recommended_course_quarter_hours: number;
                school_recommended_course_note_section: string;
            }[];
            notes: NewNote[];
        };
        draft: {
            input: {
                school_recommended_course_id: string;
                school_recommended_course_lab: boolean;
                school_recommended_course_lab_preferred: boolean;
                school_recommended_course_credit_hours: number;
                school_recommended_course_quarter_hours: number;
                school_recommended_course_note_section: string;
            }[];
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_grade_criteria: {
        original: {
            input: {
                school_minimum_grade_required_for_all_courses: string;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_minimum_grade_required_for_all_courses: string;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_time_frame_criteria: {
        original: {
            input: {
                school_time_frame_all_courses_must_be_completed: {
                    input: {
                        quantity: number;
                        units: string; 
                    };
                    notes: NewNote[];
                };
                school_time_frame_science_courses_must_be_completed: {
                    input: {
                        quantity: number;
                        units: string; 
                    };
                    notes: NewNote[];
                };
                school_time_frame_math_courses_must_be_completed: {
                    input: {
                        quantity: number;
                        units: string; 
                    };
                    notes: NewNote[];
                };
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_time_frame_all_courses_must_be_completed: {
                    input: {
                        quantity: number;
                        units: string; 
                    };
                    notes: NewNote[];
                };
                school_time_frame_science_courses_must_be_completed: {
                    input: {
                        quantity: number;
                        units: string; 
                    };
                    notes: NewNote[];
                };
                school_time_frame_math_courses_must_be_completed: {
                    input: {
                        quantity: number;
                        units: string; 
                    };
                    notes: NewNote[];
                };
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }


    school_pass_fail_criteria: {
        original: {
            input: {
                school_pass_fail_grade_accepted: boolean;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_pass_fail_grade_accepted: boolean;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }


    school_ap_criteria: {
        original: {
            input: {
                school_ap_courses_accepted: boolean;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_ap_courses_accepted: boolean;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_community_college_criteria: {
        original: {
            input: {
                school_community_college_credits_accepted: boolean;
            };
            notes: NewNote[];
        }
        draft: {
            input: {
                school_community_college_credits_accepted: boolean;
            };
            notes: NewNote[];
        }
        changes: Change[];
        link: string;
    }

    school_clep_criteria: {
        original: {
            input: {
                school_clep_credits_accepted: boolean;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_clep_credits_accepted: boolean;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }


    school_online_courses_criteria: {
        original: {
            input: {
                school_online_courses_accepted: boolean;
            };
            notes: NewNote[];
        }
        draft: {
            input: {
                school_online_courses_accepted: boolean;
            };
            notes: NewNote[];
        }
        changes: Change[];
        link: string;
    };

    school_prerequisite_completion_criteria: {
        original: {
            input: {
                school_all_courses_most_be_completed_before_applying: boolean;
                school_courses_can_be_in_progress_while_applying: boolean;
                school_maximum_number_of_courses_pending_while_applying: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_maximum_number_of_credits_pending_while_applying: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_maximum_number_of_science_courses_pending_while_applying: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_maximum_number_of_non_science_courses_pending_while_applying: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_grade_required_for_pending_courses: {
                    input: string;
                    notes: NewNote[];
                } | null;
                school_date_pending_courses_must_be_completed: {
                    input: string;
                    notes: NewNote[];
                } | null;
                school_semester_pending_courses_must_be_completed: {
                    input: string;
                    notes: NewNote[];
                } | null;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_all_courses_most_be_completed_before_applying: boolean;
                school_courses_can_be_in_progress_while_applying: boolean;
                school_maximum_number_of_courses_pending_while_applying: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_maximum_number_of_credits_pending_while_applying: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_maximum_number_of_science_courses_pending_while_applying: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_maximum_number_of_non_science_courses_pending_while_applying: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_grade_required_for_pending_courses: {
                    input: string;
                    notes: NewNote[];
                } | null;
                school_date_pending_courses_must_be_completed: {
                    input: string;
                    notes: NewNote[];
                } | null;
                school_semester_pending_courses_must_be_completed: {
                    input: string;
                    notes: NewNote[];
                } | null;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_paid_experience_required: {
        original: {
            input: boolean;
            notes: NewNote[];
        }
        draft: {
            input: boolean;
            notes: NewNote[];
        }
        changes: Change[];
        link: string;
    }

    school_patient_experience: {
        original: {
            input: {
                school_patient_experience_required: {
                    input: boolean;
                };
                school_patient_experience_recommended: {
                    input: boolean;
                };
                school_minimum_patient_care_experience_hours_required: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_patient_care_experience_hours_recommended: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required: {
                    input: {
                        quantity: number;
                        units: string;
                    };
                    notes: NewNote[];
                } | null;
                school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: {
                    input: {
                        quantity: number;
                        units: string;
                    };
                    notes: NewNote[];
                } | null;
                school_average_patient_care_experience_hours_accepted_previous_cycle: {
                    input: number;
                }
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_patient_experience_required: {
                    input: boolean;
                };
                school_patient_experience_recommended: {
                    input: boolean;
                };
                school_minimum_patient_care_experience_hours_required: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_patient_care_experience_hours_recommended: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required: {
                    input: {
                        quantity: number;
                        units: string;
                    };
                    notes: NewNote[];
                } | null;
                school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: {
                    input: {
                        quantity: number;
                        units: string;
                    };
                    notes: NewNote[];
                } | null;
                school_average_patient_care_experience_hours_accepted_previous_cycle: {
                    input: number;
                }
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
        
    }


    school_healthcare_experience: {
        original: {
            input: {
                school_healthcare_experience_required: {
                    input: boolean;
                };
                school_healthcare_experience_recommended: {
                    input: boolean;
                };
                school_minimum_healthcare_experience_hours_required: {
                    input: number;
                    notes: NewNote[]
                } | null;
                school_minimum_healthcare_experience_hours_recommended: {
                    input: number;
                    notes: NewNote[]
                } | null;
                school_minimum_time_frame_healthcare_experience_needs_to_be_completed_required: {
                    input: {
                        quantity: number;
                        units: string;
                    };
                    notes: NewNote[]
                } | null;
                school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended: {
                    input: {
                        quantity: number;
                        units: string;
                    };
                    notes: NewNote[]
                } | null;
                school_average_healthcare_experience_hours_accepted_previous_cycle: {
                    input: number;
                };
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_healthcare_experience_required: {
                    input: boolean;
                };
                school_healthcare_experience_recommended: {
                    input: boolean;
                };
                school_minimum_healthcare_experience_hours_required: {
                    input: number;
                    notes: NewNote[]
                } | null;
                school_minimum_healthcare_experience_hours_recommended: {
                    input: number;
                    notes: NewNote[]
                } | null;
                school_minimum_time_frame_healthcare_experience_needs_to_be_completed_required: {
                    input: {
                        quantity: number;
                        units: string;
                    };
                    notes: NewNote[]
                } | null;
                school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended: {
                    input: {
                        quantity: number;
                        units: string;
                    };
                    notes: NewNote[]
                } | null;
                school_average_healthcare_experience_hours_accepted_previous_cycle: {
                    input: number;
                };
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_community_service: {
        original: {
            input: {
                school_community_service_required: {
                    input: boolean;
                };
                school_minimum_community_service_hours_required: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_community_service_recommended: {
                    input: boolean;
                };
                school_minimum_community_service_hours_recommended: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_average_community_service_hours_accepted_previous_cycle: {
                    input: number;
                };
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_community_service_required: {
                    input: boolean;
                };
                school_minimum_community_service_hours_required: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_community_service_recommended: {
                    input: boolean;
                };
                school_minimum_community_service_hours_recommended: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_average_community_service_hours_accepted_previous_cycle: {
                    input: number;
                };
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
        
    }

    school_volunteer_service: {
        original: {
            input: {
                school_volunteer_service_required: {
                    input: boolean;
                };
                school_minimum_volunteer_service_hours_required: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_volunteer_service_recommended: {
                    input: boolean;
                };
                school_minimum_volunteer_service_hours_recommended: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_average_volunteer_service_hours_accepted_previous_cycle: {
                    input: number;
                };
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_volunteer_service_required: {
                    input: boolean;
                };
                school_minimum_volunteer_service_hours_required: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_volunteer_service_recommended: {
                    input: boolean;
                };
                school_minimum_volunteer_service_hours_recommended: {
                    input: number;
                    notes: NewNote[];
                } | null;
                school_average_volunteer_service_hours_accepted_previous_cycle: {
                    input: number;
                };
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_pa_shadowing_required: {
        original: {
            input: {
                school_pa_shadowing_required: boolean;
                school_minimum_pa_shadowing_hours_required: number | null;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_pa_shadowing_required: boolean;
                school_minimum_pa_shadowing_hours_required: number | null;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }


    school_pa_shadowing_recommended: {
        original: {
            input: {
                school_pa_shadowing_recommended: boolean;
                school_minimum_pa_shadowing_hours_recommended: number | null;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_pa_shadowing_recommended: boolean;
                school_minimum_pa_shadowing_hours_recommended: number | null;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_average_pa_shadowing_hours_accepted_previous_cycle: {
        original: {
            input: number;
            notes: NewNote[];
        };
        draft: {
            input: number;
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_evaluations_required: {
        original: {
            input: {
                school_evaluations_required: boolean;
                school_minimum_number_of_evaluations_required: {
                    quantity: number,
                    units: string,
                } | null;
                school_required_evaluator_title: {
                    value: string;
                }[] | null;
                school_minimum_time_evaluator_knows_applicant: string | null;
                school_optional_evaluators_required: {
                    school_minimum_number_of_evaluators_required_in_group: number;
                    school_required_optional_group_evaluator_title: { value: string }[];
                    school_minimum_time_evaluator_knows_applicant: {
                        quantity: number,
                        units: string,
                    };
                }[] | null;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_evaluations_required: boolean;
                school_minimum_number_of_evaluations_required: number | null;
                school_required_evaluator_title: {
                    value: string;
                }[] | null;
                school_minimum_time_evaluator_knows_applicant: {
                    quantity: number,
                    units: string,
                } | null;
                school_optional_evaluators_required: {
                    school_minimum_number_of_evaluators_required_in_group: number;
                    school_required_optional_group_evaluator_title: { value: string }[];
                    school_minimum_time_evaluator_knows_applicant: {
                        quantity: number,
                        units: string,
                    };
                }[] | null;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_evaluations_recommended: {
        original: {
            input: {
                school_evaluations_recommended: boolean;
                school_minimum_number_of_evaluations_recommended: {
                    quantity: number,
                    units: string,
                } | null;
                school_recommended_evaluator_title: {
                    value: string;
                }[] | null;
                school_minimum_time_evaluator_knows_applicant: string | null;
                school_optional_evaluators_recommended: {
                    school_minimum_number_evaluators_recommended_in_group: number;
                    school_recommended_optional_group_evaluator_title: { value: string }[];
                    school_minimum_time_evaluator_knows_applicant: {
                        quantity: number,
                        units: string,
                    };
                }[] | null;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_evaluations_recommended: boolean;
                school_minimum_number_of_evaluations_recommended: {
                    quantity: number,
                    units: string,
                } | null;
                school_recommended_evaluator_title: {
                    value: string;
                }[] | null;
                school_minimum_time_evaluator_knows_applicant: string | null;
                school_optional_evaluators_recommended: {
                    school_minimum_number_evaluators_recommended_in_group: number;
                    school_recommended_optional_group_evaluator_title: { value: string }[];
                    school_minimum_time_evaluator_knows_applicant: {
                        quantity: number,
                        units: string,
                    };
                }[] | null;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }


    school_certifications_required: {
        original: {
            input: {
                school_certifications_required: {
                    input: boolean;
                };
                school_certifications_required_options: {
                    input: {
                        value: string;
                    }[];
                } | null,
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_certifications_required: {
                    input: boolean;
                };
                school_certifications_required_options: {
                    input: {
                        value: string;
                    }[];
                } | null;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_application_submitted_on_caspa: {
        original: {
            input: {
                school_application_submitted_on_caspa: boolean,
                school_caspa_application_deadline_date: string | null;
                school_caspa_application_deadline_type: string | null;
            },
            notes: NewNote[];
        };
        draft: {
            input: {
                school_application_submitted_on_caspa: boolean,
                school_caspa_application_deadline_date: string | null;
                school_caspa_application_deadline_type: string | null;
            },
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_application_submitted_directly_to_school: {
        original: {
            input: {
                school_application_submitted_directly_to_school: boolean;
                school_application_direct_to_school_deadline: string | null;
                school_application_direct_to_school_fee: number | string | null;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_application_submitted_directly_to_school: boolean;
                school_application_direct_to_school_deadline: string | null;
                school_application_direct_to_school_fee: number | string | null;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    }

    school_supplemental_application_required: {
        original: {
            input: {
                school_supplemental_application_required: boolean;
                school_supplemental_application_deadline: string | null;
                school_supplemental_application_fee: number | string | null;
                school_supplemental_application_link: string | null;
                school_supplemental_application_link_provided_with_invite_only: boolean | null;
            };
            notes: NewNote[];
        };
        draft: {
            input: {
                school_supplemental_application_required: boolean;
                school_supplemental_application_deadline: string | null;
                school_supplemental_application_fee: number | string | null;
                school_supplemental_application_link: string | null;
                school_supplemental_application_link_provided_with_invite_only: boolean | null;
            };
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    };
    
    school_international_students_accepted: {
        original: {
            input: boolean;
            notes: NewNote[];
        };
        draft: {
            input: boolean;
            notes: NewNote[];
        };
        changes: Change[];
        link: string;
    };
    

    school_preference: {
        original: {
            input: string;
        };
        draft: {
            input: string;
        };
        changes: Change[];
        link: string;
    };
}


