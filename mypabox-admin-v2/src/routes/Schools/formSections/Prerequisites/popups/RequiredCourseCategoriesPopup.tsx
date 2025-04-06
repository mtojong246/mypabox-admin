import { ChangeEvent, useEffect, useState } from "react";
import { GenericSchoolField, NewSchool, NewNote } from "../../../../../types/newSchools.types";
import { PrereqArrItemType, PrereqPopupType } from "../Prerequisites";

export interface RequiredCourseCategoryType {
    school_required_course_category: string;
    school_required_course_category_number_of_credits_need_to_be_completed: number;
    school_required_course_category_number_of_quarter_hours_need_to_be_completed: number;
    school_required_course_category_number_of_courses_that_need_lab: number;
    school_required_course_category_extra_included_courses: {
        school_required_course_id: string;
        school_required_course_note: string;
    }[],
    school_required_course_category_excluded_courses: {
        school_required_course_id: string;
        school_required_course_note: string;
    }[],
    notes: NewNote[];
}

export default function RequiredCourseCategoriesPopup({
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
    return (
        <></>
    )
}