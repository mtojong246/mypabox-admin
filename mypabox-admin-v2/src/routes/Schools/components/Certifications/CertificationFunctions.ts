import { MouseEvent, Dispatch, SetStateAction } from "react";
import { School, Note } from "../../../../types/schools.types";


export const enableEditModeGroup = (e: MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const field = newSchool.edited_school_certifications_required;
    const originalField = newSchool.school_certifications_required;
    setNewSchool({
        ...newSchool,
        edited_school_certifications_required: {
            ...field,
            input: field.input === null ? originalField.input : field.input,
            isEditMode: true,
            edited_school_certifications_required_options: {
                ...field.edited_school_certifications_required_options,
                input: field.edited_school_certifications_required_options.input === null ? originalField.school_certifications_required_options && originalField.school_certifications_required_options.map(option => ({
                    name: option,
                    isCorrect: true,
                    isNew: false,
                })) : field.edited_school_certifications_required_options.input,
            }
        }
    })
}

export const confirmEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, original?: string) => {
    e.preventDefault();;
    const field = newSchool.edited_school_certifications_required;
    const originalField = newSchool.school_certifications_required;
    if (!original) {
        setNewSchool({
            ...newSchool,
            edited_school_certifications_required: {
                ...field,
                input: field.input,
                prev: field.input,
                isEditMode: false,
                edited_school_certifications_required_options: {
                    input: field.edited_school_certifications_required_options.input,
                    prev: field.edited_school_certifications_required_options.input,
                }
            }
        })
    } else {
        const correctList = field.edited_school_certifications_required_options.input!.filter(opt => opt.isCorrect);
        if (correctList) {
            setNewSchool({
                ...newSchool,
                school_certifications_required: {
                    ...originalField,
                    input: field.input!,
                    school_certifications_required_options: field.edited_school_certifications_required_options.input ? correctList.map(opt => opt.name)
                     : originalField.school_certifications_required_options,
                },
                edited_school_certifications_required: {
                    input: null,
                    prev: null,
                    link :'',
                    isEditMode: false,
                    edited_school_certifications_required_options: {
                        input: null,
                        prev: null,
                    }

                }
            })
        }
    }

}


export const undoEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    const field = newSchool.edited_school_certifications_required;
    setNewSchool({
        ...newSchool,
        edited_school_certifications_required: {
            ...field,
            input: field.prev,
            prev: null,
            isEditMode: false,
            edited_school_certifications_required_options: {
                ...field.edited_school_certifications_required_options,
                input: field.edited_school_certifications_required_options.prev,
                prev: null,
            }
        }
    })
}

export const revertEditGroup = (e:MouseEvent<HTMLButtonElement>, newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>) => {
    e.preventDefault();
    setNewSchool({
        ...newSchool,
        edited_school_certifications_required: {
            input: null,
            prev: null,
            isEditMode: false,
            link: '',
            edited_school_certifications_required_options: {
                input: null,
                prev: null,
            }
        }
    })
}

