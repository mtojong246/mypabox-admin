import { School } from "../../../types/schools.types";
import { Dispatch, SetStateAction } from "react";

export default function GPA({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    return (
        <div className={`mt-10 relative max-w-[900px] border p-5 block rounded-lg border-[#B4B4B4]`}>
                <label className="absolute top-[-16px] text-xl bg-white">GPA</label>   
        </div>
    )
}