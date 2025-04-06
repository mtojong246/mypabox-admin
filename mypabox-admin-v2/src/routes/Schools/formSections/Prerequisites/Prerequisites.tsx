import { Dispatch, SetStateAction, useState } from "react"
import { GenericSchoolField, NewSchool } from "../../../../types/newSchools.types"

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import MinimumGradeAndTimeCriteriaAndBoolean from "./components/MinimumGradeAndTimeCriteriaAndBoolean";
import CompletionCriteria from "./components/CompletionCriteria";
import RequiredCoursesPopup, { RequiredCourseType } from "./popups/RequiredCoursesPopup";
import RequiredOptionalCoursesPopup, { RequiredOptionalCourseType } from "./popups/RequiredOptionalCoursesPopup";
import RequiredCourseCategoriesPopup, { RequiredCourseCategoryType } from "./popups/RequiredCourseCategoriesPopup";

export type PrereqPopupType = 'courses' | 'optional-courses' | 'course-categories' | null;
export type PrereqArrItemType = RequiredCourseType | RequiredOptionalCourseType | RequiredCourseCategoryType | null;

const permissions = {
    canEditWithVerificationNeeded: true,
    canEditWithoutVerificationNeeded: false,
    canVerify: false,
    canMakeLive: false,
    canAddOrDelete: false,
};



export default function Prerequisites({
    isEditSchool,
    school,
    setSchool,
}: {
    isEditSchool: boolean,
    school: NewSchool,
    setSchool: Dispatch<SetStateAction<NewSchool>>,
}) {
    const {
        toggleNote,
        isNoteOpen,
        selectedField,
        selectedNote,
    } = useSchoolNotes({ school, setSchool });

    const {
        handleChanges,
        handleModify,
        handleRetrieveValue,
        handleModification,
        revertIndividualChange,
        validateIndividualChange,
        checkIfValueHasBeenRemoved,
    } = useVerification({ school, setSchool, isEditSchool, permissions });

    const [ popupType, setPopupType ] = useState<PrereqPopupType>(null);
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const [ selectedPrereqField, setSelectedPrereqField ] = useState<{
        name: string,
        path: string,
        index?: number,
    } | null>(null);

    const [ selectedPrereqArrItem, setSelectedPrereqArrItem ] = useState<PrereqArrItemType>(null);

    const togglePopup = (e:React.MouseEvent<HTMLButtonElement>, type: PrereqPopupType, field?: { name: string, path: string, index?: number }, arrItem?: PrereqArrItemType) => {
        e.preventDefault();
        setIsPopupOpen(!isNoteOpen);

        setPopupType(type);

        if (field !== undefined) {
            setSelectedPrereqField(field);
        } else {
            setSelectedPrereqField(null);
        }

        if (arrItem !== undefined) {
            setSelectedPrereqArrItem(arrItem);
        } else {
            setSelectedPrereqArrItem(null);
        }
    };


    const handleQuill = (e: any, name: string, path: string) => {
        const value = e;

        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalValue 
        } = handleModify(path, field, value);
        
        handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

        
    };


    return (
        <>
        <MinimumGradeAndTimeCriteriaAndBoolean 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            toggleNote={toggleNote}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
        />
        <CompletionCriteria 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            checkIfValueHasBeenRemoved={checkIfValueHasBeenRemoved}
            toggleNote={toggleNote}
            handleModification={handleModification}
            revertIndividualChange={revertIndividualChange}
            validateIndividualChange={validateIndividualChange}
        />
        
        {/* <MinimumRequiredOrRecommendedGPA 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            handleModify={handleModify}
            deleteNote={deleteNote}
            toggleNote={toggleNote}
        />
        <OtherTypesAndSpecificCourses 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            handleModify={handleModify}
            handleAddition={handleAddition}
            handleDeletion={handleDeletion}
            deleteNote={deleteNote}
            toggleNote={toggleNote}
        />
        <AverageGPA 
            school={school}
            setSchool={setSchool}
            isEditSchool={isEditSchool}
            permissions={permissions}
            handleRetrieveValue={handleRetrieveValue}
            handleChanges={handleChanges}
            handleModify={handleModify}
            deleteNote={deleteNote}
            toggleNote={toggleNote}
        /> */}
        {/* {gpaFields.map(field => {
            const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;
            const inputs = handleRetrieveValue(field.path, schoolField);
            const value = inputs.originalValue;
            const draftValue = inputs.originalDraftValue;

            return (
                <Container 
                    label={field.label} 
                    name={field.name}
                    school={school}
                    setSchool={setSchool}
                    isEditSchool={isEditSchool}
                    permissions={permissions}
                    originalInputs={
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'text-area' ? (
                            <TextEditorInput 
                                label={field.label}
                                name={field.name}
                                value={value}
                                path={field.path}
                                handleQuill={handleQuill}
                                isRequired={false}
                            />
                        ) : (
                            <>
                            </>
                        )}
                        </div>
                    }

                    modifiedInputs={
                        <div className="flex flex-col gap-8 justify-start items-start">
                        {field.type === 'text-area' ? (
                            <TextEditorInput 
                                label={field.label}
                                name={field.name}
                                value={draftValue}
                                path={field.path}
                                handleQuill={handleQuill}
                                isRequired={false}
                            />
                        ) : (
                            <>
                            </>
                        )}
                        </div>
                    }
                />
            )
        })} */}
        {isNoteOpen && selectedField && (
            <NotePopup 
                toggleNotePopup={toggleNote}
                selectedField={selectedField}
                selectedNote={selectedNote}
                school={school}
                handleChanges={handleChanges}
                handleModification={handleModification}
            />
        )}

        {isPopupOpen && (
            <>
            {popupType === 'courses' ? (
                <RequiredCoursesPopup 
                    school={school}
                    togglePopup={togglePopup}
                    selectedPrereqArrItem={selectedPrereqArrItem}
                    selectedPrereqField={selectedPrereqField}
                    handleChanges={handleChanges}
                    handleModification={handleModification}
                />
            ) : popupType === 'optional-courses' ? (
                <RequiredOptionalCoursesPopup />
            ) : popupType === 'course-categories' ? (
                <RequiredCourseCategoriesPopup />
            ) : (
                <></>
            )}
            </>
        )}
        </>
    )
}