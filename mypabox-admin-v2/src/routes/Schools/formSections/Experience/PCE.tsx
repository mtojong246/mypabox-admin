import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { NewNote, NewSchool } from "../../../../types/newSchools.types"
import { UserPermissions } from "../../../../types/users.types"
import { addModifyOrDeleteNote, isDraftOnly, isSchoolFieldDisabled, retrieveSelectedTab, SchoolField, setupValidationInterface, TabsAndIndices } from "../../../../utils/utils.schools";
import FieldContainer from "../../../../components/Form/Validation/FieldContainer";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import FieldNotes from "../../../../components/Form/Notes/FieldNotes";

const defaultTabsAndIndices = {
    school_patient_experience: {
        tabs: [],
        selectedIndex: null,
    },
};

export default function PCE({
    isEditSchool,
    school,
    setSchool,
    showChangesOnly,
    permissions,
    patientCareExperience,
    validateAllRemovals,
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool | null>>,
    showChangesOnly: boolean,
    permissions: UserPermissions,
    patientCareExperience: any,
    validateAllRemovals?: (name: string) => {input: any; notes?: NewNote[] | undefined},
}) {
    const { changes, link } = patientCareExperience;
    const [ tabsAndIndices, setTabsAndIndices ] = useState<TabsAndIndices>(defaultTabsAndIndices);

    useEffect(() => {
        const updatedTabs = setupValidationInterface(defaultTabsAndIndices, permissions, changes);
        setTabsAndIndices(updatedTabs);

    }, [changes, permissions]);

    const modifyIndex = (name: string, newIndex: number) => {
        const tabAndIndex = tabsAndIndices[name];
        setTabsAndIndices({
            ...tabsAndIndices,
            [name]: {
                ...tabAndIndex,
                selectedIndex: newIndex,
            }
        })
    } 

    const fields: SchoolField[] = useMemo(() => {
        return [
            {
                name: 'school_patient_experience_required',
                label: 'PCE Required',
                original: school.school_patient_experience.original.input.school_patient_experience_required,
                draft: school.school_patient_experience.draft.input.school_patient_experience_required,
                fieldType: "boolean",
            },
            {
                name: 'school_minimum_patient_care_experience_hours_required',
                label: 'Minimum PCE Hours Required',
                original: school.school_patient_experience.original.input.school_minimum_patient_care_experience_hours_required,
                draft: school.school_patient_experience.draft.input.school_minimum_patient_care_experience_hours_required,
                fieldType: "text",
            },
            {
                name: 'school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required',
                label: 'Required Minimum Time Frame PCE Needs To Be Completed',
                original: school.school_patient_experience.original.input.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required,
                draft: school.school_patient_experience.draft.input.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required,
                fieldType: "text-select",
            },
            {
                name: 'school_patient_experience_recommended',
                label: "PCE Recommended",
                original: school.school_patient_experience.original.input.school_patient_experience_recommended,
                draft: school.school_patient_experience.draft.input.school_patient_experience_recommended,
                fieldType: "boolean",
            },
            {
                name: 'school_minimum_patient_care_experience_hours_recommended',
                label: "Minimum PCE Hours Recommended",
                original: school.school_patient_experience.original.input.school_minimum_patient_care_experience_hours_recommended,
                draft: school.school_patient_experience.draft.input.school_minimum_patient_care_experience_hours_recommended,
                fieldType: "text",
            },
            {
                name: 'school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended',
                label: 'Recommended Minimum Time Frame PCE Needs To Be Completed',
                original: school.school_patient_experience.original.input.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended,
                draft: school.school_patient_experience.draft.input.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended,
                fieldType: "text-select",
            },
            {
                name: 'school_average_patient_care_experience_hours_accepted_previous_cycle',
                label: "Average PCE Hours Accepted Previous Cycle",
                original: school.school_patient_experience.original.input.school_average_patient_care_experience_hours_accepted_previous_cycle,
                draft: school.school_patient_experience.draft.input.school_average_patient_care_experience_hours_accepted_previous_cycle,
                fieldType: "text",
            }
        ]
    }, [school]);

    const handleBoolean = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const checked = e.target.checked;

        const modifyDraftOnly = isDraftOnly(isEditSchool, permissions);
        
        if (name === "school_paid_experience_required") {
            setSchool({
                ...school,
                school_paid_experience_required: {
                    ...school.school_paid_experience_required,
                    original: modifyDraftOnly ? school.school_paid_experience_required.original : {
                        ...school.school_paid_experience_required.original,
                        input: checked,
                    },
                    draft: !modifyDraftOnly ? school.school_paid_experience_required.draft : {
                        ...school.school_paid_experience_required.draft,
                        input: checked,
                    }
                }
            })
        }
    }

    const handleNotes = (name: string, newNote?: NewNote, index?: number) => {
        const modifyDraftOnly = isDraftOnly(isEditSchool, permissions);

        if (name === 'school_paid_experience_required') {
            const field = school.school_paid_experience_required;
            const updatedNotes = addModifyOrDeleteNote(
                modifyDraftOnly ? field.draft.notes : field.original.notes,
                newNote,
                index,
            );
            
            setSchool({
                ...school,
                school_paid_experience_required: {
                    ...field,
                    original: modifyDraftOnly ? field.original : {
                        ...field.original,
                        notes: updatedNotes
                    },
                    draft: !modifyDraftOnly ? field.draft : {
                        ...field.draft,
                        notes: updatedNotes,
                    }
                }
            });

        }
    }
    return (
        <></>
    )
}