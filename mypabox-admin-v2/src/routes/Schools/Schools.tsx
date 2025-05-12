import { useEffect, useContext, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getAllCourses, getAllCategories, getAllUsers, getUpdatedSchoolsAndDocuments, updateUpdatedSchoolDoc } from '../../utils/firebase/firebase.utils';
import { setUsers } from '../../app/slices/users';
import { AppDispatch } from '../../app/store';
import { SchoolContext } from '../../useContext';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../types/courses.types';
import { CategoryType } from '../../types/categories.types';
import { setCourses } from '../../app/slices/courses';
import { setCategories } from '../../app/slices/categories';
import DeleteSchoolPopup from './DeleteSchoolPopup';
import { selectLogin } from '../../app/selectors/login.selector';
import { selectUsers } from '../../app/selectors/users.selectors';
import { UserObject } from '../../types/users.types';
import { HiOutlineSignal } from "react-icons/hi2";
import { NewSchool } from '../../types/newSchools.types';
import { selectNewSchools } from '../../app/selectors/newSchools.selector';
import { setNewSchools, updateNewSchool } from '../../app/slices/newSchools';
import { ReactComponent as EditIcon } from '../../components/Icons/Edit-With-Line.svg';
import { ReactComponent as DeleteIcon } from '../../components/Icons/Trash.svg';
import IconButton from '../../components/Buttons/IconButton';
import Button from '../../components/Buttons/Button';
import { ReactComponent as PlusIcon } from '../../components/Icons/Plus.svg';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Schools = () => {
  const login = useSelector(selectLogin);
  const users = useSelector(selectUsers);
  const newSchools = useSelector(selectNewSchools);
  const dispatch: AppDispatch = useDispatch()
  const { stateSearch, schoolName, setStateSearch, setToggleSideMenu } = useContext(SchoolContext)
  const navigate = useNavigate();
  const [ deletePopup, setDeletePopup ] = useState(false);
  const [ schoolToDelete, setSchoolToDelete ] = useState<{ name: string, id: string } | null>(null);
  const [ canEdit, setCanEdit ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ loggedInUser, setLoggedInUser ] = useState<UserObject>({
    id: '',
    displayName: '',
    email: '',
    isSuperAdmin: false,
    permissions: {
        canEditWithoutVerificationNeeded: false,
        canEditWithVerificationNeeded: false,
        canVerify: false,
        canMakeLive: false,
        canAddOrDelete: false,
    },
    activeTasks: [],
    completedTasks: [],
    archivedTasks: [],
  })

  const toggleDelete = (e:React.MouseEvent<HTMLButtonElement>, deleteInfo?: { name: string, id: string }) => {
    e.preventDefault();
    setDeletePopup(!deletePopup)

    if (deleteInfo !== undefined) {
      const { name, id } = deleteInfo;
      setSchoolToDelete({ name, id });
    } else {
      setSchoolToDelete(null);
    }
  };

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
            if (error.message === 'permission-denied') {
                alert("Access denied. Please log in using the appropriate credentials");
                navigate('/');
                return;
              } else {
                alert('Error loading user data')
              }
        }
    }

    fetchUsers();

}, [dispatch, navigate]);

  useEffect(() => {
    const currentUser = users.find(user => user.email === login);
    if (currentUser) {
        setLoggedInUser(currentUser);

        if (currentUser.permissions.canEditWithVerificationNeeded || currentUser.permissions.canEditWithoutVerificationNeeded) {
          setCanEdit(true);
        } else {
          setCanEdit(false);
        }
    }
}, [login, users]);


  useEffect(() => {
    setStateSearch([])
    const fetchNewSchools = async () => {
      setIsLoading(true);
      try {
        // fetches schools from firebase db and dispatches school action, which updates the schools array 
        // that's stored in the school reducer
        const allSchools = await getUpdatedSchoolsAndDocuments();
        if (allSchools) {
          // Sorts schools by name alphabetically
          (allSchools as NewSchool[]).sort(function (a, b) {
            if (a.school_name.original.input < b.school_name.original.input) {
                return -1;
            }
            if (a.school_name.original.input > b.school_name.original.input) {
                return 1;
            }
            return 0;
        })
          dispatch(setNewSchools(allSchools));
        }
      } catch (error: any) {
        // throws error and navigates to main page if user is not authenticated 
        if (error.message === 'permission-denied') {
          alert("Access denied. Please log in using the appropriate credentials");
          navigate('/');
          return;
        } else {
          alert('Error loading school data')
        }
      }
      setIsLoading(false);
    }

    fetchNewSchools();

  }, [dispatch, navigate, setStateSearch]);


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

  useEffect(() => {
    setToggleSideMenu(false)
    //eslint-disable-next-line
  }, [])
  

  const addSchoolButton = () => {
    // dispatch(setIsEditSchool(false));
    // dispatch(setSelectedSchool(defaultSchool))
    navigate('/schools/add-school');
  };


  const editSchool = (school: NewSchool) => {
    // dispatch(setIsEditSchool(true));
    // dispatch(setSelectedSchool(school));
    navigate(`/schools/edit-school/${school.id}`);
  };

  const changeLiveStatus = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    if (!loggedInUser.permissions.canMakeLive) return;
    const selectedSchool = newSchools.find(school => school.id === id);
    if (selectedSchool) {
      const updatedSchool = {
        ...selectedSchool,
        isLive: !selectedSchool.isLive,
      }
      try {
        await updateUpdatedSchoolDoc(updatedSchool, updatedSchool.id);
        // await addDocToSchoolCollection(updatedSchool, updatedSchool.id);
        dispatch(updateNewSchool(updatedSchool));
      } catch (error:any) {
        alert('Error changing live status of selected school');
      }
    }
  }




  return (
    <>
    <div className="w-screen font-['Noto Sans']">
      <div className='w-full max-w-[1800px] mx-auto'>

      {/* Filter 1: The school name is converted to all lowercase letters and then the includes method is ran so that the only
          schools that are shown are the schools that matches the search input  
          Filter 2: If the state search length is 0 the item will be shown, if not the includes method is ran so the only schools
          that are shown are the school who's state is included in the stateSearch array
          After the filters are ran, the remaining schools array is then mapped through and the schools data is displayed
      */}
      <div className={`w-full flex justify-between items-start p-10 bg-white sticky top-[76px] z-10`}>
        <div>
          {isLoading ? (
            <div className='flex flex-col justify-start items-start gap-1'>
              <div className='w-[170px] h-[72px]'><Skeleton height='100%' width='100%'/></div>
              <div className='w-[170px] h-[28px]'><Skeleton height='100%' width='100%'/></div>
            </div>
          ) : (
            <>
              <p className='text-[48px] font-medium'>Schools</p>
              <p className='text-xl'>Total: {newSchools.length}</p>
            </>
          )}
          
        </div>

        {isLoading ? (
          <div className='w-[140px] h-[50px]'><Skeleton width='100%' height='100%'/></div>
        ) : (
          <>
          {loggedInUser.permissions.canAddOrDelete && (
            <Button 
              type='warning'
              styling='outline'
              label='Add School'
              action={addSchoolButton}
              adornment={<PlusIcon/>}
            />
          )}
          </>
        )}

    
      </div>
      <div className={`w-full max-w-[1800px] px-10 pb-10`}>
      <div className={`w-full rounded-t-xl shadow-lg 
      shadow-gray-600`}>
        <table className='w-full relative'>
          <thead className='bg-[#eeeef2] mt-8 sticky top-[256px] z-20'>
            <tr>
              {isLoading ? (
                <>
                {Array.from(Array(5).keys()).map(key => (
                  <th scope="col" className='font-semibold text-xl text-left p-[10px]'>
                    <Skeleton width='100%' height='100%'/>
                  </th>
                ))}
                </>
              ) : (
                <>
                <th scope="col" className='font-semibold text-xl text-left p-[10px]'>Logo</th>
                <th scope="col" className='font-semibold text-xl text-left p-[10px]'>Name</th>
                <th scope="col" className='font-semibold text-xl text-left p-[10px]'>City</th>
                <th scope="col" className='font-semibold text-xl text-left p-[10px]'>State</th>
                <th scope='col' className='font-semibold text-xl text-right p-[10px]'>Live Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
          {isLoading ? (
            <>
            {Array.from(Array(5).keys()).map(key => (
              <tr className="border-b-[0.125px] border-gray-400">
                {Array.from(Array(5).keys()).map(cellKey => (
                  <td className='p-[10px] h-[80px]'>
                    <Skeleton width='100%' height='100%'/>
                  </td>
                ))}
              </tr>
            ))}
            </>
          ) : (
            <>
            {newSchools && newSchools.filter(school => school.school_name.original.input.toLowerCase().includes(schoolName)).filter(item => stateSearch.length === 0 ?
                item : stateSearch.includes(item.school_state.original.input)).map((d, i) => (
                  <tr className="border-b-[0.125px] border-gray-400">
                    <td className='p-[10px]'>
                      <div className='w-[80px] aspect-square border border-outline'>
                        {d.school_logo.original.input && (
                          <img src={d.school_logo.original.input} alt='school-logo' className='w-full object-cover'/>
                        )}
                      </div>
                    </td>
                    <td className='text-xl text-left p-[10px]'>{d.school_name.original.input}</td>
                    <td className='text-xl text-left p-[10px]'>{d.school_city.original.input}</td>
                    <td className='text-xl text-left p-[10px]'>{d.school_state.original.input}</td>
                    <td className='p-[10px]'>
                      <div className='flex justify-end items-center gap-2'> 
                      {canEdit && (
                        <IconButton 
                            action={(e: any) => editSchool(d)}
                            icon={<EditIcon/>}
                            color="primary"
                            isDisabled={false}
                        />
                      )}
                      {loggedInUser.permissions.canAddOrDelete && (
                        <IconButton 
                            action={(e: any) => toggleDelete(e, { name: d.school_name.original.input, id: d.id })}
                            icon={<DeleteIcon/>}
                            color="warning"
                            isDisabled={false}
                        />
                      )}
                      <button onClick={(e:MouseEvent<HTMLButtonElement>) => changeLiveStatus(e, d.id)}><HiOutlineSignal className={`h-7 w-7 ml-2 ${d.isLive ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`}/></button>
                      </div>
                    </td>
                  </tr>
                )
              )
            }
          </>
          )}
          </tbody>
        </table>
        </div>
      </div>
      </div>
      {/* If openForm is true, the add school form will be shown, if not it will stay hidden */}
    </div>
    {deletePopup && schoolToDelete && <DeleteSchoolPopup toggleDelete={toggleDelete} schoolToDelete={schoolToDelete}/>}
    </>
  )
}

export default Schools