import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { NewNote, NewSchool } from "../../../../types/newSchools.types"
import { UserPermissions } from "../../../../types/users.types"
import { addModifyOrDeleteNote, isDraftOnly, isSchoolFieldDisabled, retrieveSelectedTab, SchoolField, setupValidationInterface, TabsAndIndices, unitOptions } from "../../../../utils/utils.schools";
import FieldContainer from "../../../../components/Form/Validation/FieldContainer";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import FieldNotes from "../../../../components/Form/Notes/FieldNotes";
import TextInput from "../../../../components/Form/InputTypes/TextInput";
import UpdatedTextSelectInput from "../../../../components/Form/InputTypes/UpdatedTextSelectInput";

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
    const { changes, link, original, draft } = patientCareExperience;
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

        const field = modifyDraftOnly ? school.school_patient_experience.draft.input[name as keyof object] 
            : school.school_patient_experience.original.input[name as keyof object] 
        
        setSchool({
            ...school,
            school_patient_experience: {
                ...school.school_patient_experience,
                original: modifyDraftOnly ? school.school_patient_experience.original : {
                    ...school.school_patient_experience.original,
                    input: {
                        ...school.school_patient_experience.original.input,
                        [name]: {
                            ...field as any,
                            input: checked,
                        }
                    }
                },
                draft: !modifyDraftOnly ? school.school_patient_experience.draft : {
                    ...school.school_patient_experience.draft,
                    input: {
                        ...school.school_patient_experience.draft.input,
                        [name]: {
                            ...field as any,
                            input: checked,
                        }
                    }
                },
            }
        })
    }

    const handleNotes = (name: string, newNote?: NewNote, index?: number) => {
        const modifyDraftOnly = isDraftOnly(isEditSchool, permissions);

        if (name === 'school_patient_experience') {
            const field = school.school_patient_experience;
            const updatedNotes = addModifyOrDeleteNote(
                modifyDraftOnly ? field.draft.notes : field.original.notes,
                newNote,
                index,
            );
            
            setSchool({
                ...school,
                school_patient_experience: {
                    ...field,
                    original: modifyDraftOnly ? field.original : {
                        ...field.original,
                        notes: updatedNotes,
                    },
                    draft: !modifyDraftOnly ? field.draft : {
                        ...field.draft,
                        notes: updatedNotes,
                    }
                }
            });
        } else {
            const field = modifyDraftOnly ? school.school_patient_experience.draft.input[name as keyof object] 
            : school.school_patient_experience.original.input[name as keyof object];

            const updatedNotes = addModifyOrDeleteNote(
                field,
                newNote,
                index,
            );

            setSchool({
                ...school,
                school_patient_experience: {
                    ...school.school_patient_experience,
                    original: modifyDraftOnly ? school.school_patient_experience.original : {
                        ...school.school_patient_experience.original,
                        input: {
                            ...school.school_patient_experience.original.input,
                            [name]: {
                                ...field as any,
                                notes: updatedNotes,
                            }
                        }
                    },
                    draft: !modifyDraftOnly ? school.school_patient_experience.draft : {
                        ...school.school_patient_experience.draft,
                        input: {
                            ...school.school_patient_experience.draft.input,
                            [name]: {
                                ...field as any,
                                notes: updatedNotes,
                            }
                        }
                    },
                }
            })
        }
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        const modifyDraftOnly = isDraftOnly(isEditSchool, permissions);

        const field = modifyDraftOnly ? school.school_patient_experience.draft.input[name as keyof object] 
            : school.school_patient_experience.original.input[name as keyof object] 
        
        setSchool({
            ...school,
            school_patient_experience: {
                ...school.school_patient_experience,
                original: modifyDraftOnly ? school.school_patient_experience.original : {
                    ...school.school_patient_experience.original,
                    input: {
                        ...school.school_patient_experience.original.input,
                        [name]: {
                            ...field as any,
                            input: value,
                        }
                    }
                },
                draft: !modifyDraftOnly ? school.school_patient_experience.draft : {
                    ...school.school_patient_experience.draft,
                    input: {
                        ...school.school_patient_experience.draft.input,
                        [name]: {
                            ...field as any,
                            input: value,
                        }
                    }
                },
            }
        })
    };

    const handleDuration = (inputType: "quantity" | "units", value: string | number, name: string) => {
        const modifyDraftOnly = isDraftOnly(isEditSchool, permissions);

        const field = modifyDraftOnly ? school.school_patient_experience.draft.input[name as keyof object] 
            : school.school_patient_experience.original.input[name as keyof object] 

        setSchool({
            ...school,
            school_patient_experience: {
                ...school.school_patient_experience,
                original: modifyDraftOnly ? school.school_patient_experience.original : {
                    ...school.school_patient_experience.original,
                    input: {
                        ...school.school_patient_experience.original.input,
                        [name]: {
                            ...field as any,
                            input: {
                                ...(field as any).input,
                                [inputType]: value,
                            }
                        }
                    }
                },
                draft: !modifyDraftOnly ? school.school_patient_experience.draft : {
                    ...school.school_patient_experience.draft,
                    input: {
                        ...school.school_patient_experience.draft.input,
                        [name]: {
                            ...field as any,
                            input: {
                                ...(field as any).input,
                                [inputType]: value,
                            }
                        }
                    }
                },
            }
        })
    }

    const tabsAndIndex = tabsAndIndices["school_patient_experience"];
    const tab = retrieveSelectedTab("school_patient_experience", tabsAndIndices);

    const isDisabled = isSchoolFieldDisabled(tabsAndIndex, isEditSchool, permissions, changes);
    const pceNotes = tab === "Original" ? original.notes : draft.notes;

    return (
        <FieldContainer
            name="school_patient_experience"
            changes={changes}
            permissions={permissions}
            label="Patient Care Experience (PCE) Required"
            tabsAndIndex={tabsAndIndices["school_patient_experience"]}
            modifyIndex={modifyIndex}
            link={link}
            school={school}
            setSchool={setSchool}
            validateAllRemovals={validateAllRemovals}
        >
        {fields.map(field => {
            const {
                name,
                label,
                original,
                draft,
                fieldType,
            } = field;

            const inputAndNotes = tab === 'Original' ? original : draft;

            if (inputAndNotes) {
                const { input, notes } = inputAndNotes;
                return (
                    <>
                        {fieldType === "boolean" ? (
                            <BooleanInput 
                                label={label}
                                name={name}
                                value={input}
                                path=""
                                handleCheck={handleBoolean}
                                isRequired={false}
                                isDisabled={isDisabled}
                                change={changes}
                                // validateIndividualChange={validateIndividualChange}
                                // revertIndividualChange={revertIndividualChange}
                                permissions={permissions}
                            />
                        ) : fieldType === "text" ? (
                            <TextInput 
                                label={label}
                                placeholder={label}
                                name={name}
                                value={input}
                                path=""
                                handleInput={handleInput}
                                isRequired={false}
                                type="text"
                                isDisabled={isDisabled}
                                change={changes}
                                // validateIndividualChange={validateIndividualChange}
                                // revertIndividualChange={revertIndividualChange}
                                permissions={permissions}
                            />
                        ) : fieldType === "text-select" ? (
                            <UpdatedTextSelectInput 
                                label={label}
                                placeholder="Quantity"
                                name={name}
                                value={input}
                                handleChange={handleDuration}
                                options={unitOptions}
                                isDisabled={isDisabled}
                                // validateIndividualChange={validateIndividualChange}
                                // revertIndividualChange={revertIndividualChange}
                                permissions={permissions}
                            />
                        ) : (
                            <></>
                        )}
                        {notes !== undefined && (
                            <FieldNotes 
                                notes={notes}
                                label={label}
                                isDisabled={isDisabled}
                                handleNotes={handleNotes}
                                name={name}
                                changes={changes}
                            />
                        )}
                    </>
                )
            } else {
                return null;
            }
            
        })}
        {pceNotes.length > 0 ? (
            <FieldNotes 
                notes={pceNotes}
                isDisabled={isDisabled}
                handleNotes={handleNotes}
                name="school_patient_experience"
                changes={changes}
            />
        ) : (
            <></>
        )}
        </FieldContainer>

    )
}