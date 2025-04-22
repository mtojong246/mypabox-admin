import { ChangeEvent, useEffect, useState } from "react";
import { GenericSchoolField, NewSchool, NewNote } from "../../../../../types/newSchools.types";
import { PrereqArrItemType, PrereqPopupType } from "../Prerequisites";
import { ReactComponent as CloseIcon } from '../../../../../components/Icons/X.svg';
import { ReactComponent as EditIcon } from '../../../../../components/Icons/Edit-With-Line.svg';
import { ReactComponent as DeleteIcon } from '../../../../../components/Icons/Trash.svg';


import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import Button from "../../../../../components/Buttons/Button";
import CoursePopup, { CourseForm } from "./CoursePopup";
import Course from "../arrayFields/Course";
import ReactQuill from "react-quill";
import NotePopup from "./NotePopup";
import { UserPermissions } from "../../../../../types/users.types";



export interface RequiredOptionalCourseType {
    school_minimum_number_of_courses_to_be_completed: number;
    school_required_optional_courses_list: {
        school_optional_course_id: string;
        school_optional_course_lab: boolean;
        school_optional_course_lab_preferred: boolean;
        school_optional_course_credit_hours: number;
        school_optional_course_quarter_hours: number;
        school_optional_course_note_section: string;
    }[];
    notes: NewNote[];
}

export interface OptionalCourseType {
    school_optional_course_id: string;
    school_optional_course_lab: boolean;
    school_optional_course_lab_preferred: boolean;
    school_optional_course_credit_hours: number;
    school_optional_course_quarter_hours: number;
    school_optional_course_note_section: string;
}

const defaultForm: RequiredOptionalCourseType = {
    school_minimum_number_of_courses_to_be_completed: 0,
    school_required_optional_courses_list: [],
    notes: [],
}


export default function RequiredOptionalCoursesPopup({
    school,
    togglePopup,
    selectedPrereqField,
    selectedPrereqArrItem,
    handleModification,
    handleChanges,
    permissions,
}: {
    school: NewSchool,
    togglePopup: (e:React.MouseEvent<HTMLButtonElement>, type: PrereqPopupType | null, field?: { name: string, path: string, index?: number }, arrItem?: PrereqArrItemType) => void,
    selectedPrereqField: {
        name: string,
        path: string,
        index?: number,
    },
    selectedPrereqArrItem: PrereqArrItemType | null,
    handleModification: (path: string, field: GenericSchoolField, newValue: any, modificationType: "modify" | "add" | "remove", index?: number) => {
        originalField: any;
        draftField: any;
        originalValue: any;
        originalDraftValue: any[] | undefined;
    },
    handleChanges: (field: GenericSchoolField, name: string, original: any, draft: any, path: string, type: "modified" | "added" | "removed", originalValue?: any, value?: any) => void,
    permissions: UserPermissions
}) {
    const [ form, setForm ] = useState<RequiredOptionalCourseType>(defaultForm);
    const [ selectedCourse, setSelectedCourse ] = useState<CourseForm | null>(null);
    const [ selectedCourseIndex, setSelectedCourseIndex ] = useState<number | null>(null);
    const [ isCoursePopupOpen, setIsCoursePopupOpen ] = useState(false);

    const [ selectedNote, setSelectedNote ] = useState<NewNote | null>(null);
    const [ selectedNoteIndex, setSelectedNoteIndex ] = useState<number | null>(null);
    const [ isNotePopupOpen, setIsNotePopupOpen ] = useState(false);


    const toggleCoursePopup = (e: React.MouseEvent<HTMLButtonElement>, index?: number, course?: OptionalCourseType) => {
        e.preventDefault();
        setIsCoursePopupOpen(!isCoursePopupOpen);

        if (index !== undefined) {
            setSelectedCourseIndex(index); 
        } else {
            setSelectedCourseIndex(null);
        }

        if (course !== undefined) {
            setSelectedCourse({
                course_id: course.school_optional_course_id,
                course_lab: course.school_optional_course_lab,
                course_lab_preferred: course.school_optional_course_lab_preferred,
                course_credit_hours: course.school_optional_course_credit_hours,
                course_quarter_hours: course.school_optional_course_quarter_hours,
                course_note_section: course.school_optional_course_note_section,
            });
        } else {
            setSelectedCourse(null);
        }
    }

    const toggleNotePopup = (e: React.MouseEvent<HTMLButtonElement>, index?: number, note?: NewNote) => {
        e.preventDefault();
        setIsNotePopupOpen(!isNotePopupOpen);

        if (index !== undefined) {
            setSelectedNoteIndex(index); 
        } else {
            setSelectedNoteIndex(null);
        }

        if (note !== undefined) {
            setSelectedNote(note);
        } else {
            setSelectedNote(null);
        }
    }

    useEffect(() => {
        if (selectedPrereqArrItem) {
          setForm(selectedPrereqArrItem as RequiredOptionalCourseType);
        } else {
            setForm(defaultForm)
        }
    }, [selectedPrereqArrItem]);

    const addRequiredOptionalCourses = (name: string, path: string, requiredOptionalCourses: RequiredOptionalCourseType) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalDraftValue,
        } = handleModification(path, field, requiredOptionalCourses, 'add');

        const index = (originalDraftValue as RequiredOptionalCourseType[]).length;

        handleChanges(field, name, originalField, draftField, `${path}.${index}`, 'added');

    }

    const editRequiredOptionalCourses = (name: string, path: string, requiredOptionalCourses: RequiredOptionalCourseType, index: number) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const notePath = `${path}.${index}`;

        const {
            originalField,
            draftField,
            originalValue,
        } = handleModification(notePath, field, requiredOptionalCourses, 'modify');

        handleChanges(field, name, originalField, draftField, notePath, 'modified', originalValue, requiredOptionalCourses);

    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (selectedPrereqArrItem && selectedPrereqField.index !== undefined) {
            editRequiredOptionalCourses(selectedPrereqField.name, selectedPrereqField.path, form, selectedPrereqField.index);
        } else {
            addRequiredOptionalCourses(selectedPrereqField.name, selectedPrereqField.path, form);
        }

        togglePopup(e, null);
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.value;

        setForm({
            ...form,
            [name]: value,
        })
    };

    const deleteCourse = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setForm({
            ...form,
            school_required_optional_courses_list: form.school_required_optional_courses_list.filter((c, i) => i !== index)
        })
    }

    const handleSubmitCourse = (e: React.MouseEvent<HTMLButtonElement>, course: CourseForm) => {
        e.preventDefault();
        const existingCourses = form.school_required_optional_courses_list;
        const formattedCourse: OptionalCourseType = {
            school_optional_course_id: course.course_id,
            school_optional_course_lab: course.course_lab,
            school_optional_course_lab_preferred: course.course_lab_preferred,
            school_optional_course_credit_hours: course.course_credit_hours,
            school_optional_course_quarter_hours: course.course_quarter_hours,
            school_optional_course_note_section: course.course_note_section,
        } 

        let courseList: OptionalCourseType[] = [];

        if (selectedCourseIndex !== null) {
            courseList = existingCourses.map((c, i) => {
                if (i === selectedCourseIndex) {
                    return {...formattedCourse}
                } else {
                    return {...c}
                }
            })
        } else {
            courseList = existingCourses.concat(formattedCourse);
        }

        setForm({
            ...form,
            school_required_optional_courses_list: courseList,
        })

        toggleCoursePopup(e);
    };

    const deleteNote = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        setForm({
            ...form,
            notes: form.notes.filter((n, i) => i !== index)
        })
    }

    const handleSubmitNote = (e: React.MouseEvent<HTMLButtonElement>, note: NewNote) => {
        e.preventDefault();
        const existingNotes = form.notes;

        let noteList: NewNote[] = [];

        if (selectedNoteIndex !== null) {
            noteList = existingNotes.map((n, i) => {
                if (i === selectedNoteIndex) {
                    return {...note}
                } else {
                    return {...n}
                }
            })
        } else {
            noteList = existingNotes.concat(note);
        }

        setForm({
            ...form,
            notes: noteList,
        })

        toggleNotePopup(e);
    };


    return (
        <>
            <div className='fixed top-0 left-0 right-0 bottom-0 z-[100]'>
                <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                    <div className='w-full max-w-[600px] rounded-lg bg-white'>
                        <div className="flex justify-between items-center gap-6 p-6 border-b border-outline">
                            <p className="font-medium text-[24px]">{selectedPrereqArrItem ? 'Edit Required Optional Courses' : 'Add Required Optional Courses'}</p>
                            <button onClick={(e: any) => togglePopup(e, null)} className="w-[16px] text-placeholder hover:text-default transition-all"><CloseIcon /></button>
                        </div>

                        <div className="max-h-[600px] overflow-y-auto">
                        <div className='w-full p-6 flex flex-col justify-start items-start gap-8 w-full'>
                        
                            <TextInput 
                                label='Minimum number of courses that need to be completed'
                                placeholder='Minimum number of courses that need to be completed'
                                name='school_minimum_number_of_courses_to_be_completed'
                                value={form.school_minimum_number_of_courses_to_be_completed}
                                path=''
                                handleInput={handleInput}
                                isRequired={false}
                                isDisabled={false}
                                type='text'  
                                permissions={permissions}
                            />

                            <div className="flex flex-col gap-2 justify-start items-start">
                                <p>Courses:</p>
                                <div className="w-full flex flex-col gap-4 justify-start items-start">
                                    {form.school_required_optional_courses_list.map((optionalCourse, courseIndex) => {
                                        const course: CourseForm = {
                                            course_id: optionalCourse.school_optional_course_id,
                                            course_lab: optionalCourse.school_optional_course_lab,
                                            course_lab_preferred: optionalCourse.school_optional_course_lab_preferred,
                                            course_credit_hours: optionalCourse.school_optional_course_credit_hours,
                                            course_quarter_hours: optionalCourse.school_optional_course_quarter_hours,
                                            course_note_section: optionalCourse.school_optional_course_note_section,
                                        };
                                        return (
                                        <div className="w-full flex justify-between items-start gap-6">
                                            <Course course={course} toBeRemoved={false} tab="original"/>
                                            <div className="flex gap-4">
                                                <button 
                                                    onClick={(e: any) => toggleCoursePopup(e, courseIndex, optionalCourse)}
                                                    className="w-[24px] text-primary"
                                                >   
                                                    <EditIcon/>
                                                </button>
                                                <button 
                                                    onClick={(e:any) => deleteCourse(e, courseIndex)} 
                                                    className="w-[24px] text-warning"
                                                >
                                                    <DeleteIcon/>
                                                </button>
                                            </div>
                                        </div>
                                        )
                                        
                                    })}
                                </div>
                                <Button 
                                    label="Add Course"
                                    type="primary"
                                    styling="outline"
                                    action={toggleCoursePopup}
                                />
                            </div>


                            <div className="flex flex-col gap-2 justify-start items-start w-full">
                                <p>Notes:</p>
                                <div className="w-full flex flex-col gap-4 justify-start items-start">
                                    {form.notes.map((note, noteIndex) => {
                                        
                                        return (
                                        <div className="w-full flex justify-between items-start gap-6">
                                            <div className={`grow w-full flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
                                                <p className={`${note.type === 'requirement' ? 'text-warning' : 'text-primary'} text-[14px] font-medium`}>{note.type}</p>
                                                <ReactQuill 
                                                    theme='bubble'
                                                    value={note.note} 
                                                    readOnly={true} 
                                                    className='edited-quill'
                                                />
                                            </div>
                                            <div className="flex gap-4">
                                                <button 
                                                    onClick={(e: any) => toggleNotePopup(e, noteIndex, note)}
                                                    className="w-[24px] text-primary"
                                                >   
                                                    <EditIcon/>
                                                </button>
                                                <button 
                                                    onClick={(e:any) => deleteNote(e, noteIndex)} 
                                                    className="w-[24px] text-warning"
                                                >
                                                    <DeleteIcon/>
                                                </button>
                                            </div>
                                        </div>
                                        )
                                        
                                    })}
                                </div>
                                <Button 
                                    label="Add Note"
                                    type="primary"
                                    styling="outline"
                                    action={toggleNotePopup}
                                />
                            </div>
                            
                            
                        </div>
                        </div>
                        
                        <div className='w-full p-6 flex justify-end items-center gap-3 border-t border-outline'>
                            <Button 
                                label="Cancel"
                                action={(e:any) => togglePopup(e, null)}
                                type='default'
                                styling="outline"
                            />
                            <Button 
                                label={`${selectedPrereqArrItem ? 'Edit' : 'Add'} Required Optional Courses`}
                                action={handleSubmit}
                                type='primary'
                                styling="solid"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {isCoursePopupOpen && (
                <CoursePopup 
                    selectedCourse={selectedCourse}
                    toggleCoursePopup={toggleCoursePopup}
                    handleSubmit={handleSubmitCourse}
                    permissions={permissions}
                />
            )}
            {isNotePopupOpen && (
                <NotePopup 
                    selectedNote={selectedNote}
                    toggleNotePopup={toggleNotePopup}
                    handleSubmit={handleSubmitNote}
                />
            )}
        </>
    )
}