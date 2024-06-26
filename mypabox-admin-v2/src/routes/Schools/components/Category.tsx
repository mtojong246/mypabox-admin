import { categories, CategoryType } from "../../../data/categories"
import { useState, useEffect, ChangeEvent, MouseEvent, Dispatch, SetStateAction } from "react"
import { School, StringInput, NumberInput, BooleanInput, StringInputWithFields, Note } from "../../../types/schools.types";
import countries from '../../../data/countries.json';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import Select from 'react-select';
import GPA from "./GPA/GPA";
import Prereqs from "./Prereqs/Prereqs";
import PAShadowing from "./PAShadowing/PAShadowing";

import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import DeletePopUp from "./DeletePopUp";
import Experience from "./Experience/Experience";
import Exams from "./Exams/Exams";
import Evaluations from "./Evaluations/Evaluations";
import InternationalStudents from "./InternationalStudents/InternationalStudents";
import Certifications from "./Certifications/Certifications";
import Applications from "./Applications/Applications";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import DegreeInfo from "./GeneralInfo/DegreeInfo";
import AccreditationStatus from "./GeneralInfo/AccreditationStatus";
import MissionStatement from "./GeneralInfo/MissionStatement";
import Tuition from "./GeneralInfo/Tuition";
import PANCEPassRate from "./GeneralInfo/PANCEPassRate";
import { useSelector } from "react-redux";
import { selectLogin } from "../../../app/selectors/login.selector";
import { selectUsers } from "../../../app/selectors/users.selectors";
import { UserObject } from "../../../types/users.types";
import { selectIsEdit } from "../../../app/selectors/schools.selectors";
import Preference from "./Preference/Preference";
import GeneralInfoNew from "./GeneralInfo/New/GeneralInfoNew";
import { mockUser } from "../../../data/defaultValues";
import AccreditationStatusNew from "./GeneralInfo/New/AccreditationStatusNew";
import InternationalStudentsNew from "./InternationalStudents/InternationalStudentsNew";
import TuitionNew from "./GeneralInfo/New/TuitionNew";
import DegreeInfoNew from "./GeneralInfo/New/DegreeInfoNew";
import CertificationsNew from "./Certifications/CertificationsNew";


export default function Category({ tab, newSchool, setNewSchool, handleInputChange, handleCheck, handleQuillInputChange, openNotePopup, openEditPopup, removeNote }: { 
    tab: string,
    newSchool: School,
    handleInputChange: (e: any) => void,
    handleCheck: (e: ChangeEvent<HTMLInputElement>) => void,
    handleQuillInputChange: (name: string, value: string) => void,
    openNotePopup: (e: MouseEvent<HTMLButtonElement>) => void, 
    openEditPopup: (e: MouseEvent<HTMLButtonElement>, note: Note, index: number) => void,
    removeNote: (e: MouseEvent<HTMLButtonElement>, i: number) => void,
    setNewSchool: Dispatch<SetStateAction<School>>,
 }) {

    const [stateNames, setStateNames] = useState<any>([]);
    const [countryNames, setCountryNames] = useState<any>([]);
    const [category, setCategory] = useState<CategoryType>({} as CategoryType);
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [eventTarget, setEventTarget] = useState()
    const [index, setIndex] = useState(0)
    const [inputType, setInputType] = useState('');

    const login = useSelector(selectLogin);
    const users = useSelector(selectUsers);
    const isEdit = useSelector(selectIsEdit);
    const [ loggedInUser, setLoggedInUser ] = useState<UserObject>({
        id: '',
        displayName: '',
        email: '',
        isSuperAdmin: false,
        permissions: {
            canEditWithoutVerificationNeeded: false,
            canEditWithVerificationNeeded: false,
            canVerify: false,
            canMakeLive: false,
            canAddOrDelete: false,
        },
        activeTasks: [],
        completedTasks: [],
        archivedTasks: [],
      });

    useEffect(() => {
        const currentUser = users.find(user => user.email === login);
        if (currentUser) {
            setLoggedInUser(currentUser);
        }
    }, [login, users]);

    useEffect(() => {
        const newCategory = categories.find(cat => cat.hash === tab);
        if (newCategory) {
            setCategory(newCategory);
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, [tab])


    useEffect(() => {
        setCountryNames(countries.map(country => ({ value: country.name, label: country.name, 
          target: {name: "school_country", type: 'text', value: country.name }})))
    
        setStateNames(countries.filter(country => country.name === newSchool.school_country.input)[0]?.states
         .map(state => ({ value: state.name, label: state.name, target: {name: "school_state", type: 'text', 
         value: state.name, } })))
    
    }, [newSchool.school_country.input])

    const [inputList, setInputList] = useState([{ input: '' }])

    // Removes specific field from input list 
    const removeField = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        
        const name = (e.currentTarget as HTMLButtonElement).value as keyof School;
        const field = newSchool[name] as StringInputWithFields; 
        
        const list = inputList.filter(input => inputList.indexOf(input) !== index);

        setInputList(list)

        setNewSchool({
        ...newSchool,
        [name]: {
            ...field, 
            fields: list
        }
        })
  
    }
    
    return (
        <form className={`pb-24 `}>
        <>
            {tab === '#general-info' && <GeneralInfo newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#degree-info' && <DegreeInfo newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#accreditation-status' && <AccreditationStatus newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#mission-statement' && <MissionStatement newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#tuition' && <TuitionNew newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#pance-pass-rate' && <PANCEPassRate newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#GPA' && <GPA newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#prerequisites' && <Prereqs newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#experience' && <Experience newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#pa-shadowing' && <PAShadowing newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#exams' && <Exams newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#evaluations' && <Evaluations newSchool={newSchool} setNewSchool={setNewSchool}  loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#international-students' && <InternationalStudents newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#certifications' && <Certifications newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#applications' && <Applications newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {tab === '#preference' && <Preference newSchool={newSchool} setNewSchool={setNewSchool} loggedInUser={loggedInUser} isEdit={isEdit}/>}
            {deletePopUp ? <DeletePopUp event={eventTarget} i={index} deletePopUp={deletePopUp} setDeletePopUp={setDeletePopUp} 
            removeNote={removeNote} removeField={removeField} inputType={inputType} /> : ''}
        </>
        </form>
    )
}