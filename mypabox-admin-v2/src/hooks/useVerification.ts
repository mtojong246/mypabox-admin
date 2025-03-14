import { Dispatch, MouseEvent, SetStateAction } from "react";
import { Change, GenericSchoolField, NewSchool } from "../types/newSchools.types";


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
            draft: field.original,
            changes: [],
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
            original: field.draft,
            changes: [],
        }

        setSchool({
            ...school,
            [name]: field,
        })

    }

    const validateIndividualChanges = (e: MouseEvent<HTMLButtonElement>, name: string, path: string) => {
        e.preventDefault();

        let field = school[name as keyof NewSchool] as GenericSchoolField;

        const keys = path.split('.'); // Split the index string into keys
        let original = field.original;
        let draft = field.draft;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in original)) {
                console.log('path invalid');
            }
            original = original[keys[i]];
        }

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in draft)) {
                console.log('path invalid');
            }
            draft = draft[keys[i]];
        }

        original[keys[keys.length - 1]] = draft[keys[keys.length - 1]];
        
        setSchool({
            ...school,
            [name]: {
                original,
                draft,
                changes: field.changes.filter(change => change.path !== path),
            }
        })
    }

    return {
        revertToOriginal,
        validateAllChanges,
        validateIndividualChanges,
    }

};

export default useVerification;