import { School } from "../../../../types/schools.types"
import { Dispatch, SetStateAction } from "react"
import { UserObject } from "../../../../types/users.types"
import ReactQuill from "react-quill"

export default function Preference({ newSchool, setNewSchool, loggedInUser, isEdit }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>>, loggedInUser: UserObject, isEdit: boolean }) {

    const handleQuill = (e:any) => {
        setNewSchool({
            ...newSchool,
            school_preference: e,
        })
    };

    return (
            <div className={`mt-10 text-xl w-full`}>
                <p>Preference</p>
                <ReactQuill className='mt-4 h-60 rounded-2xl max-w-[900px]' theme="snow" value={newSchool.school_preference} 
                onChange={handleQuill}/>
            </div>
    )
}