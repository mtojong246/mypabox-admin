import { ChangeEvent, useEffect, useState } from "react";
import { GenericSchoolField, NewSchool } from "../../../../../types/newSchools.types";
import { PrereqArrItemType, PrereqPopupType } from "../Prerequisites";
import CoursePopup, { CourseForm } from "./CoursePopup";
import { UserPermissions } from "../../../../../types/users.types";
import { defaultCourseForm } from "./RequiredCoursesPopup";

export interface RecommendedCourseType {
    school_recommended_course_id: string;
    school_recommended_course_lab: boolean;
    school_recommended_course_lab_preferred: boolean;
    school_recommended_course_credit_hours: number;
    school_recommended_course_quarter_hours: number;
    school_recommended_course_note_section: string;
}

export default function RecommendedCoursePopup({
    school,
    togglePopup,
    selectedPrereqField,
    selectedPrereqArrItem,
    handleModification,
    handleChanges,
    permissions,
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
    permissions: UserPermissions
}) {
    const [ selectedCourse, setSelectedCourse ] = useState<CourseForm>(defaultCourseForm);

    useEffect(() => {
        if (selectedPrereqArrItem) {
            const arrItem = selectedPrereqArrItem as RecommendedCourseType;
            setSelectedCourse({
                course_id: arrItem.school_recommended_course_id,
                course_lab: arrItem.school_recommended_course_lab,
                course_lab_preferred: arrItem.school_recommended_course_lab_preferred,
                course_credit_hours: arrItem.school_recommended_course_credit_hours,
                course_quarter_hours: arrItem.school_recommended_course_quarter_hours,
                course_note_section: arrItem.school_recommended_course_note_section,
            })
        } else {
            setSelectedCourse(defaultCourseForm);
        }
    }, [selectedPrereqArrItem]);

    const addRecommendedCourse = (name: string, path: string, recommendedCourse: RecommendedCourseType) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalDraftValue,
        } = handleModification(path, field, recommendedCourse, 'add');

        const index = (originalDraftValue as RecommendedCourseType[]).length;

        handleChanges(field, name, originalField, draftField, `${path}.${index}`, 'added');

    }

    const editRecommendedCourse = (name: string, path: string, recommendedCourse: RecommendedCourseType, index: number) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const notePath = `${path}.${index}`;

        const {
            originalField,
            draftField,
            originalValue,
        } = handleModification(notePath, field, recommendedCourse, 'modify');

        handleChanges(field, name, originalField, draftField, notePath, 'modified', originalValue, recommendedCourse);

    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>, course: CourseForm) => {
        e.preventDefault();
        const formattedCourse: RecommendedCourseType = {
            school_recommended_course_id: course.course_id,
            school_recommended_course_lab: course.course_lab,
            school_recommended_course_lab_preferred: course.course_lab_preferred,
            school_recommended_course_credit_hours: course.course_credit_hours,
            school_recommended_course_quarter_hours: course.course_quarter_hours,
            school_recommended_course_note_section: course.course_note_section,
        }
        if (selectedPrereqArrItem && selectedPrereqField.index !== undefined) {
            editRecommendedCourse(selectedPrereqField.name, selectedPrereqField.path, formattedCourse, selectedPrereqField.index);
        } else {
            addRecommendedCourse(selectedPrereqField.name, selectedPrereqField.path, formattedCourse);
        }

        togglePopup(e, null);
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.value;

        setSelectedCourse((prevCourse) => {
            return {
                ...prevCourse,
                [name]: value,
            }
        })
    };

    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const checked = e.target.checked;

        setSelectedCourse((prevCourse) => {
            return {
                ...prevCourse,
                [name]: checked,
            }
        })
    };

    const handleSelect = (e:any, name: string, path: string) => {
        const value = e.value;

        setSelectedCourse((prevCourse) => {
            return {
                ...prevCourse,
                [name]: value,
            }
        })
    }

    const handleNote = (e:any) => {
        let note = '';
        if (e === '<p><br></p>') {
            note = '';
        } else {
            note = e
        }
        setSelectedCourse((prevCourse) => {
            return {
                ...prevCourse,
                course_note_section: note,
            }
        })
    };

    return (
        <CoursePopup 
            selectedCourse={selectedCourse}
            togglePopup={togglePopup}
            handleSubmit={handleSubmit}
            permissions={permissions}
            handleBoolean={handleBoolean}
            handleInput={handleInput}
            handleNote={handleNote}
            handleSelect={handleSelect}
        />
    )
}