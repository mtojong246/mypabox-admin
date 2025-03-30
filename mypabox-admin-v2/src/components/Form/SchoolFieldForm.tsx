
export default function SchoolFieldForm() {
    return (
        <></>
    )
}
// import { Dispatch, SetStateAction } from "react"
// import { GenericSchoolField, NewNote, NewSchool, SchoolFormField } from "../../types/newSchools.types";
// import NotePopup from "../Popups/NotePopup";
// import useSchoolNotes from "../../hooks/useSchoolNotes";
// import useVerification from "../../hooks/useVerification";
// import SchoolFieldContainer from "./Validation/SchoolFieldContainer";
// import SchoolFieldInputs from "./SchoolFieldInputs";

// const permissions = {
//     canEditWithVerificationNeeded: true,
//     canEditWithoutVerificationNeeded: false,
//     canVerify: false,
//     canMakeLive: false,
//     canAddOrDelete: false,
// };


// export default function SchoolFieldForm({
//     isEditSchool,
//     school,
//     setSchool,
//     formFields,
// }: {
//     isEditSchool: boolean,
//     school: NewSchool,
//     setSchool: Dispatch<SetStateAction<NewSchool>>,
//     formFields: SchoolFormField[],
// }) {
//     const {
//         toggleNote,
//         isNoteOpen,
//         selectedField,
//         selectedNote,
//         deleteNote,
//     } = useSchoolNotes({ school, setSchool });

//     const {
//         handleChanges,
//         handleModify,
//         handleAddition,
//         handleDeletion,
//         handleRetrieveValue,
//         validateIndividualChange,
//         revertIndividualChange
//     } = useVerification({ school, setSchool, isEditSchool, permissions });



//     return (
//         <>
//         {formFields.map(field => {
//             const schoolField = school[field.name as keyof NewSchool] as GenericSchoolField;
//             const inputs = handleRetrieveValue('.input', schoolField);
//             const value = inputs.originalValue;
//             const draftValue = inputs.originalDraftValue;

//             let noteValue: NewNote[] = [];
//             let draftNoteValue: NewNote[] = [];

//             if (field.notePath !== undefined) {
//                 const notes = handleRetrieveValue(field.notePath, schoolField);
//                 noteValue = notes.originalValue;
//                 draftNoteValue = notes.originalDraftValue;
//             }

//             return (
//                 <SchoolFieldContainer 
//                     label={field.label} 
//                     name={field.name}
//                     school={school}
//                     setSchool={setSchool}
//                     isEditSchool={isEditSchool}
//                     permissions={permissions}
//                     originalInputs={
//                         <SchoolFieldInputs 
//                             formType="original"
//                             school={school}
//                             formField={field}
//                             inputValue={value}
//                             noteValue={field.notePath !== undefined ? noteValue : undefined}
//                             toggleNote={toggleNote}
//                             deleteNote={deleteNote}
//                             handleRetrieveValue={handleRetrieveValue}
//                             handleModify={handleModify}
//                             handleChanges={handleChanges}
//                             validateIndividualChange={permissions.canVerify ? validateIndividualChange : undefined}
//                             revertIndividualChange={permissions.canVerify ? revertIndividualChange : undefined}
//                         />
//                     }
//                     modifiedInputs={
//                         <SchoolFieldInputs 
//                             formType="draft"
//                             school={school}
//                             formField={field}
//                             inputValue={draftValue}
//                             noteValue={field.notePath !== undefined ? draftNoteValue : undefined}
//                             toggleNote={toggleNote}
//                             deleteNote={deleteNote}
//                             handleRetrieveValue={handleRetrieveValue}
//                             handleModify={handleModify}
//                             handleChanges={handleChanges}
//                             validateIndividualChange={permissions.canVerify ? validateIndividualChange : undefined}
//                             revertIndividualChange={permissions.canVerify ? revertIndividualChange : undefined}
//                         />
//                     }
//                 />
//             )
//         })}

//         {isNoteOpen && selectedField && (
//             <NotePopup 
//                 toggleNotePopup={toggleNote}
//                 selectedField={selectedField}
//                 selectedNote={selectedNote}
//                 school={school}
//                 setSchool={setSchool}
//             />
//         )}
//         </>
//     )
// }