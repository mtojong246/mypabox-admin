import { Dispatch, SetStateAction } from "react"
import { GenericSchoolField, NewSchool } from "../../../../types/newSchools.types"

import useSchoolNotes from "../../../../hooks/useSchoolNotes";
import NotePopup from "../../../../components/Popups/NotePopup";
import useVerification from "../../../../hooks/useVerification";
import Container from "../../../../components/Form/Validation/Container";
import TextEditorInput from "../../../../components/Form/InputTypes/TextEditorInput";
import MinimumGradeAndTimeCriteriaAndBoolean from "./components/MinimumGradeAndTimeCriteriaAndBoolean";
import CompletionCriteria from "./components/CompletionCriteria";



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
        deleteNote,
    } = useSchoolNotes({ school, setSchool });

    const {
        handleChanges,
        handleModify,
        handleAddition,
        handleDeletion,
        handleRetrieveValue,
    } = useVerification({ school, setSchool, isEditSchool, permissions });

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
            handleModify={handleModify}
            deleteNote={deleteNote}
            toggleNote={toggleNote}
        />
        <CompletionCriteria 
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
                setSchool={setSchool}
            />
        )}
        </>
    )
}