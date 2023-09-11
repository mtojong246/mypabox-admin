import { Dispatch, SetStateAction, useState } from "react";
import { School, SchoolPrereqRecommendedCourse, SchoolPrereqRequiredCourse, SchoolPrereqRequiredCourseCategory, SchoolPrereqRequiredOptionalCourse } from "../../../../types/schools.types";
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

    const updateRequiredCourse = (course: SchoolPrereqRequiredCourse) => {
        setNewSchool({
            ...newSchool,
            school_prereq_required_courses: newSchool.school_prereq_required_courses.map(c => {
                if (c.school_required_course_id === course.school_required_course_id) {
                    return { ...course }
                } else {
                    return { ...c }
                }
            })
        })
    }

    const addRecommendedCourse = (course: SchoolPrereqRecommendedCourse) => {
        setNewSchool({
            ...newSchool,
            school_prereq_recommended_courses: newSchool.school_prereq_recommended_courses.concat(course)
        })
    }

    const updateRecommendedCourse = (course: SchoolPrereqRecommendedCourse) => {
        setNewSchool({
            ...newSchool,
            school_prereq_recommended_courses: newSchool.school_prereq_recommended_courses.map(c => {
                if (c.school_recommended_course_id === course.school_recommended_course_id) {
                    return {...course}
                } else {
                    return {...c}
                }
            })
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
                <RequiredCourses toggleRequiredCourses={toggleRequiredCourses} newSchool={newSchool} setNewSchool={setNewSchool} setEditedRequiredCourse={setEditedRequiredCourse}/>
                <RequiredOptionalCourses toggleRequiredOptionalCourses={toggleRequiredOptionalCourses} newSchool={newSchool} setNewSchool={setNewSchool}/>
                <RequiredCourseCategories toggleRequiredCourseCategories={toggleRequiredCourseCategories} newSchool={newSchool} setNewSchool={setNewSchool}/>
                <RecommendedCourses toggleRecommendedCourses={toggleRecommendedCourses} newSchool={newSchool} setNewSchool={setNewSchool} setEditedRecommendedCourse={setEditedRecommendedCourse}/>
            </>
        )}
        {openRequiredCourses && <AddRequiredCourses toggleRequiredCourses={toggleRequiredCourses} addRequiredCourse={addRequiredCourse} updateRequiredCourse={updateRequiredCourse} editedRequiredCourse={editedRequiredCourse} setEditedRequiredCourse={setEditedRequiredCourse}/>}
        {openRequiredCourseCategories && <AddRequiredCourseCategories toggleRequiredCourseCategories={toggleRequiredCourseCategories} addCourseCategory={addCourseCategory}/>}
        {openRequiredOptionalCourses && <AddRequiredOptionalCourses toggleRequiredOptionalCourses={toggleRequiredOptionalCourses} addOptionalGroup={addOptionalGroup}/>}
        {openRecommendedCourses && <AddRecommendedCourses toggleRecommendedCourses={toggleRecommendedCourses} addRecommendedCourse={addRecommendedCourse} updateRecommendedCourse={updateRecommendedCourse} editedRecommendedCourse={editedRecommendedCourse} setEditedRecommendedCourse={setEditedRecommendedCourse}/>}
        </>
    )
}