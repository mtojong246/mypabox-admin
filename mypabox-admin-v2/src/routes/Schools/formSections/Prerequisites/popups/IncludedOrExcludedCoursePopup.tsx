import { useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from '../../../../../components/Icons/X.svg';
import SelectInput from "../../../../../components/Form/InputTypes/SelectInput";
import { useSelector } from "react-redux";
import { selectCourses } from "../../../../../app/selectors/courses.selectors";
import ReactQuill from "react-quill";
import Button from "../../../../../components/Buttons/Button";


export interface IncludedOrExcludedCourseType {
    school_required_course_id: string;
    school_required_course_note: string;
}

const defaultForm: IncludedOrExcludedCourseType = {
    school_required_course_id: '',
    school_required_course_note: '',
}

export default function IncludedOrExcludedCoursePopup({
    selectedCourse,
    toggleCoursePopup,
    handleSubmit,
    courseOptions,
    courseType
}: {
    selectedCourse: IncludedOrExcludedCourseType | null, 
    toggleCoursePopup: (e: React.MouseEvent<HTMLButtonElement>, index?: number, course?: any) => void,
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>, form: IncludedOrExcludedCourseType, type: 'Included' | 'Excluded') => void,
    courseType: 'Included' | 'Excluded'
    courseOptions: { value: string, label: string }[],

}) {
    const [ form, setForm ] = useState<IncludedOrExcludedCourseType>(defaultForm);
    const courses = useSelector(selectCourses);

    useEffect(() => {
        if (selectedCourse) {
            setForm(selectedCourse)
        } else {
            setForm(defaultForm)
        }
    }, [selectedCourse]);

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
            school_required_course_note: note,
        })
    };

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-[100]'>
            <div className='fixed bg-[rgba(0,0,0,0.2)] top-0 left-0 right-0 bottom-0 flex justify-center items-center p-10'>
                <div className='w-full max-w-[600px] rounded-lg bg-white'>
                    <div className="flex justify-between items-center gap-6 p-6 border-b border-outline">
                        <p className="font-medium text-[24px]">{selectedCourse ? 'Edit Course' : 'Add Course'}</p>
                        <button onClick={toggleCoursePopup} className="w-[16px] text-placeholder hover:text-default transition-all"><CloseIcon /></button>
                    </div>

                    <div className="max-h-[600px] overflow-y-auto">
                        <div className='w-full p-6 flex flex-col justify-start items-start gap-8 w-full'>
                            {courseOptions.length > 0 && (
                                <SelectInput 
                                    label='Course'
                                    placeholder='Course'
                                    name='course_id'
                                    value={{ 
                                        value: form.school_required_course_id, 
                                        label: courses.find(course => course.unique_id === form.school_required_course_id) 
                                            ? courses.find(course => course.unique_id === form.school_required_course_id)!.course_name 
                                            : '' 
                                    }}
                                    path=''
                                    handleSelect={handleSelect}
                                    isRequired={false}
                                    isCreatable={false}
                                    isDisabled={false}
                                    options={courseOptions}
                                />
                            )}
                            
                            <div className='flex flex-col gap-2 justify-start items-start w-full mb-10'>
                                <label className='font-medium'>Note:</label>
                                <ReactQuill 
                                    theme="snow" 
                                    onChange={handleNote} 
                                    value={form.school_required_course_note}
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
                            action={toggleCoursePopup}
                            type='default'
                            styling="outline"
                        />
                        <Button 
                            label={`${selectedCourse ? 'Edit' : 'Add'} Course`}
                            action={(e:any) => handleSubmit(e, form, courseType)}
                            type='primary'
                            styling="solid"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}