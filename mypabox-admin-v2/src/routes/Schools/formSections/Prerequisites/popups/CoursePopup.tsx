import { useSelector } from "react-redux";
import { selectCourses } from "../../../../../app/selectors/courses.selectors";
import { ChangeEvent, useEffect, useState } from "react";
import { PrereqArrItemType, PrereqPopupType } from "../Prerequisites";
import { ReactComponent as CloseIcon } from '../../../../../components/Icons/X.svg';
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import BooleanInput from "../../../../../components/Form/InputTypes/BooleanInput";
import TextInput from "../../../../../components/Form/InputTypes/TextInput";
import ReactQuill from "react-quill";
import Button from "../../../../../components/Buttons/Button";
import { UserPermissions } from "../../../../../types/users.types";

export interface CourseForm {
    course_id: string;
    course_lab: boolean;
    course_lab_preferred: boolean;
    course_credit_hours: number;
    course_quarter_hours: number;
    course_note_section: string;
}

const defaultCourseForm: CourseForm = {
    course_id: '',
    course_lab: false,
    course_lab_preferred: false,
    course_credit_hours: 0,
    course_quarter_hours: 0,
    course_note_section: '',
}

export default function CoursePopup({
    selectedCourse,
    togglePopup,
    toggleCoursePopup,
    handleSubmit,
    permissions,
}: {
    selectedCourse: CourseForm | null, 
    togglePopup?: (e:React.MouseEvent<HTMLButtonElement>, type: PrereqPopupType | null, field?: { name: string, path: string, index?: number }, arrItem?: PrereqArrItemType) => void,
    toggleCoursePopup?: (e: React.MouseEvent<HTMLButtonElement>, index?: number, course?: any) => void,
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>, form: CourseForm) => void,
    permissions: UserPermissions

}) {
    const courses = useSelector(selectCourses);
    const [ courseOptions, setCourseOptions ] = useState<{value: string, label: string}[]>([]);
    const [ form, setForm ] = useState<CourseForm>(defaultCourseForm);

    useEffect(() => {
        if (selectedCourse) {
            setForm(selectedCourse)
        } else {
            setForm(defaultCourseForm)
        }
    }, [selectedCourse]);

    useEffect(() => {
        const options = courses.map(course => (
            { value: course.unique_id, label: course.course_name }
        ))
        setCourseOptions([{value: '', label: 'Select'}].concat(options))
    }, [courses]);


    const handleInput = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const value = e.target.value;

        setForm({
            ...form,
            [name]: value,
        })
    };

    const handleBoolean = (e: ChangeEvent<HTMLInputElement>, path: string) => {
        const name = e.target.name;
        const checked = e.target.checked;

        setForm({
            ...form,
            [name]: checked,
        })
    };

    const handleSelect = (e:any, name: string, path: string) => {
        const value = e.value;

        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleNote = (e:any) => {
        let note = '';
        if (e === '<p><br></p>') {
            note = '';
        } else {
            note = e
        }
        setForm({
            ...form,
            course_note_section: note,
        })
    };


    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-[100]'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[600px] rounded-lg bg-white'>
                    <div className="flex justify-between items-center gap-6 p-6 border-b border-outline">
                        <p className="font-medium text-[24px]">{selectedCourse ? 'Edit Course' : 'Add Course'}</p>
                        <button onClick={(e: any) => {
                            togglePopup ? togglePopup(e, null)
                            : toggleCoursePopup ? toggleCoursePopup(e)
                            : console.log(e);
                        }} className="w-[16px] text-placeholder hover:text-default transition-all"><CloseIcon /></button>
                    </div>

                    <div className="max-h-[600px] overflow-y-auto">
                        <div className='w-full p-6 flex flex-col justify-start items-start gap-8 w-full'>
                            {courseOptions.length > 0 && (
                                <SelectInput 
                                    label='Course'
                                    placeholder='Course'
                                    name='course_id'
                                    value={{ 
                                        value: form.course_id, 
                                        label: courses.find(course => course.unique_id === form.course_id) 
                                            ? courses.find(course => course.unique_id === form.course_id)!.course_name 
                                            : '' 
                                    }}
                                    path=''
                                    handleSelect={handleSelect}
                                    isRequired={false}
                                    isCreatable={false}
                                    isDisabled={false}
                                    options={courseOptions}
                                    permissions={permissions}
                                />
                            )}

                            <BooleanInput 
                                label='With Lab'
                                name='course_lab'
                                value={form.course_lab}
                                path=''
                                handleCheck={handleBoolean}
                                isRequired={false}
                                isDisabled={false}
                                permissions={permissions}
                            />

                            <BooleanInput 
                                label='Lab Preferred'
                                name='course_lab_preferred'
                                value={form.course_lab_preferred}
                                path=''
                                handleCheck={handleBoolean}
                                isRequired={false}
                                isDisabled={false}
                                permissions={permissions}
                            />

                            <TextInput 
                                label='Credit Hours'
                                placeholder='Credit Hours'
                                name='course_credit_hours'
                                value={form.course_credit_hours}
                                path=''
                                handleInput={handleInput}
                                isRequired={false}
                                isDisabled={false}
                                type='text'  
                                permissions={permissions}
                            />

                            <TextInput 
                                label='Quarter Hours'
                                placeholder='Quarter Hours'
                                name='course_quarter_hours'
                                value={form.course_quarter_hours}
                                path=''
                                handleInput={handleInput}
                                isRequired={false}
                                isDisabled={false}
                                type='text'  
                                permissions={permissions}
                            />
                            
                            <div className='flex flex-col gap-2 justify-start items-start w-full mb-10'>
                                <label className='font-medium'>Note:</label>
                                <ReactQuill 
                                    theme="snow" 
                                    onChange={handleNote} 
                                    value={form.course_note_section}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='w-full p-6 flex justify-end items-center gap-3 border-t border-outline'>
                        <Button 
                            label="Cancel"
                            action={(e: any) => {
                                togglePopup ? togglePopup(e, null)
                                : toggleCoursePopup ? toggleCoursePopup(e)
                                : console.log(e);
                            }}
                            type='default'
                            styling="outline"
                        />
                        <Button 
                            label={`${selectedCourse ? 'Edit' : 'Add'} Course`}
                            action={(e:any) => handleSubmit(e, form)}
                            type='primary'
                            styling="solid"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}