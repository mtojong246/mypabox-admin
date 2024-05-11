import { EditedField, Note, School } from "../../../../../types/schools.types"
import { UserObject } from "../../../../../types/users.types"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { generalInfoFields } from "../../../../../data/defaultValues"
import useInput from "../../../../../app/hooks/useInput"
import ReactQuill from "react-quill"
import countries from "../../../../../data/countries.json";
import CreatableSelect from 'react-select/creatable';
import { Tooltip, IconButton } from "@mui/material"
import { AiOutlineInfoCircle } from "react-icons/ai"
import InputFields from "../../../Fields/InputFields"
import EditButtons from "../../../Fields/EditButtons"
import BooleanFields from "../../../Fields/BooleanFields"
import SelectFields from "../../../Fields/SelectFields"
import useNotes from "../../../../../app/hooks/useNotes"
import AddUpdateNote from "../../../Fields/AddUpdateNote"
import NoteFields from "../../../Fields/NoteFields"
import Indicator from "../../../../../components/Indicator"
import Screen from "../../../../../components/Screen"
import { isDisabled } from "../../../../../data/functions"
import ArrayFields from "../../../Fields/ArrayFields"
import useArrayFields from "../../../../../app/hooks/useArrayFields"

const months = [
    {value: 'January', label: 'January'},
    {value: 'February', label: 'February'},
    {value: 'March', label:'March'},
    {value: 'April', label: 'April'},
    {value: 'May', label: 'May'},
    {value: 'June', label: 'June'},
    {value: 'July', label: 'July'},
    {value: 'August', label: 'August'},
    {value: 'September', label: 'September'},
    {value: 'October', label: 'October'},
    {value: 'November', label: 'November'},
    {value: 'December', label: 'December'}
]

export default function GeneralInfoNew({newSchool, setNewSchool, loggedInUser, isEdit}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {
    
    const {
        handleStringOrNumberInput,
        handleBooleanValue,
        handleSelectInput,
        handleQuill
    } = useInput({ newSchool, setNewSchool });

    const {
        addField,
        deleteField,
        undoDeleteField
    } = useArrayFields({ newSchool, setNewSchool })

    const {
        addNoteObj,
        updateNoteObj,
        deleteNoteObj,
        addNewNote,
        isNoteOpen,
        toggleNotePopup,
        noteInfoObj,
        setNoteInfoObj,
    } = useNotes({ newSchool, setNewSchool })


    const [stateNames, setStateNames] = useState<any>([]);
    const [countryNames, setCountryNames] = useState<any>([]);

    useEffect(() => {
        setCountryNames(countries.map(country => ({ value: country.name, label: country.name, 
          target: {name: "school_country", type: 'text', value: country.name }})))
    
        setStateNames(countries.filter(country => country.name === newSchool.school_country.input)[0]?.states
         .map(state => ({ value: state.name, label: state.name, target: {name: "school_state", type: 'text', 
         value: state.name, } })))
    
    }, [newSchool.school_country.input]);


    const getOptions = (value: string) => {
        if (value === 'school_country') {
            return countryNames;
        } else if (value === 'school_state') {
            return stateNames;
        } else if (value === 'school_start_month') {
            return months;
        }
    }

    const getSelectValue = (value: string) => {
        const field = newSchool[value as keyof School];
        const input = field['input' as keyof object];

        if (input === null) {
            return null;
        } else {
            return { value: input, label: input };
        }
        
    }

    const [phone, setPhone] = useState({
        category: '',
        number: '',
    });

    const [email, setEmail] = useState({
        category: '',
        email: '',
    })

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        if ((e.target.name) === 'school_email') {
            setEmail({
                ...email,
                email: e.target.value
            })
        } else {
            setPhone({
                ...phone, 
                number: e.target.value
            })
        }
    }



    
    return (
        <>
        {generalInfoFields.map((fieldObj, i) => {
            const { label, name } = fieldObj
            const field = newSchool[name as keyof School];
            const editedField = newSchool[`edited_${name}` as keyof School] as EditedField;
            
            if (typeof field === 'string') {
                return (
                    <div className={`mt-20 text-xl w-full`}>
                        <p>{label}</p>
                        <ReactQuill className='mt-4 h-60 rounded-2xl max-w-[900px]' theme="snow" value={field} 
                        onChange={(e:any) => handleQuill(e, name)}/>
                    </div>
                )
            } else {
                const input = 'input' as keyof object;
                const notes = 'notes' as keyof object;
                const inputValue = field[input];
                const editedValue = editedField[input];
                const noteValue = field[notes] as Note[] | undefined;
                const editedNoteValue = editedField[notes] as Note[] | null;

                return (
                    <div className={`${i === 0 ? 'mt-12' : 'mt-20'} flex justify-start items-start gap-3 w-full`}>
                        <div className={`relative max-w-[900px] grow border-2 p-4 block rounded border-[#B4B4B4]`}>
                            <Screen isEdit={isEdit} editedInput={editedValue} loggedInUser={loggedInUser} isEditMode={editedField.isEditMode} />
                            <Indicator label={label} editedInput={editedValue} />
                            <div className='flex justify-center items-start gap-3'>
                                {typeof inputValue === 'string' || typeof inputValue === 'number' ? (
                                    <>
                                    {['school_country', 'school_state', 'school_start_month'].includes(name) ? (
                                        <SelectFields options={getOptions(name)} label={label} name={name} value={getSelectValue(name)!} editedValue={getSelectValue(`edited_${name}`)} handleInputChange={handleSelectInput} isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser}/>
                                    ) : (
                                        <InputFields label={label} name={name} value={inputValue} editedValue={editedValue} handleInputChange={handleStringOrNumberInput} isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser}/>
                                    )}
                                    </>
                                ) : typeof inputValue === 'boolean' ? (
                                    <BooleanFields label={label} name={name} value={inputValue} editedValue={editedValue} handleInputChange={handleBooleanValue} isEdit={isEdit} newSchool={newSchool} loggedInUser={loggedInUser}/>
                                ) : (
                                    <>
                                    <div className='w-1/4 flex justify-center items-start gap-1'>
                                        <CreatableSelect onChange={(e:any) => {name === 'school_email' ? setEmail({...email, category: e.value}) : setPhone({...phone, category: e.value})}} value={name === 'school_email' ? {value: email.category, label: email.category} : {value: phone.category, label: phone.category}} className="grow focus:outline-none rounded"
                                        options={[{value: 'Main', label: 'Main'}]}/>
                                        <Tooltip title="Type and press enter to create new option" placement='right'>
                                            <IconButton style={{padding: '0px'}}>
                                                <AiOutlineInfoCircle className='h-4 w-4 text-[#b4b4b4]'/>
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <input name={name} value={name === 'school_email' ? email.email : phone.number} onChange={handleInput} className=" grow focus:outline-none border border-[#B4B4B4] p-3 rounded"/>
                                    <button name={name} onClick={(e:any) => addField(e, editedField.isEditMode, name === 'school_email' ? email : phone)} className="px-5 border text-[#4573D2] border-[#4573D2] rounded h-[50px] text-xl hover:text-white hover:bg-[#4573D2]">Add</button>
                                    </>
                                )}
                                {noteValue !== undefined && (
                                    <button onClick={(e:any) => addNewNote(e, isDisabled(editedNoteValue, editedField.isEditMode, isEdit, loggedInUser), name, !editedNoteValue ? false : true)}  className="disabled:opacity-70 disabled:hover:bg-none w-32 border text-[#F06A6A] border-[#F06A6A] rounded h-[50px] text-xl hover:text-white hover:bg-[#F06A6A]">
                                        Add Note
                                    </button>
                                )}
                            </div>
                            {['school_email', 'school_phone_number'].includes(name) && (
                                <ArrayFields name={name} values={inputValue} editedValues={editedValue} deleteFunc={deleteField} undoDeleteFunc={undoDeleteField} k={name === 'school_email' ? 'email' : 'number'} newSchool={newSchool}/>
                            )}
                            {noteValue !== undefined && (
                                <NoteFields name={name} toggleNotePopup={toggleNotePopup} notes={editedNoteValue ? editedNoteValue : noteValue} 
                                newSchool={newSchool} loggedInUser={loggedInUser} isEdit={isEdit} setNoteObj={setNoteInfoObj} deleteNoteObj={deleteNoteObj} />
                            )}
                        </div>
                        {isEdit && <EditButtons loggedInUser={loggedInUser} name={name} isEdit={isEdit} newSchool={newSchool} setNewSchool={setNewSchool} />}
                    </div>
                )
        
                
            }
        })}
        {isNoteOpen && <AddUpdateNote noteInfoObj={noteInfoObj} setNoteInfoObj={setNoteInfoObj} toggleNotePopup={toggleNotePopup} updateNote={updateNoteObj} addNote={addNoteObj}/>}
        </>
    )
}