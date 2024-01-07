import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School} from "../../../../types/schools.types";



export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const name = `edited_${e.currentTarget.name}` as keyof School;
    if (name === 'edited_school_prereq_required_courses') {
        const field = newSchool.edited_school_prereq_required_courses;
        const originalField = newSchool.school_prereq_required_courses;
        setNewSchool({
            ...newSchool,
            [name]: {
                ...field,
                isEditMode: true,
                input: field.input === null ? originalField.map(og => ({
                    edited_school_required_course_credit_hours: og.school_required_course_credit_hours,
                    edited_school_required_course_id: og.school_required_course_id,
                    edited_school_required_course_lab: og.school_required_course_lab,
                    edited_school_required_course_lab_preferred: og.school_required_course_lab_preferred,
                    edited_school_required_course_quarter_hours: og.school_required_course_quarter_hours,
                    edited_school_required_course_note_section: og.school_required_course_note_section,
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
            const originalField = newSchool.school_prereq_required_courses;
            const correctList = field.input?.filter(inp => inp.isCorrect)
            if (correctList) {
                setNewSchool({
                    ...newSchool,
                    school_prereq_required_courses: field.input ? correctList.map(list => ({
                        school_required_course_credit_hours: list.edited_school_required_course_credit_hours,
                        school_required_course_id: list.edited_school_required_course_id,
                        school_required_course_lab: list.edited_school_required_course_lab,
                        school_required_course_lab_preferred: list.edited_school_required_course_lab_preferred,
                        school_required_course_note_section: list.edited_school_required_course_note_section,
                        school_required_course_quarter_hours: list.edited_school_required_course_quarter_hours
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
                ...field,
                isEditMode: false,
                input: field.prev,
                prev: null,
            }
        })
    }

}

