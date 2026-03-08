import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { NewNote, NewSchool } from "../../../../types/newSchools.types"
import { UserPermissions } from "../../../../types/users.types"
import { addModifyOrDeleteNote, isDraftOnly, isSchoolFieldDisabled, retrieveSelectedTab, setupValidationInterface, TabsAndIndices } from "../../../../utils/utils.schools";
import FieldContainer from "../../../../components/Form/Validation/FieldContainer";
import BooleanInput from "../../../../components/Form/InputTypes/BooleanInput";
import FieldNotes from "../../../../components/Form/Notes/FieldNotes";

const defaultTabsAndIndices = {
    school_paid_experience_required: {
        tabs: [],
        selectedIndex: null,
    }
};


export default function PaidExperience({
    isEditSchool,
    school,
    setSchool,
    showChangesOnly,
    permissions,
    paidExperience,
    validateAllRemovals,
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool | null>>,
    showChangesOnly: boolean,
    permissions: UserPermissions,
    paidExperience: any,
    validateAllRemovals?: (name: string) => {input: any; notes?: NewNote[] | undefined},
}) {
    const { changes, link } = paidExperience;
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

    const fields: any[] = useMemo(() => {
        return [
            {
                name: 'school_paid_experience_required',
                label: 'Paid Experience Required',
                original: school.school_paid_experience_required.original,
                draft: school.school_paid_experience_required.draft,
                fieldType: "boolean",
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
        <>
        {fields.map(field => {
            const {
                name,
                label,
                original,
                draft,
                fieldType,
            } = field;

            const tabsAndIndex = tabsAndIndices[name];
            const tab = retrieveSelectedTab(name, tabsAndIndices);

            const isDisabled = isSchoolFieldDisabled(tabsAndIndex, isEditSchool, permissions, changes);

            const {
                input,
                notes
            } = tab === 'Original' ? original : draft;

            return (
                <FieldContainer
                    name={name}
                    changes={changes}
                    permissions={permissions}
                    label={label}
                    tabsAndIndex={tabsAndIndex}
                    modifyIndex={modifyIndex}
                    link={link}
                    school={school}
                    setSchool={setSchool}
                    validateAllRemovals={validateAllRemovals}
                >
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
                    ) : (
                        <></>
                    )}
                    {notes !== undefined && (
                        <FieldNotes 
                            notes={notes}
                            isDisabled={isDisabled}
                            handleNotes={handleNotes}
                            name={name}
                            changes={changes}
                        />
                    )}
                    </>
                </FieldContainer>
            )
        })}
        </>
    )
}