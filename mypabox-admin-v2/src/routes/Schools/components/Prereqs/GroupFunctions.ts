import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School} from "../../../../types/schools.types";



export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_prereq_required_courses') {
        const field = newSchool.edited_school_prereq_required_courses;
        const originalField = newSchool.school_prereq_required_courses.courses;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                notes: field.notes === null ? newSchool.school_prereq_required_courses.notes : field.notes,
                input: field.input === null ? originalField.map(field => ({
                    school_required_course_id: field.school_required_course_id,
                    school_required_course_lab: field.school_required_course_lab,
                    school_required_course_lab_preferred: field.school_required_course_lab_preferred,
                    school_required_course_credit_hours: field.school_required_course_credit_hours,
                    school_required_course_quarter_hours: field.school_required_course_quarter_hours,
                    school_required_course_note_section: field.school_required_course_note_section,
                    isCorrect: true,
                    isNew: false,
                })) : field.input,
            }
        })
    } else if (name === 'edited_school_prereq_recommended_courses') {
        const field = newSchool.edited_school_prereq_recommended_courses;
        const originalField = newSchool.school_prereq_recommended_courses;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                input: field.input === null ? originalField.map(field => ({
                    school_recommended_course_id: field.school_recommended_course_id,
                    school_recommended_course_lab: field.school_recommended_course_lab,
                    school_recommended_course_lab_preferred: field.school_recommended_course_lab_preferred,
                    school_recommended_course_credit_hours: field.school_recommended_course_credit_hours,
                    school_recommended_course_quarter_hours: field.school_recommended_course_quarter_hours,
                    school_recommended_course_note_section: field.school_recommended_course_note_section,
                    isCorrect: true,
                    isNew: false,
                })) : field.input,
            }
        })
    } else if (name === 'edited_school_prereq_required_optional_courses') {
        const field = newSchool.edited_school_prereq_required_optional_courses;
        const originalField = newSchool.school_prereq_required_optional_courses;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                input: field.input === null ? originalField.map(field => ({
                    school_minimum_number_of_courses_to_be_completed: field.school_minimum_number_of_courses_to_be_completed,
                    school_required_optional_courses_list: field.school_required_optional_courses_list.map(list => ({
                        school_optional_course_id: list.school_optional_course_id,
                        school_optional_course_lab: list.school_optional_course_lab,
                        school_optional_course_lab_preferred: list.school_optional_course_lab_preferred,
                        school_optional_course_credit_hours: list.school_optional_course_credit_hours,
                        school_optional_course_quarter_hours: list.school_optional_course_quarter_hours,
                        school_optional_course_note_section: list.school_optional_course_note_section,
                        isCorrect: true,
                        isNew: false,
                    })),
                    school_optional_course_note_section: field.school_optional_course_note_section,
                    isCorrect: true,
                    isNew: false,
                })) : field.input,
            }
        })
    } else if (name === 'edited_school_prereq_required_course_categories') {
        const field = newSchool.edited_school_prereq_required_course_categories;
        const originalField = newSchool.school_prereq_required_course_categories;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                input: field.input === null ? originalField.map(field => ({
                    school_required_course_category: field.school_required_course_category,
                    school_required_course_category_number_of_credits_need_to_be_completed: field.school_required_course_category_number_of_credits_need_to_be_completed,
                    school_required_course_category_number_of_quarter_hours_need_to_be_completed: field.school_required_course_category_number_of_quarter_hours_need_to_be_completed,
                    school_required_course_category_number_of_courses_that_need_lab: field.school_required_course_category_number_of_courses_that_need_lab,
                    school_required_course_category_extra_included_courses: field.school_required_course_category_extra_included_courses.map(list => ({
                        school_required_course_id: list.school_required_course_id,
                        school_required_course_note: list.school_required_course_note,
                        isCorrect: true,
                        isNew: false,
                    })),
                    school_required_course_category_excluded_courses: field.school_required_course_category_excluded_courses.map(list => ({
                        school_required_course_id: list.school_required_course_id,
                        school_required_course_note: list.school_required_course_note,
                        isCorrect: true,
                        isNew: false,
                    })),
                    school_required_course_category_note_section: field.school_required_course_category_note_section,
                    isCorrect: true,
                    isNew: false,
                })) : field.input,
            }
        })
    }
}


export const confirmEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (!original) {
        if (name === 'edited_school_prereq_required_courses') {
            const field = newSchool.edited_school_prereq_required_courses;
            const editedArray = field.input && field.input.map(inp => ({
                school_required_course_id: inp.school_required_course_id,
                school_required_course_lab: inp.school_required_course_lab,
                school_required_course_lab_preferred: inp.school_required_course_lab_preferred,
                school_required_course_credit_hours: inp.school_required_course_credit_hours,
                school_required_course_quarter_hours: inp.school_required_course_quarter_hours,
                school_required_course_note_section: inp.school_required_course_note_section,
            }))
            setNewSchool({
                ...newSchool,
                school_prereq_required_courses: {
                    ...newSchool.school_prereq_required_courses,
                    notes: field.notes ? field.notes : newSchool.school_prereq_required_courses.notes,
                },
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: field.input,
                    prev: field.input,
                    notes: field.notes,
                }
            })
        } else if (name === 'edited_school_prereq_recommended_courses') {
            const field = newSchool.edited_school_prereq_recommended_courses;
            const editedArray = field.input && field.input.map(inp => ({
                school_recommended_course_id: inp.school_recommended_course_id,
                school_recommended_course_lab: inp.school_recommended_course_lab,
                school_recommended_course_lab_preferred: inp.school_recommended_course_lab_preferred,
                school_recommended_course_credit_hours: inp.school_recommended_course_credit_hours,
                school_recommended_course_quarter_hours: inp.school_recommended_course_quarter_hours,
                school_recommended_course_note_section: inp.school_recommended_course_note_section,
            }))
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: field.input,
                    prev: field.input,
                }
            })
        } else if (name === 'edited_school_prereq_required_optional_courses') {
            const field = newSchool.edited_school_prereq_required_optional_courses;
            const editedArray = field.input && field.input.map(inp => ({
                school_minimum_number_of_courses_to_be_completed: inp.school_minimum_number_of_courses_to_be_completed,
                school_required_optional_courses_list: inp.school_required_optional_courses_list.map(list => ({
                    school_optional_course_id: list.school_optional_course_id,
                    school_optional_course_lab: list.school_optional_course_lab,
                    school_optional_course_lab_preferred: list.school_optional_course_lab_preferred,
                    school_optional_course_credit_hours: list.school_optional_course_credit_hours,
                    school_optional_course_quarter_hours: list.school_optional_course_quarter_hours,
                    school_optional_course_note_section: list.school_optional_course_note_section,
                })),
                school_optional_course_note_section: inp.school_optional_course_note_section,
            }))
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: field.input,
                    prev: field.input,
                }
            })
        } else if (name === 'edited_school_prereq_required_course_categories') {
            const field = newSchool.edited_school_prereq_required_course_categories;
            const editedArray = field.input && field.input.map(inp => ({
                school_required_course_category: inp.school_required_course_category,
                school_required_course_category_number_of_credits_need_to_be_completed: inp.school_required_course_category_number_of_credits_need_to_be_completed,
                school_required_course_category_number_of_quarter_hours_need_to_be_completed: inp.school_required_course_category_number_of_quarter_hours_need_to_be_completed,
                school_required_course_category_number_of_courses_that_need_lab: inp.school_required_course_category_number_of_courses_that_need_lab,
                school_required_course_category_extra_included_courses: inp.school_required_course_category_extra_included_courses.map(list => ({
                    school_required_course_id: list.school_required_course_id,
                    school_required_course_note: list.school_required_course_note,
                })),
                school_required_course_category_excluded_courses: inp.school_required_course_category_excluded_courses.map(list => ({
                    school_required_course_id: list.school_required_course_id,
                    school_required_course_note: list.school_required_course_note,
                })),
                school_required_course_category_note_section: inp.school_required_course_category_note_section,
            }))
            setNewSchool({
                ...newSchool,
                [name]: {
                    ...field,
                    isEditMode: false,
                    input: field.input,
                    prev: field.input,
                }
            })
        }
    } else {
        if (name === 'edited_school_prereq_required_courses') {
            const field = newSchool.edited_school_prereq_required_courses;
            const originalField = newSchool.school_prereq_required_courses.courses;
            const correctList = field.input && field.input.filter(inp => inp.isCorrect);
            setNewSchool({
                ...newSchool,
                school_prereq_required_courses: {
                    ...newSchool.school_prereq_required_courses,
                    courses: correctList ? correctList.map(list => ({
                        school_required_course_id: list.school_required_course_id,
                        school_required_course_lab: list.school_required_course_lab,
                        school_required_course_lab_preferred: list.school_required_course_lab_preferred,
                        school_required_course_credit_hours: list.school_required_course_credit_hours,
                        school_required_course_quarter_hours: list.school_required_course_quarter_hours,
                        school_required_course_note_section: list.school_required_course_note_section,
                    })) : originalField,
                    notes: field.notes ? field.notes : newSchool.school_prereq_required_courses.notes,
                },
                [name]: {
                    link: '',
                    notes: null,
                    isEditMode: false,
                    input: null,
                    prev: null,
                }
            })
        } else if (name === 'edited_school_prereq_recommended_courses') {
            const field = newSchool.edited_school_prereq_recommended_courses;
            const originalField = newSchool.school_prereq_recommended_courses;
            const correctList = field.input && field.input.filter(inp => inp.isCorrect);
            setNewSchool({
                ...newSchool,
                school_prereq_recommended_courses: correctList ? correctList.map(list => ({
                    school_recommended_course_id: list.school_recommended_course_id,
                    school_recommended_course_lab: list.school_recommended_course_lab,
                    school_recommended_course_lab_preferred: list.school_recommended_course_lab_preferred,
                    school_recommended_course_credit_hours: list.school_recommended_course_credit_hours,
                    school_recommended_course_quarter_hours: list.school_recommended_course_quarter_hours,
                    school_recommended_course_note_section: list.school_recommended_course_note_section,
                })) : originalField,
                [name]: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    prev: null,
                }
            })
        } else if (name === 'edited_school_prereq_required_optional_courses') {
            const field = newSchool.edited_school_prereq_required_optional_courses;
            const originalField = newSchool.school_prereq_required_optional_courses;
            const correctList = field.input && field.input.filter(inp => inp.isCorrect);
            setNewSchool({
                ...newSchool,
                school_prereq_required_optional_courses: correctList ? correctList.map(list => ({
                    school_minimum_number_of_courses_to_be_completed: list.school_minimum_number_of_courses_to_be_completed,
                    school_required_optional_courses_list: list.school_required_optional_courses_list.filter(course => course.isCorrect).map(course => ({
                        school_optional_course_id: course.school_optional_course_id,
                            school_optional_course_lab: course.school_optional_course_lab,
                            school_optional_course_lab_preferred: course.school_optional_course_lab_preferred,
                            school_optional_course_credit_hours: course.school_optional_course_credit_hours,
                            school_optional_course_quarter_hours: course.school_optional_course_quarter_hours,
                            school_optional_course_note_section: course.school_optional_course_note_section,
                    })),
                    school_optional_course_note_section: list.school_optional_course_note_section,
                })) : originalField,
                [name]: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    prev: null,
                }
            })
        } else if (name === 'edited_school_prereq_required_course_categories') {
            const field = newSchool.edited_school_prereq_required_course_categories;
            const originalField = newSchool.school_prereq_required_course_categories;
            const correctList = field.input && field.input.filter(inp => inp.isCorrect);
            setNewSchool({
                ...newSchool,
                school_prereq_required_course_categories: correctList ? correctList.map(list => ({
                    school_required_course_category: list.school_required_course_category,
                    school_required_course_category_number_of_credits_need_to_be_completed: list.school_required_course_category_number_of_credits_need_to_be_completed,
                    school_required_course_category_number_of_quarter_hours_need_to_be_completed: list.school_required_course_category_number_of_quarter_hours_need_to_be_completed,
                    school_required_course_category_number_of_courses_that_need_lab: list.school_required_course_category_number_of_courses_that_need_lab,
                    school_required_course_category_extra_included_courses: list.school_required_course_category_extra_included_courses.filter(course => course.isCorrect).map(course => ({
                        school_required_course_id: course.school_required_course_id,
                        school_required_course_note: course.school_required_course_note,
                    })),
                    school_required_course_category_excluded_courses: list.school_required_course_category_excluded_courses.filter(course => course.isCorrect).map(course => ({
                        school_required_course_id: course.school_required_course_id,
                        school_required_course_note: course.school_required_course_note,
                    })),
                    school_required_course_category_note_section: list.school_required_course_category_note_section,
                })) : originalField,
                [name]: {
                    link: '',
                    isEditMode: false,
                    input: null,
                    prev: null,
                }
            })
        }
    }
}

export const revertEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_prereq_required_courses') {
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                notes: null,
                input: null,
                prev: null,
            }
        })
    } else if (name === 'edited_school_prereq_recommended_courses') {
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                prev: null,
            }
        })
    } else if (name === 'edited_school_prereq_required_optional_courses') {
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                prev: null,
            }
        })
    } else if (name === 'edited_school_prereq_required_course_categories') {
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: null,
                prev: null,
            }
        })
    }
}

export const undoEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_prereq_required_courses') {
        const field = newSchool.edited_school_prereq_required_courses;
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                notes: field.notes,
                input: field.prev,
                prev: null,
            }
        })
    } else if (name === 'edited_school_prereq_recommended_courses') {
        const field = newSchool.edited_school_prereq_recommended_courses;
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: field.prev,
                prev: null,
            }
        })
    } else if (name === 'edited_school_prereq_required_optional_courses') {
        const field = newSchool.edited_school_prereq_required_optional_courses;
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: field.prev,
                prev: null,
            }
        })
    } else if (name === 'edited_school_prereq_required_course_categories') {
        const field = newSchool.edited_school_prereq_required_course_categories;
        setNewSchool({
            ...newSchool,
            [name]: {
                link: '',
                isEditMode: false,
                input: field.prev,
                prev: null,
            }
        })
    }
}

