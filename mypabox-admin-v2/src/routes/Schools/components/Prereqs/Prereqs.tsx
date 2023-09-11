import { Dispatch, SetStateAction, useState } from "react";
import { School, SchoolPrereqRecommendedCourse, SchoolPrereqRequiredCourse, SchoolPrereqRequiredCourseCategory, SchoolPrereqRequiredOptionalCourse } from "../../../../types/schools.types";
import AddRequiredCourses from "./AddRequiredCourses";
import AddRequiredCourseCategories from "./AddRequiredCourseCategories";
import AddRequiredOptionalCourses from "./AddRequiredOptionalCourses";
import AddRecommendedCourses from "./AddRecommendedCourses";
import { FiEdit3 } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../app/selectors/courses.selectors";
import RequiredCourses from "./RequiredCourses";
import RequiredOptionalCourses from "./RequiredOptionalCourses";
import RequiredCourseCategories from "./RequiredCourseCategories";
import RecommendedCourses from "./RecommendedCourses";

export default function Prereqs({ newSchool, setNewSchool }: { newSchool: School, setNewSchool: Dispatch<SetStateAction<School>> }) {
    const courses = useSelector(selectCourses)
    const [ openRequiredCourses, setOpenRequiredCourses ] = useState(false);
    const [ openRequiredCourseCategories, setOpenRequiredCourseCategories ] = useState(false);
    const [ openRequiredOptionalCourses, setOpenRequiredOptionalCourses ] = useState(false);
    const [ openRecommendedCourses, setOpenRecommendedCourses ] = useState(false);

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
    const addRequiredCourse = (course: SchoolPrereqRequiredCourse) => {
        setNewSchool({
            ...newSchool,
            school_prereq_required_courses: newSchool.school_prereq_required_courses.concat(course)
        })
    }

    const addRecommendedCourse = (course: SchoolPrereqRecommendedCourse) => {
        setNewSchool({
            ...newSchool,
            school_prereq_recommended_courses: newSchool.school_prereq_recommended_courses.concat(course)
        })
    }

    const addOptionalGroup = (group: SchoolPrereqRequiredOptionalCourse) => {
        setNewSchool({
            ...newSchool,
            school_prereq_required_optional_courses: newSchool.school_prereq_required_optional_courses.concat(group)
        })
    }

    const addCourseCategory = (category: SchoolPrereqRequiredCourseCategory) => {
        setNewSchool({
            ...newSchool,
            school_prereq_required_course_categories: newSchool.school_prereq_required_course_categories.concat(category),
        })
    }

    

    return (
        <>
        {newSchool && (
            <>
                <RequiredCourses toggleRequiredCourses={toggleRequiredCourses} newSchool={newSchool} setNewSchool={setNewSchool}/>
                <RequiredOptionalCourses toggleRequiredOptionalCourses={toggleRequiredOptionalCourses} newSchool={newSchool} setNewSchool={setNewSchool}/>
                <RequiredCourseCategories toggleRequiredCourseCategories={toggleRequiredCourseCategories} newSchool={newSchool} setNewSchool={setNewSchool}/>
                <RecommendedCourses toggleRecommendedCourses={toggleRecommendedCourses} newSchool={newSchool} setNewSchool={setNewSchool}/>
            </>
        )}
        {openRequiredCourses && <AddRequiredCourses toggleRequiredCourses={toggleRequiredCourses} addRequiredCourse={addRequiredCourse}/>}
        {openRequiredCourseCategories && <AddRequiredCourseCategories toggleRequiredCourseCategories={toggleRequiredCourseCategories} addCourseCategory={addCourseCategory}/>}
        {openRequiredOptionalCourses && <AddRequiredOptionalCourses toggleRequiredOptionalCourses={toggleRequiredOptionalCourses} addOptionalGroup={addOptionalGroup}/>}
        {openRecommendedCourses && <AddRecommendedCourses toggleRecommendedCourses={toggleRecommendedCourses} addRecommendedCourse={addRecommendedCourse}/>}
        </>
    )
}