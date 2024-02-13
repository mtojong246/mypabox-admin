import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School} from "../../../../types/schools.types";



export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_evaluations_required') {
        const field = newSchool.edited_school_evaluations_required;
        const originalField = newSchool.school_evaluations_required;
        setNewSchool({
            ...newSchool,
            edited_school_evaluations_required: {
                ...field,
                isEditMode: true,
                input: field.input === null ? originalField.input : field.input,
                notes: field.notes === null ? originalField.school_evaluations_required_notes : field.notes,
                edited_school_minimum_number_of_evaluations_required: {
                    ...field.edited_school_minimum_number_of_evaluations_required,
                    input: field.edited_school_minimum_number_of_evaluations_required.input === null ? originalField.school_minimum_number_of_evaluations_required : field.edited_school_minimum_number_of_evaluations_required.input,
                },
                edited_school_minimum_time_evaluator_knows_applicant: {
                    ...field.edited_school_minimum_time_evaluator_knows_applicant,
                    input: field.edited_school_minimum_time_evaluator_knows_applicant.input === null ? originalField.school_minimum_time_evaluator_knows_applicant : field.edited_school_minimum_time_evaluator_knows_applicant.input,
                },
                edited_school_optional_evaluators_required: {
                    ...field.edited_school_optional_evaluators_required,
                    input: field.edited_school_optional_evaluators_required.input === null ? originalField.school_optional_evaluators_required && originalField.school_optional_evaluators_required.map(op => ({
                        school_minimum_number_of_evaluators_required_in_group: op.school_minimum_number_of_evaluators_required_in_group,
                        school_minimum_time_evaluator_knows_applicant: op.school_minimum_time_evaluator_knows_applicant,
                        school_required_optional_group_evaluator_title: op.school_required_optional_group_evaluator_title.map(title => ({
                            name: title,
                            isCorrect: true,
                            isNew: false,
                        })),
                        isCorrect: true,
                        isNew: false,
                    })) : field.edited_school_optional_evaluators_required.input,
                },
                edited_school_required_evaluator_title: {
                    ...field.edited_school_required_evaluator_title,
                    input: field.edited_school_required_evaluator_title.input === null ? originalField.school_required_evaluator_title && originalField.school_required_evaluator_title.map(op => ({
                        name: op,
                        isCorrect: true,
                        isNew: false,
                    })) : field.edited_school_required_evaluator_title.input,
                }
            }
        })
    } else if (name === 'edited_school_evaluations_recommended') {
        const field = newSchool.edited_school_evaluations_recommended;
        const originalField = newSchool.school_evaluations_recommended;
        setNewSchool({
            ...newSchool,
            edited_school_evaluations_recommended: {
                ...field,
                isEditMode: true,
                input: field.input === null ? originalField.input : field.input,
                notes: field.notes === null ? originalField.school_evaluations_recommended_notes : field.notes,
                edited_school_minimum_number_of_evaluations_recommended: {
                    ...field.edited_school_minimum_number_of_evaluations_recommended,
                    input: field.edited_school_minimum_number_of_evaluations_recommended.input === null ? originalField.school_minimum_number_of_evaluations_recommended : field.edited_school_minimum_number_of_evaluations_recommended.input,
                },
                edited_school_minimum_time_evaluator_knows_applicant: {
                    ...field.edited_school_minimum_time_evaluator_knows_applicant,
                    input: field.edited_school_minimum_time_evaluator_knows_applicant.input === null ? originalField.school_minimum_time_evaluator_knows_applicant : field.edited_school_minimum_time_evaluator_knows_applicant.input,
                },
                edited_school_optional_evaluators_recommended: {
                    ...field.edited_school_optional_evaluators_recommended,
                    input: field.edited_school_optional_evaluators_recommended.input === null ? originalField.school_optional_evaluators_recommended && originalField.school_optional_evaluators_recommended.map(op => ({
                        school_minimum_number_evaluators_recommended_in_group: op.school_minimum_number_evaluators_recommended_in_group,
                        school_minimum_time_evaluator_knows_applicant: op.school_minimum_time_evaluator_knows_applicant,
                        school_recommended_optional_group_evaluator_title: op.school_recommended_optional_group_evaluator_title.map(title => ({
                            name: title,
                            isCorrect: true,
                            isNew: false,
                        })),
                        isCorrect: true,
                        isNew: false,
                    })) : field.edited_school_optional_evaluators_recommended.input,
                },
                edited_school_recommended_evaluator_title: {
                    ...field.edited_school_recommended_evaluator_title,
                    input: field.edited_school_recommended_evaluator_title.input === null ? originalField.school_recommended_evaluator_title && originalField.school_recommended_evaluator_title.map(title => ({
                        name: title,
                        isCorrect: true,
                        isNew: false,
                    })) : field.edited_school_recommended_evaluator_title.input,
                }
            }
        })
    }
}



export const confirmEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (!original) {
        if (name === 'edited_school_evaluations_required') {
            const field = newSchool.edited_school_evaluations_required;
            const originalField = newSchool.school_evaluations_required;
            const editedArrayOne = field.edited_school_optional_evaluators_required.input && field.edited_school_optional_evaluators_required.input.map(inp => ({
                school_minimum_number_of_evaluators_required_in_group: inp.school_minimum_number_of_evaluators_required_in_group,
                school_required_optional_group_evaluator_title: inp.school_required_optional_group_evaluator_title.map(list => list.name),
                school_minimum_time_evaluator_knows_applicant: inp.school_minimum_time_evaluator_knows_applicant,
            }));
            const editedArrayTwo = field.edited_school_required_evaluator_title.input && field.edited_school_required_evaluator_title.input.map(inp => inp.name);
            setNewSchool({
                ...newSchool,
                school_evaluations_required: {
                    ...newSchool.school_evaluations_required,
                    school_evaluations_required_notes: field.notes ? field.notes : newSchool.school_evaluations_required.school_evaluations_required_notes,
                },
                edited_school_evaluations_required: {
                    ...field,
                    isEditMode: false,
                    input: field.input === originalField.input ? null : field.input,
                    prev: field.input === originalField.input ? null : field.input,
                    edited_school_minimum_number_of_evaluations_required: {
                        ...field.edited_school_minimum_number_of_evaluations_required,
                        input: field.edited_school_minimum_number_of_evaluations_required.input === originalField.school_minimum_number_of_evaluations_required ? null : field.edited_school_minimum_number_of_evaluations_required.input,
                        prev: field.edited_school_minimum_number_of_evaluations_required.input === originalField.school_minimum_number_of_evaluations_required ? null : field.edited_school_minimum_number_of_evaluations_required.input,
                    },
                    edited_school_minimum_time_evaluator_knows_applicant: {
                        ...field.edited_school_minimum_time_evaluator_knows_applicant,
                        input: field.edited_school_minimum_time_evaluator_knows_applicant.input === originalField.school_minimum_time_evaluator_knows_applicant ? null : field.edited_school_minimum_time_evaluator_knows_applicant.input,
                        prev: field.edited_school_minimum_time_evaluator_knows_applicant.input === originalField.school_minimum_time_evaluator_knows_applicant ? null : field.edited_school_minimum_time_evaluator_knows_applicant.input,
                    },
                    edited_school_optional_evaluators_required: {
                        ...field.edited_school_optional_evaluators_required,
                        input: field.edited_school_optional_evaluators_required.input,
                        prev: field.edited_school_optional_evaluators_required.input,
                    },
                    edited_school_required_evaluator_title: {
                        ...field.edited_school_required_evaluator_title,
                        input: field.edited_school_required_evaluator_title.input,
                        prev: field.edited_school_required_evaluator_title.input,
                    }
                }
            })
        } else if (name === 'edited_school_evaluations_recommended') {
            const field = newSchool.edited_school_evaluations_recommended;
            const originalField = newSchool.school_evaluations_recommended;
            const editedArrayOne = field.edited_school_optional_evaluators_recommended.input && field.edited_school_optional_evaluators_recommended.input.map(inp => ({
                school_minimum_number_evaluators_recommended_in_group: inp.school_minimum_number_evaluators_recommended_in_group,
                school_recommended_optional_group_evaluator_title: inp.school_recommended_optional_group_evaluator_title.map(list => list.name),
                school_minimum_time_evaluator_knows_applicant: inp.school_minimum_time_evaluator_knows_applicant,
            }));
            const editedArrayTwo = field.edited_school_recommended_evaluator_title.input && field.edited_school_recommended_evaluator_title.input.map(inp => inp.name);
            setNewSchool({
                ...newSchool,
                school_evaluations_recommended: {
                    ...newSchool.school_evaluations_recommended,
                    school_evaluations_recommended_notes: field.notes ? field.notes : newSchool.school_evaluations_recommended.school_evaluations_recommended_notes,
                },
                edited_school_evaluations_recommended: {
                    ...field,
                    isEditMode: false,
                    input: field.input === originalField.input ? null : field.input,
                    prev: field.input === originalField.input ? null : field.input,
                    edited_school_minimum_number_of_evaluations_recommended: {
                        ...field.edited_school_minimum_number_of_evaluations_recommended,
                        input: field.edited_school_minimum_number_of_evaluations_recommended.input === originalField.school_minimum_number_of_evaluations_recommended ? null : field.edited_school_minimum_number_of_evaluations_recommended.input,
                        prev: field.edited_school_minimum_number_of_evaluations_recommended.input === originalField.school_minimum_number_of_evaluations_recommended ? null : field.edited_school_minimum_number_of_evaluations_recommended.input,
                    },
                    edited_school_minimum_time_evaluator_knows_applicant: {
                        ...field.edited_school_minimum_time_evaluator_knows_applicant,
                        input: field.edited_school_minimum_time_evaluator_knows_applicant.input === originalField.school_minimum_time_evaluator_knows_applicant ? null : field.edited_school_minimum_time_evaluator_knows_applicant.input,
                        prev: field.edited_school_minimum_time_evaluator_knows_applicant.input === originalField.school_minimum_time_evaluator_knows_applicant ? null : field.edited_school_minimum_time_evaluator_knows_applicant.input,
                    },
                    edited_school_optional_evaluators_recommended: {
                        ...field.edited_school_optional_evaluators_recommended,
                        input: field.edited_school_optional_evaluators_recommended.input,
                        prev: field.edited_school_optional_evaluators_recommended.input,
                    },
                    edited_school_recommended_evaluator_title: {
                        ...field.edited_school_recommended_evaluator_title,
                        input: field.edited_school_recommended_evaluator_title.input,
                        prev: field.edited_school_recommended_evaluator_title.input,
                    }
                }
            })
        }
    } else {
        if (name === 'edited_school_evaluations_required') {
            const field = newSchool.edited_school_evaluations_required;
            const originalField = newSchool.school_evaluations_required;
            const correctList = field.edited_school_optional_evaluators_required.input && field.edited_school_optional_evaluators_required.input.filter(inp => inp.isCorrect);
            const correctTitles = field.edited_school_required_evaluator_title.input && field.edited_school_required_evaluator_title.input.filter(inp => inp.isCorrect);
                setNewSchool({
                    ...newSchool,
                    school_evaluations_required: {
                        ...originalField,
                        input: field.input === null ? originalField.input : field.input,
                        school_evaluations_required_notes: field.notes ? field.notes : newSchool.school_evaluations_required.school_evaluations_required_notes,
                        school_minimum_number_of_evaluations_required: field.edited_school_minimum_number_of_evaluations_required.input === null ? originalField.school_minimum_number_of_evaluations_required : field.edited_school_minimum_number_of_evaluations_required.input,
                        school_minimum_time_evaluator_knows_applicant: field.edited_school_minimum_time_evaluator_knows_applicant.input === null ? originalField.school_minimum_time_evaluator_knows_applicant : field.edited_school_minimum_time_evaluator_knows_applicant.input,
                        school_optional_evaluators_required: correctList ? correctList.map(opt => ({
                            school_minimum_number_of_evaluators_required_in_group: opt.school_minimum_number_of_evaluators_required_in_group,
                            school_required_optional_group_evaluator_title: opt.school_required_optional_group_evaluator_title.filter(title => title.isCorrect).map(title => title.name),
                            school_minimum_time_evaluator_knows_applicant: opt.school_minimum_time_evaluator_knows_applicant,
                        })) : originalField.school_optional_evaluators_required,
                        school_required_evaluator_title: correctTitles ? correctTitles.map(opt => opt.name) : originalField.school_required_evaluator_title,
                    },
                    edited_school_evaluations_required: {
                        link: '',
                        isEditMode: false,
                        input: null,
                        prev: null,
                        notes: null,
                        edited_school_minimum_number_of_evaluations_required: {
                            input: null,
                            prev: null,
                        },
                        edited_school_minimum_time_evaluator_knows_applicant: {
                            input: null,
                            prev: null,
                        },
                        edited_school_optional_evaluators_required: {
                            input: null,
                            prev: null,
                        },
                        edited_school_required_evaluator_title: {
                            input: null,
                            prev: null,
                        },
                    }
                })
            
        } else if (name === 'edited_school_evaluations_recommended') {
            const field = newSchool.edited_school_evaluations_recommended;
            const originalField = newSchool.school_evaluations_recommended;
            const correctList = newSchool.edited_school_evaluations_recommended.edited_school_optional_evaluators_recommended.input!.filter(inp => inp.isCorrect)
            const correctTitles = newSchool.edited_school_evaluations_recommended.edited_school_recommended_evaluator_title.input!.filter(inp => inp.isCorrect)
            setNewSchool({
                ...newSchool,
                school_evaluations_recommended: {
                    ...originalField,
                    input: field.input === null ? originalField.input : field.input,
                    school_evaluations_recommended_notes: field.notes ? field.notes : newSchool.school_evaluations_recommended.school_evaluations_recommended_notes,
                    school_minimum_number_of_evaluations_recommended: field.edited_school_minimum_number_of_evaluations_recommended.input === null ? originalField.school_minimum_number_of_evaluations_recommended : field.edited_school_minimum_number_of_evaluations_recommended.input,
                    school_minimum_time_evaluator_knows_applicant: field.edited_school_minimum_time_evaluator_knows_applicant.input === null ? originalField.school_minimum_time_evaluator_knows_applicant : field.edited_school_minimum_time_evaluator_knows_applicant.input,
                    school_optional_evaluators_recommended: field.edited_school_optional_evaluators_recommended.input ? correctList.map(list => ({
                        school_minimum_number_evaluators_recommended_in_group: list.school_minimum_number_evaluators_recommended_in_group,
                        school_recommended_optional_group_evaluator_title: list.school_recommended_optional_group_evaluator_title.filter(title => title.isCorrect).map(title => title.name),
                        school_minimum_time_evaluator_knows_applicant: list.school_minimum_time_evaluator_knows_applicant,
                    })) : originalField.school_optional_evaluators_recommended,
                    school_recommended_evaluator_title: field.edited_school_recommended_evaluator_title.input ? correctTitles.map(title => title.name) : originalField.school_recommended_evaluator_title,
                },
                edited_school_evaluations_recommended: {
                    isEditMode: false,
                    input: null,
                    prev: null,
                    link: '',
                    notes: null,
                    edited_school_minimum_number_of_evaluations_recommended: {
                        input: null,
                        prev: null,
                    },
                    edited_school_minimum_time_evaluator_knows_applicant: {
                        input: null,
                        prev: null,
                    },
                    edited_school_optional_evaluators_recommended: {
                        input: null,
                        prev: null,
                    },
                    edited_school_recommended_evaluator_title: {
                        input: null,
                        prev: null,
                    },
                }
            })
        }
    }

}


export const undoEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_evaluations_required') {
        const field = newSchool.edited_school_evaluations_required;
        setNewSchool({
            ...newSchool,
            edited_school_evaluations_required: {
                ...field,
                isEditMode: false,
                input: field.prev,
                prev: null,
                edited_school_minimum_number_of_evaluations_required: {
                    ...field.edited_school_minimum_number_of_evaluations_required,
                    input: field.edited_school_minimum_number_of_evaluations_required.prev,
                    prev: null,
                },
                edited_school_minimum_time_evaluator_knows_applicant: {
                    ...field.edited_school_minimum_time_evaluator_knows_applicant,
                    input: field.edited_school_minimum_time_evaluator_knows_applicant.prev,
                    prev: null,
                },
                edited_school_optional_evaluators_required: {
                    ...field.edited_school_optional_evaluators_required,
                    input: field.edited_school_optional_evaluators_required.prev,
                    prev: null,
                },
                edited_school_required_evaluator_title: {
                    ...field.edited_school_required_evaluator_title,
                    input: field.edited_school_required_evaluator_title.prev,
                    prev: null,
                }
            }
        })
    } else if (name === 'edited_school_evaluations_recommended') {
        const field = newSchool.edited_school_evaluations_recommended;
        setNewSchool({
            ...newSchool,
            edited_school_evaluations_recommended: {
                ...field,
                isEditMode: false,
                input: field.prev,
                prev: null,
                edited_school_minimum_number_of_evaluations_recommended: {
                    ...field.edited_school_minimum_number_of_evaluations_recommended,
                    input: field.edited_school_minimum_number_of_evaluations_recommended.prev,
                    prev: null,
                },
                edited_school_minimum_time_evaluator_knows_applicant: {
                    ...field.edited_school_minimum_time_evaluator_knows_applicant,
                    input: field.edited_school_minimum_time_evaluator_knows_applicant.prev,
                    prev: null,
                },
                edited_school_optional_evaluators_recommended: {
                    ...field.edited_school_optional_evaluators_recommended,
                    input: field.edited_school_optional_evaluators_recommended.prev,
                    prev: null,
                },
                edited_school_recommended_evaluator_title: {
                    ...field.edited_school_recommended_evaluator_title,
                    input: field.edited_school_recommended_evaluator_title.prev,
                    prev: null,
                }
            }
        })
    }
}


export const revertEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_evaluations_required') {
        setNewSchool({
            ...newSchool,
            edited_school_evaluations_required: {
                link: '',
                isEditMode: false,
                input: null,
                prev: null,
                notes: null,
                edited_school_minimum_number_of_evaluations_required: {
                    input: null,
                    prev: null,
                },
                edited_school_minimum_time_evaluator_knows_applicant: {
                    input: null,
                    prev: null,
                },
                edited_school_optional_evaluators_required: {
                    input: null,
                    prev: null,
                },
                edited_school_required_evaluator_title: {
                    input: null,
                    prev: null,
                },
            }
        })
    } else if (name === 'edited_school_evaluations_recommended') {
        setNewSchool({
            ...newSchool,
            edited_school_evaluations_recommended: {
                isEditMode: false,
                input: null,
                prev: null,
                link: '',
                notes: null,
                edited_school_minimum_number_of_evaluations_recommended: {
                    input: null,
                    prev: null,
                },
                edited_school_minimum_time_evaluator_knows_applicant: {
                    input: null,
                    prev: null,
                },
                edited_school_optional_evaluators_recommended: {
                    input: null,
                    prev: null,
                },
                edited_school_recommended_evaluator_title: {
                    input: null,
                    prev: null,
                },
            }
        })
    }
}
