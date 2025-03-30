export default function SchoolFieldInputs() {
    return (
        <></>
    )
}

// import { Change, GenericSchoolField, NewNote, NewSchool, SchoolFormField } from "../../types/newSchools.types";
// import BooleanInput from "./InputTypes/BooleanInput";
// import SelectInput from "./InputTypes/SelectInput";
// import TextEditorInput from "./InputTypes/TextEditorInput";
// import TextInput from "./InputTypes/TextInput";
// import Notes from "./Notes/Notes";
// import { MouseEvent, ChangeEvent, useState, useEffect } from "react";

// import { ReactComponent as DollarSignIcon } from '../Icons/Dollar-Sign.svg';
// import { ReactComponent as PercentageIcon } from '../Icons/Percent.svg';

// const fieldsWithLinks = [
//     'school_website'
// ];

// export default function SchoolFieldInputs({
//     formType,
//     school,
//     formField,
//     inputValue,
//     noteValue,
//     toggleNote,
//     deleteNote,
//     handleRetrieveValue,
//     handleModify,
//     handleChanges,
//     validateIndividualChange,
//     revertIndividualChange,

// }: {
//     formType: 'original' | 'draft',
//     school: NewSchool,
//     formField: SchoolFormField,
//     inputValue: any,
//     noteValue?: NewNote[],
//     toggleNote: (
//         e:MouseEvent<HTMLButtonElement>, 
//         field?: { name: string, path: string, noteIndex?: number }, note?: NewNote
//     ) => void,
//     deleteNote: (
//         e: MouseEvent<HTMLButtonElement>, 
//         name: string, 
//         path: string, 
//         noteIndex: number
//     ) => void,
//     handleRetrieveValue: (path: string, field: GenericSchoolField) => {
//         originalValue: any,
//         originalDraftValue: any,
//     },
//     handleModify: (path: string, field: GenericSchoolField, newValue: any) => {
//         originalField: any;
//         draftField: any;
//         originalValue: any;
//     },
//     handleChanges: (
//         field: GenericSchoolField, 
//         name: string, 
//         original: any, 
//         draft: any, 
//         path: string, 
//         type: "modified" | "added" | "removed", 
//         originalValue?: any, value?: any
//     ) => void,
//     validateIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
//     revertIndividualChange?: (e: MouseEvent<HTMLButtonElement>, name: string, change: Change) => void,
// }) {
//     const [ change, setChange ] = useState<Change | null>(null);

//     useEffect(() => {
//         const schoolField = school[formField.name as keyof NewSchool] as GenericSchoolField;
//         const associatedChange = schoolField.changes.find(change => change.path === formField.path);
//         if (associatedChange) {
//             setChange(associatedChange)
//         } else {
//             setChange(null);
//         }
        
//     }, [formField, school]);

//     const handleInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
//         const keys = path.split('.');

//         const name = e.target.name;
//         let value = e.target.value;

//         if (formField.modifyValueFn) {
//             value = formField.modifyValueFn(value, keys);
//         } 

//         const field = school[name as keyof NewSchool] as GenericSchoolField;

//         const {
//             originalField,
//             draftField,
//             originalValue 
//         } = handleModify(path, field, value);
        
//         handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

        
//     };

//     const handleQuill = (e: any, name: string, path: string) => {
//         const value = e;

//         const field = school[name as keyof NewSchool] as GenericSchoolField;

//         const {
//             originalField,
//             draftField,
//             originalValue 
//         } = handleModify(path, field, value);
        
//         handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

        
//     };

//     const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
//         const keys = path.split('.');

//         const name = e.target.name;
//         let value = e.target.checked;
        

//         if (formField.modifyValueFn) {
//             value = formField.modifyValueFn(value, keys);
//         } 

//         const field = school[name as keyof NewSchool] as GenericSchoolField;

//         const {
//             originalField,
//             draftField,
//             originalValue 
//         } = handleModify(path, field, value);
        
//         handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);
//     };

//     const handleSelect = (e: any, name: string, path: string) => {
//         const value = e.value;

//         const field = school[name as keyof NewSchool] as GenericSchoolField;

//         const {
//             originalField,
//             draftField,
//             originalValue 
//         } = handleModify(path, field, value);
        
//         handleChanges(field, name, originalField, draftField, path, 'modified', originalValue, value);

//     };

//     return (
//         <div className="flex flex-col gap-8 justify-start items-start">
//             <>
//             {formField.inputs.map(fieldInput => {
//                 const inputPath = `.input.${fieldInput.name}.${fieldInput.path}`;
//                 const value = 
//             })}
//             </>
//             {['text', 'date', 'percentage', 'fee'].includes(formField.type) ? (
//                 <TextInput 
//                     label={formField.label}
//                     placeholder={formField.label}
//                     name={formField.name}
//                     value={inputValue}
//                     path={formField.path}
//                     handleInput={handleInput}
//                     isRequired={false}
//                     type={formField.type === 'date' ? 'date' : 'text'}
//                     startingAdornment={formField.type === 'fee' ? <DollarSignIcon/> : formField.type === 'percentage' ? <PercentageIcon/> : undefined}
//                     link={fieldsWithLinks.includes(formField.name) ? inputValue : undefined}
//                     validateIndividualChange={validateIndividualChange}
//                     revertIndividualChange={revertIndividualChange}
//                     change={change ? change : undefined}
//                 />
//             ) : formField.type === 'boolean' ? (
//                 <BooleanInput 
//                     label={formField.label}
//                     name={formField.name}
//                     value={inputValue}
//                     path={formField.path}
//                     handleCheck={handleBoolean}
//                     isRequired={false}
//                     isDisabled={false}
//                     validateIndividualChange={validateIndividualChange}
//                     revertIndividualChange={revertIndividualChange}
//                     change={change ? change : undefined}
//                 />
//             ) : formField.type === 'select' ? (
//                 <SelectInput 
//                     label={formField.label}
//                     placeholder={formField.label}
//                     name={formField.name}
//                     value={{ value: inputValue, label: inputValue }}
//                     path={formField.path}
//                     handleSelect={handleSelect}
//                     isRequired={false}
//                     isCreatable={false}
//                     options={formType === 'draft' && formField.draftOptions ? formField.draftOptions : formField.options ? formField.options : []}
//                     validateIndividualChange={validateIndividualChange}
//                     revertIndividualChange={revertIndividualChange}
//                     change={change ? change : undefined}
//                 />
//             ) : formField.type === 'array' ? (
//                 <>
//                 </>
//             ) : formField.type === 'text-area' ? (
//                 <TextEditorInput 
//                     label={formField.label}
//                     name={formField.name}
//                     value={inputValue}
//                     path={formField.path}
//                     handleQuill={handleQuill}
//                     isRequired={false}
//                     validateIndividualChange={validateIndividualChange}
//                     revertIndividualChange={revertIndividualChange}
//                     change={change ? change : undefined}
//                 />
//             ) : (
//                 <></>
//             )}
//             {noteValue && formField.notePath && (
//                 <Notes 
//                     notes={noteValue}
//                     field={{
//                         ...formField,
//                         path: formField.notePath,
//                         notePath: formField.notePath,
//                     }}
//                     toggleNote={toggleNote}
//                     deleteNote={deleteNote}
//                 />
//             )}
//         </div>
//     )
// }