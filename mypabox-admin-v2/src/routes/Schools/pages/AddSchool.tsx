import { useNavigate } from "react-router-dom";
import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import AddSchoolForms from "../formSections/AddSchoolForms";
import { GenericSchoolField, NewSchool } from "../../../types/newSchools.types";
import { defaultSchool, schoolCategories } from "../../../utils/defaults";
import Button from "../../../components/Buttons/Button";
import { ReactComponent as AlertIcon } from '../../../components/Icons/Info.svg';
import { ReactComponent as ExternalLinkIcon } from '../../../components/Icons/External-Link.svg';

import { addUpdatedSchoolDoc, getAllCategories, getAllCourses, getAllUsers, updateUpdatedSchoolDoc } from "../../../utils/firebase/firebase.utils";
import { Course } from "../../../types/courses.types";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../../../app/slices/courses";
import { CategoryType } from "../../../types/categories.types";
import { setCategories } from "../../../app/slices/categories";
import { selectIsEditSchool, selectSelectedSchool } from "../../../app/selectors/selectedSchool.selectors";
import { setIsEditSchool, setSelectedSchool } from "../../../app/slices/selectedSchool";
import { selectNewSchools } from "../../../app/selectors/newSchools.selector";
import { addNewSchool, updateNewSchool } from "../../../app/slices/newSchools";
import { selectUsers } from "../../../app/selectors/users.selectors";
import { UserObject, UserPermissions } from "../../../types/users.types";
import { setUsers } from "../../../app/slices/users";
import { selectLogin } from "../../../app/selectors/login.selector";

const defaultPermissions = {
  canEditWithVerificationNeeded: false,
  canEditWithoutVerificationNeeded: true,
  canVerify: false,
  canMakeLive: false,
  canAddOrDelete: false,
};

export default function AddSchool() {
    const navigate = useNavigate();
    const [ tab, setTab ] = useState('#general-info');
    const [ school, setSchool ] = useState<NewSchool>(defaultSchool);
    const [ showChangesOnly, setShowChangesOnly ] = useState(false);
    const dispatch = useDispatch();
    const selectedSchool = useSelector(selectSelectedSchool);
    const newSchools = useSelector(selectNewSchools);
    const isEditSchool = useSelector(selectIsEditSchool);
    const users = useSelector(selectUsers);
    const login = useSelector(selectLogin);
    const [ assignee, setAssignee ] = useState('');
    const [ permissions, setPermissions ] = useState<UserPermissions>(defaultPermissions);

    
    useEffect(() => {
      const hasData = selectedSchool && Object.keys(selectedSchool).length > 0;
      if (hasData) {
        setSchool(selectedSchool);
      } else {
        setSchool(defaultSchool);
      }
    }, [selectedSchool]);

    useEffect(() => {

      const fetchUsers = async () => {
          try {
              const allUsers = await getAllUsers();
              let userData: UserObject[] = [];
              if (allUsers) {
                  allUsers.forEach(user => (
                      userData.push({
                          id: user.id,
                          displayName: user.data.displayName,
                          email: user.data.email,
                          isSuperAdmin: user.data.isSuperAdmin,
                          permissions: user.data.permissions,
                          activeTasks: user.data.activeTasks,
                          completedTasks: user.data.completedTasks,
                          archivedTasks: user.data.archivedTasks,
                      })
                  )) 
                  dispatch(setUsers(userData))
              }
  
          } catch (error: any) {
              console.log(error);
          }
      }
  
      fetchUsers();
  
  }, [dispatch]);

  useEffect(() => {
      if (users.length > 0 && login) {
          const currentUser = users.find(user => user.email === login);

          if (currentUser) {
              setPermissions(currentUser.permissions);
          } 
      }
  }, [users, login]);



    useEffect(() => {
      if (school.school_name.original.input) {
        const user = users.find(u => u.activeTasks.find(task => task.schools.includes(school.school_name.original.input)))
        if (user) setAssignee(user.displayName)
      }
     }, [school.school_name.original.input, users]);

    useEffect(() => {

      const fetchCourses = async () => {
          try {
              const allCourses = await getAllCourses();
              if  (allCourses) {
                  // Sorts course alphabetically
                  (allCourses as Course[]).sort(function (a, b) {
                      if (a.course_name < b.course_name) {
                          return -1;
                      }
                      if (a.course_name > b.course_name) {
                          return 1;
                      }
                      return 0;
                  })
                  dispatch(setCourses(allCourses));
              }
          } catch (error: any) {
              if (error.message === 'permission-denied') {
                  alert("Access denied. Please log in using the appropriate credentials");
                  navigate('/');
                  return;
                } else {
                  alert('Error loading course data')
                }
          }
      }
  
      fetchCourses();
  
  }, [dispatch, navigate]);
  
    useEffect(() => {
  
      const fetchCategories = async () => {
          try {
              const allCategories = await getAllCategories();
              if (allCategories) {
                  // Sorts course alphabetically
                  (allCategories as CategoryType[]).sort(function (a, b) {
                      if (a.category_name < b.category_name) {
                          return -1;
                      }
                      if (a.category_name > b.category_name) {
                          return 1;
                      }
                      return 0;
                  })
                  dispatch(setCategories(allCategories));
              } 
          } catch (error: any) {
              if (error.message === 'permission-denied') {
                  alert("Access denied. Please log in using the appropriate credentials");
                  navigate('/');
                  return;
              } else {
                  alert('Error loading course data')
              }
          }
      }
  
      fetchCategories();
    }, [dispatch, navigate]);

    const navigateTabs = (hash: string) => {
        navigate(`/schools/add-school${hash}`);
        setTab(hash);
    }

    const checkForChanges = (fields: string[]) => {
      let hasChanges = false;

      for (let i=0; i<fields.length; i++) {
        const schoolField = school[fields[i] as keyof NewSchool] as GenericSchoolField;
        if (schoolField) {
          const changes = schoolField.changes;
          if (changes && changes.length > 0) {
            hasChanges = true;
            break;
          }
        }
      }

      return hasChanges;
    }

    const updateSchool = async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const existingSchool = newSchools.find(s => s.id === school.id);

      if (!existingSchool) {
        try {
          const addedSchool = await addUpdatedSchoolDoc(school);
          dispatch(addNewSchool(addedSchool));
          dispatch(setSelectedSchool(addedSchool));
        } catch (err:any) {
          console.log(err);
        }
      } else {
        try {
          await updateUpdatedSchoolDoc(school, school.id);
          dispatch(updateNewSchool(school));
          dispatch(setSelectedSchool(school));
        } catch (err:any) {
          console.log(err);
        }
      }
    }

    const updateAction = async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const value = e.currentTarget.value;

      await updateSchool(e);

      if (value === 'done') {
        navigate('/schools');
        dispatch(setSelectedSchool(null));
        dispatch(setIsEditSchool(false));
      } 
    }

    const cancelAction = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      navigate('/schools');
      dispatch(setSelectedSchool(null));
      dispatch(setIsEditSchool(false));
    }

    const handleShowChanges = (e: ChangeEvent<HTMLInputElement>) => {
      setShowChangesOnly(e.target.checked);
    }



    return (
        <div className={`w-screen px-10 ont-['Noto Sans']`}>
          <div className={`w-full max-w-[1800px] mx-auto`}>

            {/* Header */}
            <div className={`w-full flex justify-between items-center pt-[120px] sticky bg-white z-50 top-0 border-b border-[#DCDCDC] ${window.scrollY === 180 ? '' : 'pb-2'}`}>
              <div className={`${window.scrollY === 180 ? '' : '-mt-28'}`}>
                <div className="flex justify-start items-center gap-4">
                        {school && school.school_logo.original.input && (
                          <div className="h-[80px] aspect-square">
                            <img src={school.school_logo.original.input} alt='school-logo' className="object-cover w-full"/>
                          </div>
                        )}
                        <div className="flex flex-col justify-center items-start gap-1">
                            <p className={`text-3xl font-medium`}>{isEditSchool ? 'Edit' : 'Add'} {school && school.school_name.original.input ? school.school_name.original.input : 'School'}</p>
                            <div className="flex justify-start items-center gap-2">
                            {school && school.school_website.original.input && (
                              <a href={school.school_website.original.input} target="_blank" rel="noreferrer" className="flex justify-start items-center gap-1 text-primary hover:underline transition-all">
                                <p>Visit website</p>
                                <div className="w-[16px]"><ExternalLinkIcon /></div>
                              </a>
                            )}
                            {assignee && <p>&#8226;</p>}
                            {assignee && <p>Assignee: {assignee}</p>}
                            </div>
                        </div>
                </div>
              </div>

              <div className={`flex gap-5 ${window.scrollY === 180 ? '' : '-mt-28'}`}>
                    <Button
                      type="success"
                      label="Save"
                      styling='outline'
                      action={updateAction}
                      value='save'
                    />
                    <Button
                      type="primary"
                      label="Finish"
                      styling='outline'
                      action={updateAction}
                      value='done'
                    />
                    <Button
                      type="warning"
                      label="Cancel"
                      styling='outline'
                      action={cancelAction}
                      value='cancel'
                    />
              </div>
            </div>

            {/* Side Navbar */}
            <div className={`flex justify-start items-start `}>
              <div className={`text-md py-4 side-max overflow-y-scroll sticky border-r border-[#DCDCDC]  pr-10 ${window.scrollY === 180 ? 'top-[210px]' : 'top-[135px]'}`}>
                <div className='flex flex-col justify-start items-start gap-5'>
                {schoolCategories.map(category => (
                  <button 
                    onClick={(e:any) => {
                      navigateTabs(category.hash); 
                      updateAction(e);
                      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
                    }} 
                    className={`whitespace-nowrap hover:text-warning transition-all ${category.hash === tab ? 'text-warning': ''}`}
                  >
                    <div className='flex justify-start items-center gap-1'>
                        {category.name}
                        {checkForChanges(category.fields) && <AlertIcon className='w-[16px] text-warning'/>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
    
            {/* Body */}
            <div className={`grow`}>
                <AddSchoolForms 
                    permissions={permissions}
                    tab={tab}
                    school={school}
                    setSchool={setSchool}
                    showChangesOnly={showChangesOnly}
                />
              {/* <Category tab={tab} newSchool={newSchool} setNewSchool={setNewSchool} handleInputChange={handleInputChange}
              handleCheck={handleCheck} handleQuillInputChange={handleQuillInputChange} openNotePopup={openNotePopup} openEditPopup={openEditPopup} removeNote={removeNote} /> */}
            </div>

            {permissions.canVerify && (
              <div className={`flex justify-start items-start sticky top-0 py-4 ${window.scrollY === 180 ? 'top-[210px]' : 'top-[135px]'}`}>
                <label className={`py-3 px-4 flex justify-end items-center gap-3 text-[14px] border border-outline hover:border-primary rounded hover:cursor-pointer hover:bg-primary/[0.1] hover:text-primary transition-all`}>
                  <input onChange={handleShowChanges} checked={showChangesOnly} type="checkbox" />
                  Show modified fields only
                </label>
              </div>
            )}
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