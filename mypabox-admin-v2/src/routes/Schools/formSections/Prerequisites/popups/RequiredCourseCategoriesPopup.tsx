import { ChangeEvent, useEffect, useState } from "react";
import { GenericSchoolField, NewSchool, NewNote } from "../../../../../types/newSchools.types";
import { PrereqArrItemType, PrereqPopupType } from "../Prerequisites";
import { ReactComponent as CloseIcon } from '../../../../../components/Icons/X.svg';
import { ReactComponent as EditIcon } from '../../../../../components/Icons/Edit-With-Line.svg';
import { ReactComponent as DeleteIcon } from '../../../../../components/Icons/Trash.svg';
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../../../app/selectors/categories.selectors";
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import ReactQuill from "react-quill";
import Button from "../../../../../components/Buttons/Button";
import NotePopup from "./NotePopup";
import IncludedOrExcludedCoursePopup, { IncludedOrExcludedCourseType } from "./IncludedOrExcludedCoursePopup";
import { selectCourses } from "../../../../../app/selectors/courses.selectors";
import { UserPermissions } from "../../../../../types/users.types";

export interface RequiredCourseCategoryType {
    school_required_course_category: string;
    school_required_course_category_number_of_credits_need_to_be_completed: number;
    school_required_course_category_number_of_quarter_hours_need_to_be_completed: number;
    school_required_course_category_number_of_courses_that_need_lab: number;
    school_required_course_category_extra_included_courses: {
        school_required_course_id: string;
        school_required_course_note: string;
    }[],
    school_required_course_category_excluded_courses: {
        school_required_course_id: string;
        school_required_course_note: string;
    }[],
    notes: NewNote[];
}

const defaultForm: RequiredCourseCategoryType = {
    school_required_course_category: '',
    school_required_course_category_number_of_credits_need_to_be_completed: 0,
    school_required_course_category_number_of_quarter_hours_need_to_be_completed: 0,
    school_required_course_category_number_of_courses_that_need_lab: 0,
    school_required_course_category_extra_included_courses: [],
    school_required_course_category_excluded_courses: [],
    notes: [],
}

export default function RequiredCourseCategoriesPopup({
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
    const [ form, setForm ] = useState<RequiredCourseCategoryType>(defaultForm);
    const categories = useSelector(selectCategories);
    const [ categoryOptions, setCategoryOptions ] = useState<{value: string, label: string}[]>([]);

    const courses = useSelector(selectCourses);
    const [ courseOptions, setCourseOptions ] = useState<{value: string, label: string}[]>([]);

    const [ selectedCourse, setSelectedCourse ] = useState<IncludedOrExcludedCourseType | null>(null);
    const [ selectedCourseIndex, setSelectedCourseIndex ] = useState<number | null>(null);
    const [ isCoursePopupOpen, setIsCoursePopupOpen ] = useState(false);
    const [ courseType, setCourseType ] = useState<'Included' | 'Excluded' | null>(null);

    const [ selectedNote, setSelectedNote ] = useState<NewNote | null>(null);
    const [ selectedNoteIndex, setSelectedNoteIndex ] = useState<number | null>(null);
    const [ isNotePopupOpen, setIsNotePopupOpen ] = useState(false);

    useEffect(() => {
        const options = categories.map(cat => (
            { value: cat.id, label: cat.category_name}
        ))
        setCategoryOptions([{value: '', label: 'Select'}].concat(options))
    }, [categories]);

    useEffect(() => {
        if (selectedPrereqArrItem) {
          setForm(selectedPrereqArrItem as RequiredCourseCategoryType);
        } else {
            setForm(defaultForm)
        }
    }, [selectedPrereqArrItem]);

    const addCourseCategory = (name: string, path: string, courseCategory: RequiredCourseCategoryType) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;

        const {
            originalField,
            draftField,
            originalDraftValue,
        } = handleModification(path, field, courseCategory, 'add');

        const index = (originalDraftValue as RequiredCourseCategoryType[]).length;

        handleChanges(field, name, originalField, draftField, `${path}.${index}`, 'added');

    }

    const editCourseCategory = (name: string, path: string, courseCategory: RequiredCourseCategoryType, index: number) => {
        const field = school[name as keyof NewSchool] as GenericSchoolField;
        const notePath = `${path}.${index}`;

        const {
            originalField,
            draftField,
            originalValue,
        } = handleModification(notePath, field, courseCategory, 'modify');

        handleChanges(field, name, originalField, draftField, notePath, 'modified', originalValue, courseCategory);

    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (selectedPrereqArrItem && selectedPrereqField.index !== undefined) {
            editCourseCategory(selectedPrereqField.name, selectedPrereqField.path, form, selectedPrereqField.index);
        } else {
            addCourseCategory(selectedPrereqField.name, selectedPrereqField.path, form);
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

    const handleSelect = (e: any, name: string, path: string) => {
        const value = e.value;

        setForm({
            ...form,
            [name]: value,
        })

        if (name === 'school_required_course_category') {
            const matchingCategory = categories.find(cat => cat.id === value);
            if (matchingCategory) {
                setCourseOptions(matchingCategory.courses.map(course => ({ value: course.course_id, label: course.course_name })))
            }
        }
    };

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

    const toggleCoursePopup = (e: React.MouseEvent<HTMLButtonElement>, index?: number, course?: IncludedOrExcludedCourseType, type?: 'Included' | 'Excluded') => {
        e.preventDefault();
        setIsCoursePopupOpen(!isCoursePopupOpen);

        if (index !== undefined) {
            setSelectedCourseIndex(index); 
        } else {
            setSelectedCourseIndex(null);
        }

        if (course !== undefined) {
            setSelectedCourse({
                school_required_course_id: course.school_required_course_id,
                school_required_course_note: course.school_required_course_note,
            });
        } else {
            setSelectedCourse(null);
        }

        if (type !== undefined) {
            setCourseType(type)
        } else {
            setCourseType(null);
        }
    };

    const deleteCourse = (e: React.MouseEvent<HTMLButtonElement>, index: number, type: 'Included' | 'Excluded') => {
        if (type === 'Included') {
            setForm({
                ...form,
                school_required_course_category_extra_included_courses: form.school_required_course_category_extra_included_courses.filter((c,i) => i !== index)
            })
        } else {
            setForm({
                ...form,
                school_required_course_category_excluded_courses: form.school_required_course_category_excluded_courses.filter((c,i) => i !== index)
            })
        }
    }

    const handleSubmitCourse = (e: React.MouseEvent<HTMLButtonElement>, course: IncludedOrExcludedCourseType, type: "Included" | 'Excluded') => {
        e.preventDefault();
        let existingCourses: IncludedOrExcludedCourseType[] = [];
        if (type === 'Included') {
            existingCourses = form.school_required_course_category_extra_included_courses
        } else {
            existingCourses = form.school_required_course_category_excluded_courses
        }

        let courseList: IncludedOrExcludedCourseType[] = [];

        if (selectedCourseIndex !== null) {
            courseList = existingCourses.map((c, i) => {
                if (i === selectedCourseIndex) {
                    return {...course}
                } else {
                    return {...c}
                }
            })
        } else {
            courseList = existingCourses.concat(course);
        }

        if (type === 'Included') {
            setForm({
                ...form,
                school_required_course_category_extra_included_courses: courseList
            })
        } else {
            setForm({
                ...form,
                school_required_course_category_excluded_courses: courseList,
            })
        }

        toggleCoursePopup(e);
    };

    return (
        <>
            <div className='fixed top-0 left-0 right-0 bottom-0 z-[100]'>
                <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                    <div className='w-full max-w-[600px] rounded-lg bg-white popup-max-height flex flex-col justify-start items-stretch'>
                        <div className="flex justify-between items-center gap-6 p-6 border-b border-outline">
                            <p className="font-medium text-[24px]">{selectedPrereqArrItem ? 'Edit Required Course Category' : 'Add Required Course Category'}</p>
                            <button onClick={(e: any) => togglePopup(e, null)} className="w-[16px] text-placeholder hover:text-default transition-all"><CloseIcon /></button>
                        </div>

                        <div className="grow overflow-y-auto">
                        <div className='w-full p-6 flex flex-col justify-start items-start gap-8 w-full'>

                            <SelectInput 
                                label="Course Category"
                                placeholder="Course Category"
                                name='school_required_course_category'
                                value={{ 
                                    value: form.school_required_course_category, 
                                    label: categories.find(cat => cat.id === form.school_required_course_category) ?   categories.find(cat => cat.id === form.school_required_course_category)!.category_name : ''
                                }}
                                path=""
                                handleSelect={handleSelect}
                                isCreatable={false}
                                isDisabled={false}
                                isRequired={false}
                                options={categoryOptions}
                                permissions={permissions}
                            />
                        
                            <TextInput 
                                label='Total number of credit hours that need to be completed'
                                placeholder='Total number of credit hours that need to be completed'
                                name='school_required_course_category_number_of_credits_need_to_be_completed'
                                value={form.school_required_course_category_number_of_credits_need_to_be_completed}
                                path=''
                                handleInput={handleInput}
                                isRequired={false}
                                isDisabled={false}
                                type='text'  
                                permissions={permissions}
                            />

                            <TextInput 
                                label='Total number of quarter hours that need to be completed'
                                placeholder='Total number of quarter hours that need to be completed'
                                name='school_required_course_category_number_of_quarter_hours_need_to_be_completed'
                                value={form.school_required_course_category_number_of_quarter_hours_need_to_be_completed}
                                path=''
                                handleInput={handleInput}
                                isRequired={false}
                                isDisabled={false}
                                type='text'  
                                permissions={permissions}
                            />

                            <TextInput 
                                label='Total number of courses that need lab'
                                placeholder='Total number of courses that need lab'
                                name='school_required_course_category_number_of_courses_that_need_lab'
                                value={form.school_required_course_category_number_of_courses_that_need_lab}
                                path=''
                                handleInput={handleInput}
                                isRequired={false}
                                isDisabled={false}
                                type='text'  
                                permissions={permissions}
                            />

                            <div className="w-full flex flex-col gap-2 justify-start items-start">
                                <p>Included courses:</p>
                                <div className="w-full flex flex-col gap-4 justify-start items-start">
                                    {form.school_required_course_category_extra_included_courses.map((includedCourse, includedCourseIndex) => {
                                        const matchingCourse = courses.find(course => course.unique_id === includedCourse.school_required_course_id);

                                        return (
                                        <div className="w-full flex justify-between items-start gap-6">
                                            <div className={`grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
                                                <p className="font-semibold">
                                                    {matchingCourse ? matchingCourse.course_name : ''}
                                                </p>
                                                {includedCourse.school_required_course_note && (
                                                    <div className="flex flex-col justify-start items-start gap-1">
                                                        <p>Note:</p>
                                                        <ReactQuill 
                                                            theme='bubble'
                                                            value={includedCourse.school_required_course_note} 
                                                            readOnly={true} 
                                                            className='edited-quill'
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-4">
                                                <button 
                                                    onClick={(e: any) => toggleCoursePopup(e, includedCourseIndex, includedCourse)}
                                                    className="w-[24px] text-primary"
                                                >   
                                                    <EditIcon/>
                                                </button>
                                                <button 
                                                    onClick={(e:any) => deleteCourse(e, includedCourseIndex, 'Included')} 
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
                                    label="Add Included Course"
                                    type="primary"
                                    styling="outline"
                                    action={(e:any) => toggleCoursePopup(e, undefined, undefined, 'Included')}
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2 justify-start items-start">
                                <p>Excluded courses:</p>
                                <div className="w-full flex flex-col gap-4 justify-start items-start">
                                    {form.school_required_course_category_excluded_courses.map((excludedCourse, excludedCourseIndex) => {
                                        const matchingCourse = courses.find(course => course.unique_id === excludedCourse.school_required_course_id);

                                        return (
                                        <div className="w-full flex justify-between items-start gap-6">
                                            <div className={`grow flex flex-col gap-4 p-4 justify-start items-start rounded-lg border border-outline`}>
                                                <p className="font-semibold">
                                                    {matchingCourse ? matchingCourse.course_name : ''}
                                                </p>
                                                {excludedCourse.school_required_course_note && (
                                                    <div className="flex flex-col justify-start items-start gap-1">
                                                        <p>Note:</p>
                                                        <ReactQuill 
                                                            theme='bubble'
                                                            value={excludedCourse.school_required_course_note} 
                                                            readOnly={true} 
                                                            className='edited-quill'
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-4">
                                                <button 
                                                    onClick={(e: any) => toggleCoursePopup(e, excludedCourseIndex, excludedCourse)}
                                                    className="w-[24px] text-primary"
                                                >   
                                                    <EditIcon/>
                                                </button>
                                                <button 
                                                    onClick={(e:any) => deleteCourse(e, excludedCourseIndex, 'Excluded')} 
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
                                    label="Add Excluded Course"
                                    type="primary"
                                    styling="outline"
                                    action={(e:any) => toggleCoursePopup(e, undefined, undefined, 'Excluded')}
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
            {isCoursePopupOpen && courseType && (
                <IncludedOrExcludedCoursePopup 
                    selectedCourse={selectedCourse}
                    toggleCoursePopup={toggleCoursePopup}
                    handleSubmit={handleSubmitCourse}
                    courseType={courseType}
                    courseOptions={courseOptions}
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