import { School } from "../../../../types/schools.types";
import { Dispatch, SetStateAction } from "react";
import ReactQuill from "react-quill";

export default function MissionStatement({newSchool, setNewSchool}: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    
    const handleQuill = (e:any) => {
        setNewSchool({
            ...newSchool,
            school_mission_statement: e,
        })
    };
    
    return (
        <div className={`mt-12 text-xl w-full`}>
            <p>Mission Statement</p>
            <ReactQuill className='mt-4 h-60 rounded-2xl max-w-[900px]' theme="snow" value={newSchool.school_mission_statement}
            onChange={handleQuill}/>
        </div>
    )
}