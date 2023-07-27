import React from 'react'
import ReactQuill from 'react-quill'

const MissionStatement = ({ newSchool, handleQuillInputChange, handleInputChange, openNotePopup, setNewSchool, removeNote, openEditPopup }: any) => {

  return (
    <form className="mt-10 pb-24 font-['Noto Sans'] min-h-screen">
      <div className="relative -ml-4 mt-10 max-w-[900px] p-5 border-[#B4B4B4]">
        <label className="absolute top-[-16px] text-xl bg-white">Mission Statement</label>
        <ReactQuill className='mt-4 h-96 rounded-2xl max-w-[900px]' theme="snow" value={newSchool.school_mission_statement} 
        onChange={(e) => handleQuillInputChange('school_mission_statement', e)} />
      </div>
    </form>
  )
}

export default MissionStatement