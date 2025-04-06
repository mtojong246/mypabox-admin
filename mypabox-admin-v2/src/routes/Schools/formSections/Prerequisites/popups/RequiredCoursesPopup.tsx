import { useEffect, useState } from "react";
import { GenericSchoolField, NewSchool } from "../../../../../types/newSchools.types";
import { PrereqArrItemType, PrereqPopupType } from "../Prerequisites";
import CoursePopup, { CourseForm } from "./CoursePopup";


export interface RequiredCourseType {
    school_required_course_id: string;
    school_required_course_lab: boolean;
    school_required_course_lab_preferred: boolean;
    school_required_course_credit_hours: number;
    school_required_course_quarter_hours: number;
    school_required_course_note_section: string;
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
    togglePopup: (e:React.MouseEvent<HTMLButtonElement>, type: PrereqPopupType | null, field?: { name: string, path: string, index?: number }, arrItem?: PrereqArrItemType) => void,
    selectedPrereqField: {
        name: string,
        path: string,
        index?: number,
    },
    selectedPrereqArrItem: PrereqArrItemType | null,
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
        originalDraftValue: any[] | undefined;
    },
    handleChanges: (field: GenericSchoolField, name: string, original: any, draft: any, path: string, type: "modified" | "added" | "removed", originalValue?: any, value?: any) => void,
    
}) {
    const [ selectedCourse, setSelectedCourse ] = useState<CourseForm | null>(null);

    useEffect(() => {
        if (selectedPrereqArrItem) {
            const arrItem = selectedPrereqArrItem as RequiredCourseType;
            setSelectedCourse({
                course_id: arrItem.school_required_course_id,
                course_lab: arrItem.school_required_course_lab,
                course_lab_preferred: arrItem.school_required_course_lab_preferred,
                course_credit_hours: arrItem.school_required_course_credit_hours,
                course_quarter_hours: arrItem.school_required_course_quarter_hours,
                course_note_section: arrItem.school_required_course_note_section,
            })
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

    const editRequiredCourse = (name: string, path: string, requiredCourse: RequiredCourseType, index: number) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const notePath = `${path}.${index}`;

        const {
            originalField,
            draftField,
            originalValue,
        } = handleModification(notePath, field, requiredCourse, 'modify');

        handleChanges(field, name, originalField, draftField, notePath, 'modified', originalValue, requiredCourse);

    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, course: CourseForm) => {
        e.preventDefault();
        const formattedCourse: RequiredCourseType = {
            school_required_course_id: course.course_id,
            school_required_course_lab: course.course_lab,
            school_required_course_lab_preferred: course.course_lab_preferred,
            school_required_course_credit_hours: course.course_credit_hours,
            school_required_course_quarter_hours: course.course_quarter_hours,
            school_required_course_note_section: course.course_note_section,
        }
        if (selectedPrereqArrItem && selectedPrereqField.index !== undefined) {
            editRequiredCourse(selectedPrereqField.name, selectedPrereqField.path, formattedCourse, selectedPrereqField.index);
        } else {
            addRequiredCourse(selectedPrereqField.name, selectedPrereqField.path, formattedCourse);
        }

        togglePopup(e, null);
    };

    return (
        <CoursePopup 
            selectedCourse={selectedCourse}
            togglePopup={togglePopup}
            handleSubmit={handleSubmit}
        />
    )
}