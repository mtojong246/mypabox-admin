import { Dispatch, SetStateAction, useState } from "react";
import { School, SchoolPrereqRecommendedCourse, SchoolPrereqRequiredCourse, SchoolPrereqRequiredCourseCategory, SchoolPrereqRequiredOptionalCourse, SchoolRequiredOptionalCourse } from "../../../../types/schools.types";
import AddRequiredCourses from "./AddRequiredCourses";
import AddRequiredCourseCategories from "./AddRequiredCourseCategories";
import AddRequiredOptionalCourses from "./AddRequiredOptionalCourses";
import AddRecommendedCourses from "./AddRecommendedCourses";
import RequiredCourses from "./RequiredCourses";
import RequiredOptionalCourses from "./RequiredOptionalCourses";
import RequiredCourseCategories from "./RequiredCourseCategories";
import RecommendedCourses from "./RecommendedCourses";


export default function Prereqs({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const [ openRequiredCourses, setOpenRequiredCourses ] = useState(false);
    const [ openRequiredCourseCategories, setOpenRequiredCourseCategories ] = useState(false);
    const [ openRequiredOptionalCourses, setOpenRequiredOptionalCourses ] = useState(false);
    const [ openRecommendedCourses, setOpenRecommendedCourses ] = useState(false);
    const [ editedRequiredCourse, setEditedRequiredCourse ] = useState<SchoolPrereqRequiredCourse | null>(null);
    const [ editedRecommendedCourse, setEditedRecommendedCourse ] = useState<SchoolPrereqRecommendedCourse | null>(null);
    const [ editedRequiredOption, setEditedRequiredOption ] = useState<SchoolPrereqRequiredOptionalCourse | null>(null)
    const [ editedRequiredCategory, setEditedRequiredCategory ] = useState<SchoolPrereqRequiredCourseCategory | null>(null);

    const [ groupIndex, setGroupIndex ] = useState<number | null>(null);

    const toggleRequiredCourses = (e:any) => {
        e.preventDefault();
        setOpenRequiredCourses(!openRequiredCourses);
    }
    const toggleRequiredCourseCategories = (e:any) => {
        e.preventDefault();
        setOpenRequiredCourseCategories(!openRequiredCourseCategories);
    }
    const toggleRequiredOptionalCourses = (e:any) => {
        e.preventDefault();
        setOpenRequiredOptionalCourses(!openRequiredOptionalCourses);
    }
    const toggleRecommendedCourses = (e:any) => {
        e.preventDefault();
        setOpenRecommendedCourses(!openRecommendedCourses);
    }

    // Adds new required course, recommended course, required optional group or required course categories to newSchool object
    const addCourseOrCategory = (group: SchoolPrereqRequiredCourse | SchoolPrereqRecommendedCourse | SchoolPrereqRequiredCourseCategory | SchoolPrereqRequiredOptionalCourse, type: string) => {
        const name = type as keyof School;
        const field = newSchool[name] as SchoolPrereqRequiredCourse[] | SchoolPrereqRecommendedCourse[] | SchoolPrereqRequiredCourseCategory[] | SchoolPrereqRequiredOptionalCourse[];
        const newGroup = [...field, {...group}]
        setNewSchool({
            ...newSchool,
            [name]: newGroup,
        })
    }

    // Updates required course, recommended course, required optional group or required course categories depending on index; then resets index
    const updateCourseOrCategory = (group: SchoolPrereqRequiredCourse | SchoolPrereqRecommendedCourse | SchoolPrereqRequiredCourseCategory | SchoolPrereqRequiredOptionalCourse, type: string) => {
       const name = type as keyof School;
       const field = newSchool[name] as SchoolPrereqRequiredCourse[] | SchoolPrereqRecommendedCourse[] | SchoolPrereqRequiredCourseCategory[] | SchoolPrereqRequiredOptionalCourse[];
       const newGroup = field.map((g,i) => {
        if (i === groupIndex) {
            return { ...group }
        } else {
            return { ...g }
        }
       })
       setNewSchool({
        ...newSchool,
        [name]: newGroup,
       })
       setGroupIndex(null)
    }


    return (
        <>
        {newSchool && (
            <>
                <RequiredCourses toggleRequiredCourses={toggleRequiredCourses} newSchool={newSchool} setNewSchool={setNewSchool} setEditedRequiredCourse={setEditedRequiredCourse} setGroupIndex={setGroupIndex}/>
                <RequiredOptionalCourses toggleRequiredOptionalCourses={toggleRequiredOptionalCourses} newSchool={newSchool} setNewSchool={setNewSchool} setEditedRequiredOption={setEditedRequiredOption} setGroupIndex={setGroupIndex}/>
                <RequiredCourseCategories toggleRequiredCourseCategories={toggleRequiredCourseCategories} newSchool={newSchool} setNewSchool={setNewSchool} setEditedRequiredCategory={setEditedRequiredCategory} setGroupIndex={setGroupIndex}/>
                <RecommendedCourses toggleRecommendedCourses={toggleRecommendedCourses} newSchool={newSchool} setNewSchool={setNewSchool} setEditedRecommendedCourse={setEditedRecommendedCourse} setGroupIndex={setGroupIndex}/>
            </>
        )}
        {openRequiredCourses && <AddRequiredCourses toggleRequiredCourses={toggleRequiredCourses} editedRequiredCourse={editedRequiredCourse} setEditedRequiredCourse={setEditedRequiredCourse} addCourseOrCategory={addCourseOrCategory} updateCourseOrCategory={updateCourseOrCategory} newSchool={newSchool}/>}
        {openRequiredCourseCategories && <AddRequiredCourseCategories toggleRequiredCourseCategories={toggleRequiredCourseCategories} editedRequiredCategory={editedRequiredCategory} setEditedRequiredCategory={setEditedRequiredCategory} addCourseOrCategory={addCourseOrCategory} updateCourseOrCategory={updateCourseOrCategory} newSchool={newSchool}/>}
        {openRequiredOptionalCourses && <AddRequiredOptionalCourses toggleRequiredOptionalCourses={toggleRequiredOptionalCourses} editedRequiredOption={editedRequiredOption} setEditedRequiredOption={setEditedRequiredOption} addCourseOrCategory={addCourseOrCategory} updateCourseOrCategory={updateCourseOrCategory}/>}
        {openRecommendedCourses && <AddRecommendedCourses toggleRecommendedCourses={toggleRecommendedCourses} editedRecommendedCourse={editedRecommendedCourse} setEditedRecommendedCourse={setEditedRecommendedCourse} addCourseOrCategory={addCourseOrCategory} updateCourseOrCategory={updateCourseOrCategory} newSchool={newSchool}/>}
        </>
    )
}