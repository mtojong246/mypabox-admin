import { Dispatch, MouseEvent, SetStateAction } from "react";
import { NewSchool, NoteInput } from "../types/newSchools.types";

interface GenericSchoolField {
    input: {
        original: any,
        draft: any,
        changes: any[],
    },
    notes?: NoteInput,
    link: string,
}

const useVerification = ({
    school,
    setSchool
}: {
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
}) => {


    const revertToOriginal = (e: MouseEvent<HTMLButtonElement>, name: string) => {
        e.preventDefault();
        let field = school[name as keyof NewSchool] as GenericSchoolField;

        field = {
            ...field,
            input: {
                ...field.input,
                draft: field.input.original,
                changes: [],
            }
        }

        if (field.notes) {
            field = {
                ...field,
                notes: {
                    ...field.notes,
                    draft: field.notes.original,
                    changes: [],
                }
            }
        }

        setSchool({
            ...school,
            [name]: field,
        })
        
    }

    const validateAllChanges = (e: MouseEvent<HTMLButtonElement>, name: string) => {
        e.preventDefault();

        let field = school[name as keyof NewSchool] as GenericSchoolField;

        field = {
            ...field,
            input: {
                ...field.input,
                original: field.input.draft,
                changes: [],
            }
        }

        if (field.notes) {
            field = {
                ...field,
                notes: {
                    ...field.notes,
                    original: field.notes.draft,
                    changes: [],
                }
            }
        }

        setSchool({
            ...school,
            [name]: field,
        })

    }

    return {
        revertToOriginal,
        validateAllChanges,
    }

};

export default useVerification;