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


