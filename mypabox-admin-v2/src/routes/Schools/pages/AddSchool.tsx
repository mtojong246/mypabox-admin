import { useNavigate } from "react-router-dom";
import { categories } from "../../../data/categories"
import { useState } from "react";

export default function AddSchool() {
    const navigate = useNavigate();
    const [ tab, setTab ] = useState('#general-info')

    const navigateTabs = (hash: string) => {
        navigate(`/schools/add-school${hash}`);
          setTab(hash);
      }

    return (
        <div className={`w-screen px-10 ont-['Noto Sans']`}>
          <div className={`w-full max-w-[1800px] mx-auto`}>

            {/* Header */}
            <div className={`w-full flex justify-between items-center pt-[120px] sticky bg-white z-50 top-0 border-b border-[#DCDCDC] ${window.scrollY === 180 ? '' : 'pb-2'}`}>
              <div className={`${window.scrollY === 180 ? '' : '-mt-28'}`}>
                <div className="flex justify-start items-start gap-2">
                        <div>
                            <p className={`text-4xl font-medium`}>Add School</p>
                            {/* {assignee && <p className='text-xl font-medium mt-1'>Assigned to: <span className='text-orange-600'>{assignee}</span></p>} */}
                        </div>
                        {/* <div className="flex flex-col justify-start items-start gap-1">
                        {newSchool.school_name.input && <p className="text-4xl font-medium">- {newSchool.school_name.input}</p>}
                        {newSchool.school_website.input && <a className="text-blue-600 pl-6 hover:underline max-w-[700px] truncate" href={newSchool.school_website.input} target="_blank" rel="noreferrer">{newSchool.school_website.input}</a>}
                        </div> */}
                </div>
              </div>

              <div className={`flex gap-5 ${window.scrollY === 180 ? '' : '-mt-28'}`}>
                    <button value='save' className='border-2 border-[#4FC769] text-[#4FC769] h-[50px] w-[84px] rounded hover:text-white hover:bg-[#4FC769] flex justify-center items-center'>
                        Save
                    </button>
                    <button value='done' className='border-2 border-blue-500 text-blue-500 rounded h-[50px] w-[84px] hover:text-white hover:bg-blue-500 flex justify-center items-center'>
                        Finish
                    </button>
                    <button className='border-2 border-red-400 text-red-400 rounded h-[50px] px-5 hover:text-white hover:bg-red-400'>
                            Cancel
                    </button>
              </div>
            </div>

            {/* Side Navbar */}
            <div className={`flex justify-start items-start gap-10 `}>
              <div className={`text-md py-4 side-max overflow-y-scroll sticky border-r border-[#DCDCDC]  pr-10 ${window.scrollY === 180 ? 'top-[210px]' : 'top-[135px]'}`}>
                <div className='flex flex-col justify-start items-start gap-5'>
                {categories.map(category => (
                  <button 
                    onClick={(e:any) => {navigateTabs(category.hash)}} 
                    className={`whitespace-nowrap ${category.hash === tab ? 'text-red-500' : ''}`}
                  >
                    <div className='flex justify-start items-center gap-[2px]'>
                        {category.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
    
            {/* Body */}
            <div className={`grow`}>
              {/* <Category tab={tab} newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange}
              handleCheck={handleCheck} handleQuillInputChange={handleQuillInputChange} openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote} /> */}
            </div>
          </div>
    
        </div>
        {/* {openNote && <AddNote currentInput={currentInput} addNote={addNote} toggleNote={toggleNote} />}
        {openEdit && <EditNote currentInput={currentInput} note={note} index={index} toggleEdit={toggleEdit} editNote={editNote}/>} */}
        {/* {isCancelOpen && <CancelPopup toggleDelete={toggleCancelPopup} cancel={cancel} />}
        {<Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Progress Saved"
            action={action}
          />} */}
    
      </div>
      )
}