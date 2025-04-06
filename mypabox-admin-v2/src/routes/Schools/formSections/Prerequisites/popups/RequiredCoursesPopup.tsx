import { useEffect, useState } from "react";
import { GenericSchoolField, NewSchool } from "../../../../../types/newSchools.types";
import { PrereqArrItemType, PrereqPopupType } from "../Prerequisites";

export interface RequiredCourseType {
    school_required_course_id: string;
    school_required_course_lab: boolean;
    school_required_course_lab_preferred: boolean;
    school_required_course_credit_hours: number;
    school_required_course_quarter_hours: number;
    school_required_course_note_section: string;
}

const defaultForm: RequiredCourseType = {
    school_required_course_id: '',
    school_required_course_lab: false,
    school_required_course_lab_preferred: false,
    school_required_course_credit_hours: 0,
    school_required_course_quarter_hours: 0,
    school_required_course_note_section: '',
}

export default function RequiredCoursesPopup({
    school,
    togglePopup,
    selectedPrereqField,
    selectedPrereqArrItem,
    handleModification,
    handleChanges,
}: {
    school: NewSchool,
    togglePopup: (e:React.MouseEvent<HTMLButtonElement>, type: PrereqPopupType, field?: { name: string, path: string, index?: number }, arrItem?: PrereqArrItemType) => void,
    selectedPrereqField: {
        name: string,
        path: string,
        index?: number,
    } | null,
    selectedPrereqArrItem: PrereqArrItemType,
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
        originalDraftValue: any[] | undefined;
    },
    handleChanges: (field: GenericSchoolField, name: string, original: any, draft: any, path: string, type: "modified" | "added" | "removed", originalValue?: any, value?: any) => void,
    
}) {
    const [ form, setForm ] = useState<RequiredCourseType>(defaultForm);

    useEffect(() => {
        if (selectedPrereqArrItem) {
          setForm(selectedPrereqArrItem as RequiredCourseType);
        } else {
            setForm(defaultForm)
        }
    }, [selectedPrereqArrItem]);

    const addRequiredCourse = (name: string, path: string, requiredCourse: RequiredCourseType) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalDraftValue,
        } = handleModification(path, field, requiredCourse, 'add');

        const index = (originalDraftValue as RequiredCourseType[]).length;

        handleChanges(field, name, originalField, draftField, `${path}.${index}`, 'added');

    }

    const editNote = (name: string, path: string, requiredCourse: RequiredCourseType, index: number) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const notePath = `${path}.${index}`;

        const {
            originalField,
            draftField,
            originalValue,
        } = handleModification(notePath, field, requiredCourse, 'modify');

        handleChanges(field, name, originalField, draftField, notePath, 'modified', originalValue, requiredCourse);

    }


    return (
        <></>
    )
}