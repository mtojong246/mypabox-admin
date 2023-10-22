import { School, Note } from "../../../../types/schools.types";
import { Dispatch, SetStateAction, useEffect, useState, MouseEvent, ChangeEvent } from "react"
import ReactQuill from "react-quill";
import CreatableSelect from 'react-select/creatable';
import AddNote from "../Prereqs/AddNote";

import { AiOutlineClose } from 'react-icons/ai'
import { FiEdit3 } from 'react-icons/fi';
import ApplicationsCaspa from "./ApplicationsCaspa";
import ApplicationsDirectly from "./ApplicationsDirectly";
import SupplementalApplications from "./SupplementalApplications";

export default function Applications({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    return (
        <>
            <ApplicationsCaspa newSchool={newSchool} setNewSchool={setNewSchool} />
            <ApplicationsDirectly newSchool={newSchool} setNewSchool={setNewSchool}/>
            <SupplementalApplications newSchool={newSchool} setNewSchool={setNewSchool}/>

        </>
    )
}