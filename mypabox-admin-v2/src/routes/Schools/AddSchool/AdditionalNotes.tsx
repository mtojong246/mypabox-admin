import React from 'react'

const AdditionalNotes = ({ handleInputChange }: any) => {

  return (
    <div className="mt-12 text-xl font-['Noto Sans']">
      <textarea className='mt-4 focus:outline-none h-80 rounded-2xl w-[80em] border border-black' 
       onChange={handleInputChange}/>
      <button className="absolute mt-96 -ml-[43em] border-2 h-12 w-36 rounded-xl text-orange-500 border-orange-400">
        Save & Finish
      </button>
    </div>
  )
}

export default AdditionalNotes