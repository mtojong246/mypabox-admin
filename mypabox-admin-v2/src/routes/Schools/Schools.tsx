import { useEffect, useContext, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSchools } from '../../app/selectors/schools.selectors';
import {  getSchoolsAndDocuments, getAllCourses, getAllCategories, addDocToSchoolCollection, getAllUsers, getUpdatedSchoolsAndDocuments } from '../../utils/firebase/firebase.utils';
import { setSchools } from '../../app/slices/schools';
import { setUsers } from '../../app/slices/users';
import { AppDispatch } from '../../app/store';
import { SchoolContext } from '../../useContext';
import { useNavigate } from 'react-router-dom';
import { School } from '../../types/schools.types';
import { Course } from '../../types/courses.types';
import { CategoryType } from '../../types/categories.types';
import { setCourses } from '../../app/slices/courses';
import { setCategories } from '../../app/slices/categories';
import DeleteSchoolPopup from './DeleteSchoolPopup';
import { selectLogin } from '../../app/selectors/login.selector';
import { selectUsers } from '../../app/selectors/users.selectors';
import { UserObject } from '../../types/users.types';
import { HiOutlineSignal } from "react-icons/hi2";
import { editSchoolData } from '../../app/slices/schools';
import { mockUser } from '../../data/defaultValues';
import { setIsEditSchool, setSelectedSchool } from '../../app/slices/selectedSchool';
import { defaultSchool } from '../../utils/defaults';
import { NewSchool } from '../../types/newSchools.types';
import { selectNewSchools } from '../../app/selectors/newSchools.selector';
import { setNewSchools } from '../../app/slices/newSchools';
import { ReactComponent as EditIcon } from '../../components/Icons/Edit-With-Line.svg';
import { ReactComponent as DeleteIcon } from '../../components/Icons/Trash.svg';
import IconButton from '../../components/Buttons/IconButton';


const Schools = () => {
  const login = useSelector(selectLogin);
  const users = useSelector(selectUsers);
  const schools = useSelector(selectSchools);
  const newSchools = useSelector(selectNewSchools);
  const dispatch: AppDispatch = useDispatch()
  const { stateSearch, schoolName, setStateSearch, setToggleSideMenu } = useContext(SchoolContext)
  const navigate = useNavigate();
  const [ deletePopup, setDeletePopup ] = useState(false);
  const [ schoolToDelete, setSchoolToDelete ] = useState<{ name: string, id: string } | null>(null);
  const [ canEdit, setCanEdit ] = useState(false);
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

        if (mockUser.permissions.canEditWithVerificationNeeded || mockUser.permissions.canEditWithoutVerificationNeeded) {
          setCanEdit(true);
        } else {
          setCanEdit(false);
        }
    }
}, [login, users]);


  useEffect(() => {
    setStateSearch([])
    
    const fetchSchools = async () => {
      try {
        // fetches schools from firebase db and dispatches school action, which updates the schools array 
        // that's stored in the school reducer
        const allSchools = await getSchoolsAndDocuments();
        if (allSchools) {
          // Sorts schools by name alphabetically
          (allSchools as School[]).sort(function (a, b) {
            if (a.school_name.input < b.school_name.input) {
                return -1;
            }
            if (a.school_name.input > b.school_name.input) {
                return 1;
            }
            return 0;
        })
          dispatch(setSchools(allSchools));
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
    }

    fetchSchools();

  }, [dispatch, navigate, setStateSearch]);

  useEffect(() => {
    
    const fetchNewSchools = async () => {
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
    }

    fetchNewSchools();

  }, [dispatch, navigate, setStateSearch]);

  useEffect(() => {
    if (schools.length > 0) {
      schools.forEach(school => {
        let newSchool: NewSchool = defaultSchool;

        newSchool = {
          ...defaultSchool,
          id: school.id,
          isLive: school.isLive,
          school_name: {
            ...defaultSchool.school_name,
            original: {
              input: school.school_name.input,
            },
            draft: {
              input: school.school_name.input,
            },
          },
          school_logo: {
            ...defaultSchool.school_logo,
            original: {
              input: school.school_logo.input,
            },
            draft: {
              input: school.school_logo.input,
            },
          },
          school_street: {
            ...defaultSchool.school_street,
            original: {
              input: school.school_street.input,
            },
            draft: {
              input: school.school_street.input,
            },
          },
          school_city: {
            ...defaultSchool.school_city,
            original: {
              input: school.school_city.input,
            },
            draft: {
              input: school.school_city.input,
            },
          },
          school_state: {
            ...defaultSchool.school_state,
            original: {
              input: school.school_state.input,
            },
            draft: {
              input: school.school_state.input,
            },
          },
          school_zip_code: {
            ...defaultSchool.school_zip_code,
            original: {
              input: school.school_zip_code.input,
            },
            draft: {
              input: school.school_zip_code.input,
            },
          },
          school_country: {
            ...defaultSchool.school_country,
            original: {
              input: school.school_country.input,
            },
            draft: {
              input: school.school_country.input,
            },
          },
          school_website: {
            ...defaultSchool.school_website,
            original: {
              input: school.school_website.input,
            },
            draft: {
              input: school.school_website.input,
            },
          },
          school_email: {
            ...defaultSchool.school_email,
            original: {
              input: school.school_email.input,
              notes: school.school_email.notes,
            },
            draft: {
              input: school.school_email.input,
              notes: school.school_email.notes,
            },
          },
          school_phone_number: {
            ...defaultSchool.school_phone_number,
            original: {
              input: school.school_phone_number.input,
              notes: school.school_phone_number.notes,
            },
            draft: {
              input: school.school_phone_number.input,
              notes: school.school_phone_number.notes,
            },
          },
          school_campus_location: {
            ...defaultSchool.school_campus_location,
            original: {
              input: school.school_campus_location.input,
              notes: school.school_campus_location.notes,
            },
            draft: {
              input: school.school_campus_location.input,
              notes: school.school_campus_location.notes,
            },
          },
          school_start_month: {
            ...defaultSchool.school_start_month,
            original: {
              input: school.school_start_month.input,
              notes: school.school_start_month.notes,
            },
            draft: {
              input: school.school_start_month.input,
              notes: school.school_start_month.notes,
            },
          },
          school_class_capacity: {
            ...defaultSchool.school_class_capacity,
            original: {
              input: school.school_class_capacity.input,
              notes: school.school_class_capacity.notes,
            },
            draft: {
              input: school.school_class_capacity.input,
              notes: school.school_class_capacity.notes,
            },
          },
          school_duration_full_time: {
            ...defaultSchool.school_duration_full_time,
            original: {
              input: school.school_duration_full_time.input,
              notes: school.school_duration_full_time.notes,
            },
            draft: {
              input: school.school_duration_full_time.input,
              notes: school.school_duration_full_time.notes,
            },
          },
          school_duration_part_time: {
            ...defaultSchool.school_duration_part_time,
            original: {
              input: school.school_duration_part_time.input,
              notes: school.school_duration_part_time.notes,
            },
            draft: {
              input: school.school_duration_part_time.input,
              notes: school.school_duration_part_time.notes,
            },
          },
          school_seat_deposit_in_state: {
            ...defaultSchool.school_seat_deposit_in_state,
            original: {
              input: school.school_seat_deposit_in_state.input,
              notes: school.school_seat_deposit_in_state.notes,
            },
            draft: {
              input: school.school_seat_deposit_in_state.input,
              notes: school.school_seat_deposit_in_state.notes,
            },
          },
          school_seat_deposit_out_of_state: {
            ...defaultSchool.school_seat_deposit_out_of_state,
            original: {
              input: school.school_seat_deposit_out_of_state.input,
              notes: school.school_seat_deposit_out_of_state.notes,
            },
            draft: {
              input: school.school_seat_deposit_out_of_state.input,
              notes: school.school_seat_deposit_out_of_state.notes,
            },
          },
          school_rolling_admissions: {
            ...defaultSchool.school_rolling_admissions,
            original: {
              input: school.school_rolling_admissions.input,
              notes: school.school_rolling_admissions.notes,
            },
            draft: {
              input: school.school_rolling_admissions.input,
              notes: school.school_rolling_admissions.notes,
            },
          },
          school_nonrolling_admissions: {
            ...defaultSchool.school_nonrolling_admissions,
            original: {
              input: school.school_nonrolling_admissions.input,
              notes: school.school_nonrolling_admissions.notes,
            },
            draft: {
              input: school.school_nonrolling_admissions.input,
              notes: school.school_nonrolling_admissions.notes,
            },
          },
          school_pre_pa_curriculum: {
            ...defaultSchool.school_pre_pa_curriculum,
            original: {
              input: school.school_pre_pa_curriculum.input,
              notes: school.school_pre_pa_curriculum.notes,
            },
            draft: {
              input: school.school_pre_pa_curriculum.input,
              notes: school.school_pre_pa_curriculum.notes,
            },
          },
          school_direct_high_school_entry: {
            ...defaultSchool.school_direct_high_school_entry,
            original: {
              input: school.school_direct_high_school_entry.input,
              notes: school.school_direct_high_school_entry.notes,
            },
            draft: {
              input: school.school_direct_high_school_entry.input,
              notes: school.school_direct_high_school_entry.notes,
            },
          },
          school_part_time_option: {
            ...defaultSchool.school_part_time_option,
            original: {
              input: school.school_part_time_option.input,
              notes: school.school_part_time_option.notes,
            },
            draft: {
              input: school.school_part_time_option.input,
              notes: school.school_part_time_option.notes,
            },
          },
          school_online_learning: {
            ...defaultSchool.school_online_learning,
            original: {
              input: school.school_online_learning.input,
              notes: school.school_online_learning.notes,
            },
            draft: {
              input: school.school_online_learning.input,
              notes: school.school_online_learning.notes,
            },
          },
          school_on_campus_housing: {
            ...defaultSchool.school_on_campus_housing,
            original: {
              input: school.school_on_campus_housing.input,
              notes: school.school_on_campus_housing.notes,
            },
            draft: {
              input: school.school_on_campus_housing.input,
              notes: school.school_on_campus_housing.notes,
            },
          },
          school_cadaver_lab: {
            ...defaultSchool.school_cadaver_lab,
            original: {
              input: school.school_cadaver_lab.input,
              notes: school.school_cadaver_lab.notes,
            },
            draft: {
              input: school.school_cadaver_lab.input,
              notes: school.school_cadaver_lab.notes,
            },
          },
          school_faith_based_learning: {
            ...defaultSchool.school_faith_based_learning,
            original: {
              input: school.school_faith_based_learning.input,
              notes: school.school_faith_based_learning.notes,
            },
            draft: {
              input: school.school_faith_based_learning.input,
              notes: school.school_faith_based_learning.notes,
            },
          },
          school_military_personnel_preference: {
            ...defaultSchool.school_military_personnel_preference,
            original: {
              input: school.school_military_personnel_preference.input,
              notes: school.school_military_personnel_preference.notes,
            },
            draft: {
              input: school.school_military_personnel_preference.input,
              notes: school.school_military_personnel_preference.notes,
            },
          },
          school_holistic_review: {
            ...defaultSchool.school_holistic_review,
            original: {
              input: school.school_holistic_review.input,
              notes: school.school_holistic_review.notes,
            },
            draft: {
              input: school.school_holistic_review.input,
              notes: school.school_holistic_review.notes,
            },
          },
          school_general_information: {
            ...defaultSchool.school_general_information,
            original: {
              input: school.school_general_information,
            },
            draft: {
              input: school.school_general_information,
            },
          },
          school_dual_degree_program: {
            ...defaultSchool.school_dual_degree_program,
            original: {
              input: school.school_dual_degree_program.input,
              notes: school.school_dual_degree_program.notes,
            },
            draft: {
              input: school.school_dual_degree_program.input,
              notes: school.school_dual_degree_program.notes,
            },
          },
          school_bachelors_degree_required: {
            ...defaultSchool.school_bachelors_degree_required,
            original: {
              input: school.school_bachelors_degree_required.input,
              notes: school.school_bachelors_degree_required.notes,
            },
            draft: {
              input: school.school_bachelors_degree_required.input,
              notes: school.school_bachelors_degree_required.notes,
            },
          },
          school_type_of_degree_offered: {
            ...defaultSchool.school_type_of_degree_offered,
            original: {
              input: school.school_type_of_degree_offered.fields.map(field => ({ value: field })),
              notes: school.school_type_of_degree_offered.notes,
            },
            draft: {
              input: school.school_type_of_degree_offered.fields.map(field => ({ value: field })),
              notes: school.school_type_of_degree_offered.notes,
            },
          },
          school_accreditation_status: {
            ...defaultSchool.school_accreditation_status,
            original: {
              input: school.school_accreditation_status.input,
              notes: school.school_accreditation_status.notes,
            },
            draft: {
              input: school.school_accreditation_status.input,
              notes: school.school_accreditation_status.notes,
            },
          },
          school_mission_statement: {
            ...defaultSchool.school_mission_statement,
            original: {
              input: school.school_mission_statement.input,
            },
            draft: {
              input: school.school_mission_statement.input,
            },
          },
          school_in_state_tuition: {
            ...defaultSchool.school_in_state_tuition,
            original: {
              input: school.school_in_state_tuition.input,
              notes: school.school_in_state_tuition.notes,
            },
            draft: {
              input: school.school_in_state_tuition.input,
              notes: school.school_in_state_tuition.notes,
            },
          },
          school_out_of_state_tuition: {
            ...defaultSchool.school_out_of_state_tuition,
            original: {
              input: school.school_out_of_state_tuition.input,
              notes: school.school_out_of_state_tuition.notes,
            },
            draft: {
              input: school.school_out_of_state_tuition.input,
              notes: school.school_out_of_state_tuition.notes,
            },
          },
          school_first_time_pass_rate: {
            ...defaultSchool.school_first_time_pass_rate,
            original: {
              input: school.school_first_time_pass_rate.input,
              notes: school.school_first_time_pass_rate.notes,
            },
            draft: {
              input: school.school_first_time_pass_rate.input,
              notes: school.school_first_time_pass_rate.notes,
            },
          },
          school_average_five_year_first_time_pass_rate: {
            ...defaultSchool.school_average_five_year_first_time_pass_rate,
            original: {
              input: school.school_average_five_year_first_time_pass_rate.input,
              notes: school.school_average_five_year_first_time_pass_rate.notes,
            },
            draft: {
              input: school.school_average_five_year_first_time_pass_rate.input,
              notes: school.school_average_five_year_first_time_pass_rate.notes,
            },
          },
          school_pance_pass_rate_note: {
            ...defaultSchool.school_pance_pass_rate_note,
            original: {
              input: school.school_pance_pass_rate_note,
            },
            draft: {
              input: school.school_pance_pass_rate_note,
            },
          },
          school_minimum_gpa_required: {
            ...defaultSchool.school_minimum_gpa_required,
            original: {
              input: {
                school_minimum_gpa_required: {
                  input: school.school_minimum_gpa_required.input,
                },
                school_minimum_overall_gpa_required: school.school_minimum_gpa_required.school_minimum_overall_gpa_required ? {
                    input: school.school_minimum_gpa_required.school_minimum_overall_gpa_required.input,
                    notes: school.school_minimum_gpa_required.school_minimum_overall_gpa_required.notes,
                } : null,
                school_minimum_science_gpa_required: school.school_minimum_gpa_required.school_minimum_science_gpa_required ?  {
                    input: school.school_minimum_gpa_required.school_minimum_science_gpa_required.input,
                    notes: school.school_minimum_gpa_required.school_minimum_science_gpa_required.notes,
                } : null,
                school_minimum_prerequisite_gpa_required: school.school_minimum_gpa_required.school_minimum_prerequisite_gpa_required ?  {
                    input: school.school_minimum_gpa_required.school_minimum_prerequisite_gpa_required.input,
                    notes: school.school_minimum_gpa_required.school_minimum_prerequisite_gpa_required.notes,
                } : null,
              }
            },
            draft: {
              input: {
                school_minimum_gpa_required: {
                  input: school.school_minimum_gpa_required.input,
                },
                school_minimum_overall_gpa_required: school.school_minimum_gpa_required.school_minimum_overall_gpa_required ? {
                    input: school.school_minimum_gpa_required.school_minimum_overall_gpa_required.input,
                    notes: school.school_minimum_gpa_required.school_minimum_overall_gpa_required.notes,
                } : null,
                school_minimum_science_gpa_required: school.school_minimum_gpa_required.school_minimum_science_gpa_required ?  {
                    input: school.school_minimum_gpa_required.school_minimum_science_gpa_required.input,
                    notes: school.school_minimum_gpa_required.school_minimum_science_gpa_required.notes,
                } : null,
                school_minimum_prerequisite_gpa_required: school.school_minimum_gpa_required.school_minimum_prerequisite_gpa_required ?  {
                    input: school.school_minimum_gpa_required.school_minimum_prerequisite_gpa_required.input,
                    notes: school.school_minimum_gpa_required.school_minimum_prerequisite_gpa_required.notes,
                } : null,
              }
            },
          },
          school_minimum_gpa_recommended: {
            ...defaultSchool.school_minimum_gpa_recommended,
            original: {
              input: {
                school_minimum_gpa_recommended: {
                  input: school.school_minimum_gpa_recommended.input,
                },
                school_minimum_overall_gpa_recommended: school.school_minimum_gpa_recommended.school_minimum_overall_gpa_recommended ? {
                    input: school.school_minimum_gpa_recommended.school_minimum_overall_gpa_recommended.input,
                    notes: school.school_minimum_gpa_recommended.school_minimum_overall_gpa_recommended.notes,
                } : null,
                school_minimum_science_gpa_recommended: school.school_minimum_gpa_recommended.school_minimum_science_gpa_recommended ?  {
                    input: school.school_minimum_gpa_recommended.school_minimum_science_gpa_recommended.input,
                    notes: school.school_minimum_gpa_recommended.school_minimum_science_gpa_recommended.notes,
                } : null,
                school_minimum_prerequisite_gpa_recommended: school.school_minimum_gpa_recommended.school_minimum_prerequisite_gpa_recommended ?  {
                    input: school.school_minimum_gpa_recommended.school_minimum_prerequisite_gpa_recommended.input,
                    notes: school.school_minimum_gpa_recommended.school_minimum_prerequisite_gpa_recommended.notes,
                } : null,
              }
            },
            draft: {
              input: {
                school_minimum_gpa_recommended: {
                  input: school.school_minimum_gpa_recommended.input,
                },
                school_minimum_overall_gpa_recommended: school.school_minimum_gpa_recommended.school_minimum_overall_gpa_recommended ? {
                    input: school.school_minimum_gpa_recommended.school_minimum_overall_gpa_recommended.input,
                    notes: school.school_minimum_gpa_recommended.school_minimum_overall_gpa_recommended.notes,
                } : null,
                school_minimum_science_gpa_recommended: school.school_minimum_gpa_recommended.school_minimum_science_gpa_recommended ?  {
                    input: school.school_minimum_gpa_recommended.school_minimum_science_gpa_recommended.input,
                    notes: school.school_minimum_gpa_recommended.school_minimum_science_gpa_recommended.notes,
                } : null,
                school_minimum_prerequisite_gpa_recommended: school.school_minimum_gpa_recommended.school_minimum_prerequisite_gpa_recommended ?  {
                    input: school.school_minimum_gpa_recommended.school_minimum_prerequisite_gpa_recommended.input,
                    notes: school.school_minimum_gpa_recommended.school_minimum_prerequisite_gpa_recommended.notes,
                } : null,
              }
            },
          },
          school_other_types_of_gpa_evaluated: {
            ...defaultSchool.school_other_types_of_gpa_evaluated,
            original: {
              input: school.school_other_types_of_gpa_evaluated.map(gpa => ({
                gpa_value_required_or_recommended: {
                  input: gpa.gpa_value_required_or_recommended,
                },
                minimum_gpa_value_needed: {
                  input: gpa.minimum_gpa_value_needed,
                },
                minimum_number_of_credits_evaluated: {
                  input: gpa.minimum_number_of_credits_evaluated,
                },
                type_of_gpa_evaluated: {
                  input: gpa.type_of_gpa_evaluated,
                },
                notes: gpa.notes,
              }))
            },
            draft: {
              input: school.school_other_types_of_gpa_evaluated.map(gpa => ({
                gpa_value_required_or_recommended: {
                  input: gpa.gpa_value_required_or_recommended,
                },
                minimum_gpa_value_needed: {
                  input: gpa.minimum_gpa_value_needed,
                },
                minimum_number_of_credits_evaluated: {
                  input: gpa.minimum_number_of_credits_evaluated,
                },
                type_of_gpa_evaluated: {
                  input: gpa.type_of_gpa_evaluated,
                },
                notes: gpa.notes,
              }))
            },
          },
          school_minimum_gpa_for_specific_course: {
            ...defaultSchool.school_minimum_gpa_for_specific_course,
            original: {
              input: school.school_minimum_gpa_for_specific_course.map(gpa => ({
                minimum_gpa_required_for_course: {
                  input: gpa.minimum_gpa_required_for_course,
                },
                courseID: {
                  input: gpa.courseID,
                },
                notes: gpa.notes,
              }))
            },
            draft: {
              input: school.school_minimum_gpa_for_specific_course.map(gpa => ({
                minimum_gpa_required_for_course: {
                  input: gpa.minimum_gpa_required_for_course,
                },
                courseID: {
                  input: gpa.courseID,
                },
                notes: gpa.notes,
              }))
            },
          },
          school_average_gpa_accepted_previous_cycle: {
            ...defaultSchool.school_average_gpa_accepted_previous_cycle,
            original: {
                input: {
                    average_overall_gpa_accepted_previous_year: {
                        input: school.school_average_gpa_accepted_previous_cycle.average_overall_gpa_accepted_previous_year.input,
                        notes: school.school_average_gpa_accepted_previous_cycle.average_overall_gpa_accepted_previous_year.notes,
                    },
                    average_bcp_gpa_accepted_previous_year: {
                        input: school.school_average_gpa_accepted_previous_cycle.average_bcp_gpa_accepted_previous_year.input,
                        notes: school.school_average_gpa_accepted_previous_cycle.average_bcp_gpa_accepted_previous_year.notes
                    },
                    average_science_gpa_accepted_previous_year: {
                      input: school.school_average_gpa_accepted_previous_cycle.average_science_gpa_accepted_previous_year.input,
                      notes: school.school_average_gpa_accepted_previous_cycle.average_science_gpa_accepted_previous_year.notes,
                    },
                    average_prerequisite_gpa_accepted_previous_year: {
                      input: school.school_average_gpa_accepted_previous_cycle.average_prerequisite_gpa_accepted_previous_year.input,
                      notes: school.school_average_gpa_accepted_previous_cycle.average_prerequisite_gpa_accepted_previous_year.notes,
                    },
                }
            },
            draft: {
              input: {
                  average_overall_gpa_accepted_previous_year: {
                      input: school.school_average_gpa_accepted_previous_cycle.average_overall_gpa_accepted_previous_year.input,
                      notes: school.school_average_gpa_accepted_previous_cycle.average_overall_gpa_accepted_previous_year.notes,
                  },
                  average_bcp_gpa_accepted_previous_year: {
                      input: school.school_average_gpa_accepted_previous_cycle.average_bcp_gpa_accepted_previous_year.input,
                      notes: school.school_average_gpa_accepted_previous_cycle.average_bcp_gpa_accepted_previous_year.notes
                  },
                  average_science_gpa_accepted_previous_year: {
                    input: school.school_average_gpa_accepted_previous_cycle.average_science_gpa_accepted_previous_year.input,
                    notes: school.school_average_gpa_accepted_previous_cycle.average_science_gpa_accepted_previous_year.notes,
                  },
                  average_prerequisite_gpa_accepted_previous_year: {
                    input: school.school_average_gpa_accepted_previous_cycle.average_prerequisite_gpa_accepted_previous_year.input,
                    notes: school.school_average_gpa_accepted_previous_cycle.average_prerequisite_gpa_accepted_previous_year.notes,
                  },
              }
            },
          },
          school_gpa_general_note: {
            ...defaultSchool.school_gpa_general_note,
            original: {
                input: school.school_gpa_general_note,
            },
            draft: {
              input: school.school_gpa_general_note,
            },
          },
          school_required_optional_exams: {
            ...defaultSchool.school_required_optional_exams,
            original: {
              input: school.school_required_optional_exams.map(exam => ({
                school_minimum_number_of_exams_to_be_completed: exam.school_minimum_number_of_exams_to_be_completed,
                school_required_optional_exams_list: exam.school_required_optional_exams_list.map(list => ({
                  value: list
                })),
                notes: exam.school_optional_exams_notes,
              }))
            },
            draft: {
              input: school.school_required_optional_exams.map(exam => ({
                school_minimum_number_of_exams_to_be_completed: exam.school_minimum_number_of_exams_to_be_completed,
                school_required_optional_exams_list: exam.school_required_optional_exams_list.map(list => ({
                  value: list
                })),
                notes: exam.school_optional_exams_notes,
              }))
            },
          },
          school_gre: {
            ...defaultSchool.school_gre,
            original: {
              input: {
                  school_gre_required: {
                      input: school.school_gre.school_gre_required,
                  },
                  school_gre_recommended: {
                      input: school.school_gre.school_gre_recommended,
                  },
                  school_caspa_gre_institution_code: school.school_gre.school_caspa_gre_institution_code ? {
                      input:  school.school_gre.school_caspa_gre_institution_code,
                  } : null,
                  school_gre_institution_code: school.school_gre.school_gre_institution_code ? {
                      input: school.school_gre.school_gre_institution_code,
                  } : null,
          
                  school_minimum_time_frame_gre_must_be_completed: school.school_gre.school_minimum_time_frame_gre_must_be_completed ? {
                      input: {
                          quantity: Number(school.school_gre.school_minimum_time_frame_gre_must_be_completed.input.split(' ')[0]),
                          units: school.school_gre.school_minimum_time_frame_gre_must_be_completed.input.split(' ')[1],
                      },
                      notes: school.school_gre.school_minimum_time_frame_gre_must_be_completed.school_minimum_time_frame_gre_must_be_completed_notes,
                  } : null,
          
                  school_mcat_accepted_in_place_of_gre: school.school_gre.school_mcat_accepted_in_place_of_gre ? {
                      input: school.school_gre.school_mcat_accepted_in_place_of_gre.input,
                      notes: school.school_gre.school_mcat_accepted_in_place_of_gre.school_mcat_accepted_in_place_of_gre_notes,
                  } : null,
          
                  school_gre_exempt_with_masters_degree: school.school_gre.school_gre_exempt_with_masters_degree ? {
                      input: school.school_gre.school_gre_exempt_with_masters_degree.input,
                      notes: school.school_gre.school_gre_exempt_with_masters_degree.school_gre_exempt_with_masters_degree_notes,
                  } : null,
          
                  school_gre_exempt_with_phd_degree: school.school_gre.school_gre_exempt_with_phd_degree ? {
                      input: school.school_gre.school_gre_exempt_with_phd_degree.input,
                      notes: school.school_gre.school_gre_exempt_with_phd_degree.school_gre_exempt_with_phd_degree_notes,
                  } : null,
          
                  school_minimum_gre_scores_required: school.school_gre.school_minimum_gre_scores_required ? {
                      input: school.school_gre.school_minimum_gre_scores_required,
                  } : null,
                  school_gre_minimum_verbal_score: school.school_gre.school_gre_minimum_verbal_score ?  {
                      input: school.school_gre.school_gre_minimum_verbal_score,
                  } : null,
                  school_gre_minimum_quantitative_score: school.school_gre.school_gre_minimum_quantitative_score ?  {
                      input: school.school_gre.school_gre_minimum_quantitative_score,
                  } : null,
                  school_gre_minimum_analytical_writing_score: school.school_gre.school_gre_minimum_analytical_writing_score ? {
                      input: school.school_gre.school_gre_minimum_analytical_writing_score,
                  } : null,
                  school_gre_minimum_combined_score: school.school_gre.school_gre_minimum_combined_score ? {
                      input: school.school_gre.school_gre_minimum_combined_score,
                  } : null,
                  school_minimum_gre_score_notes: school.school_gre.school_minimum_gre_score_notes ? {
                      notes: school.school_gre.school_minimum_gre_score_notes,
                  } : null,
          
                  school_gre_minimum_verbal_percentile: school.school_gre.school_gre_minimum_verbal_percentile ? {
                      input: school.school_gre.school_gre_minimum_verbal_percentile,
                  } : null,
                  school_gre_minimum_quantitative_percentile: school.school_gre.school_gre_minimum_quantitative_percentile ?  {
                      input: school.school_gre.school_gre_minimum_quantitative_percentile,
                  } : null,
                  school_gre_minimum_analytical_writing_percentile: school.school_gre.school_gre_minimum_analytical_writing_percentile ? {
                      input: school.school_gre.school_gre_minimum_analytical_writing_percentile,
                  } : null,
                  school_gre_minimum_combined_percentile: school.school_gre.school_gre_minimum_combined_percentile ? {
                      input: school.school_gre.school_gre_minimum_combined_percentile
                  } : null,
                  school_minimum_gre_percentile_notes: school.school_gre.school_minimum_gre_percentile_notes ? {
                      notes: school.school_gre.school_minimum_gre_percentile_notes,
                  } : null,
          
                  school_average_gre_verbal_score_accepted_previous_year: school.school_gre.school_average_gre_verbal_score_accepted_previous_year ? {
                      input: school.school_gre.school_average_gre_verbal_score_accepted_previous_year,
                  } : null,
                  school_average_gre_quantitative_score_accepted_previous_year: school.school_gre.school_average_gre_quantitative_score_accepted_previous_year ?  {
                      input: school.school_gre.school_average_gre_quantitative_score_accepted_previous_year,
                  } : null,
                  school_average_gre_analytical_writing_score_accepted_previous_year: school.school_gre.school_average_gre_analytical_writing_score_accepted_previous_year ?  {
                      input: school.school_gre.school_average_gre_analytical_writing_score_accepted_previous_year,
                  } : null,
                  school_average_gre_combined_score_accepted_previous_year: school.school_gre.school_average_gre_combined_score_accepted_previous_year ? {
                      input: school.school_gre.school_average_gre_combined_score_accepted_previous_year,
                  } : null,
          
                  school_average_gre_verbal_percentile_accepted_previous_year: school.school_gre.school_average_gre_verbal_percentile_accepted_previous_year ? {
                      input: school.school_gre.school_average_gre_verbal_percentile_accepted_previous_year,
                  } : null,
                  school_average_gre_quantitative_percentile_accepted_previous_year: school.school_gre.school_average_gre_quantitative_percentile_accepted_previous_year ? {
                      input: school.school_gre.school_average_gre_quantitative_percentile_accepted_previous_year,
                  } : null,
                  school_average_gre_analytical_writing_percentile_accepted_previous_year: school.school_gre.school_average_gre_analytical_writing_percentile_accepted_previous_year ? {
                      input: school.school_gre.school_average_gre_analytical_writing_percentile_accepted_previous_year,
                  } : null,
                  school_average_gre_combined_percentile_accepted_previous_year: school.school_gre.school_average_gre_combined_percentile_accepted_previous_year ? {
                      input: school.school_gre.school_average_gre_combined_percentile_accepted_previous_year,
                  } : null,
              },
              notes: school.school_gre.school_gre_general_notes,
          },
          draft: {
            input: {
                school_gre_required: {
                    input: school.school_gre.school_gre_required,
                },
                school_gre_recommended: {
                    input: school.school_gre.school_gre_recommended,
                },
                school_caspa_gre_institution_code: school.school_gre.school_caspa_gre_institution_code ? {
                    input:  school.school_gre.school_caspa_gre_institution_code,
                } : null,
                school_gre_institution_code: school.school_gre.school_gre_institution_code ? {
                    input: school.school_gre.school_gre_institution_code,
                } : null,
        
                school_minimum_time_frame_gre_must_be_completed: school.school_gre.school_minimum_time_frame_gre_must_be_completed ? {
                    input: {
                        quantity: Number(school.school_gre.school_minimum_time_frame_gre_must_be_completed.input.split(' ')[0]),
                        units: school.school_gre.school_minimum_time_frame_gre_must_be_completed.input.split(' ')[1],
                    },
                    notes: school.school_gre.school_minimum_time_frame_gre_must_be_completed.school_minimum_time_frame_gre_must_be_completed_notes,
                } : null,
        
                school_mcat_accepted_in_place_of_gre: school.school_gre.school_mcat_accepted_in_place_of_gre ? {
                    input: school.school_gre.school_mcat_accepted_in_place_of_gre.input,
                    notes: school.school_gre.school_mcat_accepted_in_place_of_gre.school_mcat_accepted_in_place_of_gre_notes,
                } : null,
        
                school_gre_exempt_with_masters_degree: school.school_gre.school_gre_exempt_with_masters_degree ? {
                    input: school.school_gre.school_gre_exempt_with_masters_degree.input,
                    notes: school.school_gre.school_gre_exempt_with_masters_degree.school_gre_exempt_with_masters_degree_notes,
                } : null,
        
                school_gre_exempt_with_phd_degree: school.school_gre.school_gre_exempt_with_phd_degree ? {
                    input: school.school_gre.school_gre_exempt_with_phd_degree.input,
                    notes: school.school_gre.school_gre_exempt_with_phd_degree.school_gre_exempt_with_phd_degree_notes,
                } : null,
        
                school_minimum_gre_scores_required: school.school_gre.school_minimum_gre_scores_required ? {
                    input: school.school_gre.school_minimum_gre_scores_required,
                } : null,
                school_gre_minimum_verbal_score: school.school_gre.school_gre_minimum_verbal_score ?  {
                    input: school.school_gre.school_gre_minimum_verbal_score,
                } : null,
                school_gre_minimum_quantitative_score: school.school_gre.school_gre_minimum_quantitative_score ?  {
                    input: school.school_gre.school_gre_minimum_quantitative_score,
                } : null,
                school_gre_minimum_analytical_writing_score: school.school_gre.school_gre_minimum_analytical_writing_score ? {
                    input: school.school_gre.school_gre_minimum_analytical_writing_score,
                } : null,
                school_gre_minimum_combined_score: school.school_gre.school_gre_minimum_combined_score ? {
                    input: school.school_gre.school_gre_minimum_combined_score,
                } : null,
                school_minimum_gre_score_notes: school.school_gre.school_minimum_gre_score_notes ? {
                    notes: school.school_gre.school_minimum_gre_score_notes,
                } : null,
        
                school_gre_minimum_verbal_percentile: school.school_gre.school_gre_minimum_verbal_percentile ? {
                    input: school.school_gre.school_gre_minimum_verbal_percentile,
                } : null,
                school_gre_minimum_quantitative_percentile: school.school_gre.school_gre_minimum_quantitative_percentile ?  {
                    input: school.school_gre.school_gre_minimum_quantitative_percentile,
                } : null,
                school_gre_minimum_analytical_writing_percentile: school.school_gre.school_gre_minimum_analytical_writing_percentile ? {
                    input: school.school_gre.school_gre_minimum_analytical_writing_percentile,
                } : null,
                school_gre_minimum_combined_percentile: school.school_gre.school_gre_minimum_combined_percentile ? {
                    input: school.school_gre.school_gre_minimum_combined_percentile
                } : null,
                school_minimum_gre_percentile_notes: school.school_gre.school_minimum_gre_percentile_notes ? {
                    notes: school.school_gre.school_minimum_gre_percentile_notes,
                } : null,
        
                school_average_gre_verbal_score_accepted_previous_year: school.school_gre.school_average_gre_verbal_score_accepted_previous_year ? {
                    input: school.school_gre.school_average_gre_verbal_score_accepted_previous_year,
                } : null,
                school_average_gre_quantitative_score_accepted_previous_year: school.school_gre.school_average_gre_quantitative_score_accepted_previous_year ?  {
                    input: school.school_gre.school_average_gre_quantitative_score_accepted_previous_year,
                } : null,
                school_average_gre_analytical_writing_score_accepted_previous_year: school.school_gre.school_average_gre_analytical_writing_score_accepted_previous_year ?  {
                    input: school.school_gre.school_average_gre_analytical_writing_score_accepted_previous_year,
                } : null,
                school_average_gre_combined_score_accepted_previous_year: school.school_gre.school_average_gre_combined_score_accepted_previous_year ? {
                    input: school.school_gre.school_average_gre_combined_score_accepted_previous_year,
                } : null,
        
                school_average_gre_verbal_percentile_accepted_previous_year: school.school_gre.school_average_gre_verbal_percentile_accepted_previous_year ? {
                    input: school.school_gre.school_average_gre_verbal_percentile_accepted_previous_year,
                } : null,
                school_average_gre_quantitative_percentile_accepted_previous_year: school.school_gre.school_average_gre_quantitative_percentile_accepted_previous_year ? {
                    input: school.school_gre.school_average_gre_quantitative_percentile_accepted_previous_year,
                } : null,
                school_average_gre_analytical_writing_percentile_accepted_previous_year: school.school_gre.school_average_gre_analytical_writing_percentile_accepted_previous_year ? {
                    input: school.school_gre.school_average_gre_analytical_writing_percentile_accepted_previous_year,
                } : null,
                school_average_gre_combined_percentile_accepted_previous_year: school.school_gre.school_average_gre_combined_percentile_accepted_previous_year ? {
                    input: school.school_gre.school_average_gre_combined_percentile_accepted_previous_year,
                } : null,
            },
            notes: school.school_gre.school_gre_general_notes,
        },
          },
          school_pacat: {
            ...defaultSchool.school_pacat,
            original: {
              input: {
                  school_pacat_required: school.school_pacat.school_pacat_required,
                  school_pacat_recommended: school.school_pacat.school_pacat_recommended,
                  school_pacat_exam_school_code: school.school_pacat.school_pacat_exam_school_code,
                  school_pacat_exam_scaled_minimum_score_required: school.school_pacat.school_pacat_exam_scaled_minimum_score_required,
                  school_pacat_exam_group_scaled_minimum_score_required: school.school_pacat.school_pacat_exam_group_scaled_minimum_score_required,
              },
              notes: school.school_pacat.school_pacat_exam_notes,
          },
          draft: {
            input: {
                school_pacat_required: school.school_pacat.school_pacat_required,
                school_pacat_recommended: school.school_pacat.school_pacat_recommended,
                school_pacat_exam_school_code: school.school_pacat.school_pacat_exam_school_code,
                school_pacat_exam_scaled_minimum_score_required: school.school_pacat.school_pacat_exam_scaled_minimum_score_required,
                school_pacat_exam_group_scaled_minimum_score_required: school.school_pacat.school_pacat_exam_group_scaled_minimum_score_required,
            },
            notes: school.school_pacat.school_pacat_exam_notes,
        },
          },
          school_casper: {
            ...defaultSchool.school_casper,
            original: {
              input: {
                  school_casper_required: school.school_casper.school_casper_required,
                  school_casper_recommended: school.school_casper.school_casper_recommended,
              },
              notes: school.school_casper.school_casper_exam_notes,
          },
          draft: {
            input: {
                school_casper_required: school.school_casper.school_casper_required,
                school_casper_recommended: school.school_casper.school_casper_recommended,
            },
            notes: school.school_casper.school_casper_exam_notes,
        },
          },
          school_english_proficiency_exams: {
            ...defaultSchool.school_english_proficiency_exams,
            original: {
              input: {
                  school_english_proficiency_exams_required: {
                      input: school.school_english_proficiency_exams.school_english_proficiency_exams_required,
                  },
                  school_toefl_required: school.school_english_proficiency_exams.school_toefl_required !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_required,
                  } : null,
                  school_minimum_time_frame_toefl_needs_to_be_completed: school.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed !== null ? {
                      input: {
                          quantity: Number(school.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed.split(' ')[0]),
                          units: school.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed.split(' ')[1],
                      }
                  } : null,
                  school_toefl_exempt_with_masters_degree: school.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree,
                  } : null,
                  school_toefl_exempt_with_doctoral_degree: school.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree,
                  } : null,
          
                  school_toefl_ibt_minimum_total_score_required: school.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required,
                  } : null,
                  school_toefl_ibt_minimum_reading_score_required: school.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required
                  } : null,
                  school_toefl_ibt_minimum_writing_score_required: school.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required
                  } : null,
                  school_toefl_ibt_minimum_listening_score_required: school.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required
                  } : null,
                  school_toefl_ibt_minimum_speaking_score_required: school.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required
                  } : null,
                  school_toefl_ibt_minimum_score_notes: school.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes !== null ? {
                      notes: school.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes,
                  } : null,
          
                  school_toefl_pbt_minimum_total_score_required: school.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required
                  } : null,
                  school_toefl_pbt_minimum_reading_score_required: school.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required
                  } : null,
                  school_toefl_pbt_minimum_writing_score_required: school.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required
                  } : null,
                  school_toefl_pbt_minimum_listening_score_required: school.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required
                  } : null,
                  school_toefl_pbt_minimum_speaking_score_required: school.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required,
                  } : null,
                  school_toefl_pbt_minimum_score_notes: school.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes !== null ? {
                      notes: school.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes
                  } : null,
          
                  school_ielt_required: school.school_english_proficiency_exams.school_ielt_required !== null ? {
                      input: school.school_english_proficiency_exams.school_ielt_required
                  } : null,
                  school_ielt_minimum_total_score_required: school.school_english_proficiency_exams.school_ielt_minimum_total_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_ielt_minimum_total_score_required
                  } : null,
                  school_ielt_minimum_score_notes: school.school_english_proficiency_exams.school_ielt_minimum_score_notes !== null ? {
                      notes: school.school_english_proficiency_exams.school_ielt_minimum_score_notes
                  } : null,
          
                  school_melab_required: school.school_english_proficiency_exams.school_melab_required !== null ? {
                      input: school.school_english_proficiency_exams.school_melab_required
                  } : null,
                  school_melab_minimum_total_score_required: school.school_english_proficiency_exams.school_melab_minimum_total_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_melab_minimum_total_score_required
                  } : null,
                  school_melab_minimum_score_notes: school.school_english_proficiency_exams.school_melab_minimum_score_notes !== null ? {
                      notes: school.school_english_proficiency_exams.school_melab_minimum_score_notes
                  } : null,
          
                  school_pte_academic_required: school.school_english_proficiency_exams.school_pte_academic_required !== null ? {
                      input: school.school_english_proficiency_exams.school_pte_academic_required
                  } : null,
                  school_pte_academic_minimum_total_score_required: school.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required
                  } : null,
                  school_pte_academic_minimum_score_notes: school.school_english_proficiency_exams.school_pte_academic_minimum_score_notes !== null ? {
                      notes: school.school_english_proficiency_exams.school_pte_academic_minimum_score_notes
                  } : null,
          
                  school_itep_academic_plus_required: school.school_english_proficiency_exams.school_itep_academic_plus_required !== null ? {
                      input: school.school_english_proficiency_exams.school_itep_academic_plus_required,
                  } : null,
                  school_itep_academic_plus_minimum_total_score_required: school.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required !== null ? {
                      input: school.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required
                  } : null,
                  school_itep_academic_plus_minimum_score_notes: school.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes !== null ? {
                      notes: school.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes
                  } : null,
              },
              notes: school.school_english_proficiency_exams.notes,
          },
          draft: {
            input: {
                school_english_proficiency_exams_required: {
                    input: school.school_english_proficiency_exams.school_english_proficiency_exams_required,
                },
                school_toefl_required: school.school_english_proficiency_exams.school_toefl_required !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_required,
                } : null,
                school_minimum_time_frame_toefl_needs_to_be_completed: school.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed !== null ? {
                    input: {
                        quantity: Number(school.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed.split(' ')[0]),
                        units: school.school_english_proficiency_exams.school_minimum_time_frame_toefl_needs_to_be_completed.split(' ')[1],
                    }
                } : null,
                school_toefl_exempt_with_masters_degree: school.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_exempt_with_masters_degree,
                } : null,
                school_toefl_exempt_with_doctoral_degree: school.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_exempt_with_doctoral_degree,
                } : null,
        
                school_toefl_ibt_minimum_total_score_required: school.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_ibt_minimum_total_score_required,
                } : null,
                school_toefl_ibt_minimum_reading_score_required: school.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_ibt_minimum_reading_score_required
                } : null,
                school_toefl_ibt_minimum_writing_score_required: school.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_ibt_minimum_writing_score_required
                } : null,
                school_toefl_ibt_minimum_listening_score_required: school.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_ibt_minimum_listening_score_required
                } : null,
                school_toefl_ibt_minimum_speaking_score_required: school.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_ibt_minimum_speaking_score_required
                } : null,
                school_toefl_ibt_minimum_score_notes: school.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes !== null ? {
                    notes: school.school_english_proficiency_exams.school_toefl_ibt_minimum_score_notes,
                } : null,
        
                school_toefl_pbt_minimum_total_score_required: school.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_pbt_minimum_total_score_required
                } : null,
                school_toefl_pbt_minimum_reading_score_required: school.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_pbt_minimum_reading_score_required
                } : null,
                school_toefl_pbt_minimum_writing_score_required: school.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_pbt_minimum_writing_score_required
                } : null,
                school_toefl_pbt_minimum_listening_score_required: school.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_pbt_minimum_listening_score_required
                } : null,
                school_toefl_pbt_minimum_speaking_score_required: school.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_toefl_pbt_minimum_speaking_score_required,
                } : null,
                school_toefl_pbt_minimum_score_notes: school.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes !== null ? {
                    notes: school.school_english_proficiency_exams.school_toefl_pbt_minimum_score_notes
                } : null,
        
                school_ielt_required: school.school_english_proficiency_exams.school_ielt_required !== null ? {
                    input: school.school_english_proficiency_exams.school_ielt_required
                } : null,
                school_ielt_minimum_total_score_required: school.school_english_proficiency_exams.school_ielt_minimum_total_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_ielt_minimum_total_score_required
                } : null,
                school_ielt_minimum_score_notes: school.school_english_proficiency_exams.school_ielt_minimum_score_notes !== null ? {
                    notes: school.school_english_proficiency_exams.school_ielt_minimum_score_notes
                } : null,
        
                school_melab_required: school.school_english_proficiency_exams.school_melab_required !== null ? {
                    input: school.school_english_proficiency_exams.school_melab_required
                } : null,
                school_melab_minimum_total_score_required: school.school_english_proficiency_exams.school_melab_minimum_total_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_melab_minimum_total_score_required
                } : null,
                school_melab_minimum_score_notes: school.school_english_proficiency_exams.school_melab_minimum_score_notes !== null ? {
                    notes: school.school_english_proficiency_exams.school_melab_minimum_score_notes
                } : null,
        
                school_pte_academic_required: school.school_english_proficiency_exams.school_pte_academic_required !== null ? {
                    input: school.school_english_proficiency_exams.school_pte_academic_required
                } : null,
                school_pte_academic_minimum_total_score_required: school.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_pte_academic_minimum_total_score_required
                } : null,
                school_pte_academic_minimum_score_notes: school.school_english_proficiency_exams.school_pte_academic_minimum_score_notes !== null ? {
                    notes: school.school_english_proficiency_exams.school_pte_academic_minimum_score_notes
                } : null,
        
                school_itep_academic_plus_required: school.school_english_proficiency_exams.school_itep_academic_plus_required !== null ? {
                    input: school.school_english_proficiency_exams.school_itep_academic_plus_required,
                } : null,
                school_itep_academic_plus_minimum_total_score_required: school.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required !== null ? {
                    input: school.school_english_proficiency_exams.school_itep_academic_plus_minimum_total_score_required
                } : null,
                school_itep_academic_plus_minimum_score_notes: school.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes !== null ? {
                    notes: school.school_english_proficiency_exams.school_itep_academic_plus_minimum_score_notes
                } : null,
            },
            notes: school.school_english_proficiency_exams.notes,
        },
          },
          school_exams_general_note: {
            ...defaultSchool.school_exams_general_note,
            original: {
              input: school.school_exams_general_note,
            },
            draft: {
              input: school.school_exams_general_note,
            },
          },
          school_prereq_required_courses_and_categories: {
            ...defaultSchool.school_prereq_required_courses_and_categories,
            original: {
              input: {
                  school_prereq_required_courses: {
                      input: school.school_prereq_required_courses.courses.map(course => ({
                        school_required_course_id: course.school_required_course_id,
                        school_required_course_lab: course.school_required_course_lab,
                        school_required_course_credit_hours: course.school_required_course_credit_hours,
                        school_required_course_lab_preferred: course.school_required_course_lab_preferred,
                        school_required_course_note_section: course.school_required_course_note_section,
                        school_required_course_quarter_hours: course.school_required_course_quarter_hours,
                      })),
                      notes: school.school_prereq_required_courses.notes,
                  },
                  school_prereq_required_optional_courses: {
                      input: school.school_prereq_required_optional_courses.map(course => ({
                          school_minimum_number_of_courses_to_be_completed: course.school_minimum_number_of_courses_to_be_completed,
                          school_required_optional_courses_list: course.school_required_optional_courses_list.map(list => ({
                              school_optional_course_id: list.school_optional_course_id,
                              school_optional_course_lab: list.school_optional_course_lab,
                              school_optional_course_lab_preferred: list.school_optional_course_lab_preferred,
                              school_optional_course_credit_hours: list.school_optional_course_credit_hours,
                              school_optional_course_quarter_hours: list.school_optional_course_quarter_hours,
                              school_optional_course_note_section: list.school_optional_course_note_section,
                          })),
                          notes: course.school_optional_course_note_section,
                      })),
                  },
                  school_prereq_required_course_categories: {
                      input: school.school_prereq_required_course_categories.map(cat => ({
                        school_required_course_category: cat.school_required_course_category,
                        school_required_course_category_number_of_courses_that_need_lab: cat.school_required_course_category_number_of_courses_that_need_lab,
                        school_required_course_category_number_of_credits_need_to_be_completed: cat.school_required_course_category_number_of_credits_need_to_be_completed,
                        school_required_course_category_number_of_quarter_hours_need_to_be_completed: cat.school_required_course_category_number_of_quarter_hours_need_to_be_completed,
                        school_required_course_category_extra_included_courses: cat.school_required_course_category_extra_included_courses.map(c => ({
                          school_required_course_id: c.school_required_course_id,
                          school_required_course_note: c.school_required_course_note,
                        })),
                        school_required_course_category_excluded_courses: cat.school_required_course_category_excluded_courses.map(c => ({
                          school_required_course_id: c.school_required_course_id,
                          school_required_course_note: c.school_required_course_note,
                        })),
                        notes: cat.school_required_course_category_note_section,
                      })),
                  },
              },
              notes: school.school_prereq_required_notes.notes,
          },
          draft: {
            input: {
                school_prereq_required_courses: {
                    input: school.school_prereq_required_courses.courses.map(course => ({
                      school_required_course_id: course.school_required_course_id,
                      school_required_course_lab: course.school_required_course_lab,
                      school_required_course_credit_hours: course.school_required_course_credit_hours,
                      school_required_course_lab_preferred: course.school_required_course_lab_preferred,
                      school_required_course_note_section: course.school_required_course_note_section,
                      school_required_course_quarter_hours: course.school_required_course_quarter_hours,
                    })),
                    notes: school.school_prereq_required_courses.notes,
                },
                school_prereq_required_optional_courses: {
                    input: school.school_prereq_required_optional_courses.map(course => ({
                        school_minimum_number_of_courses_to_be_completed: course.school_minimum_number_of_courses_to_be_completed,
                        school_required_optional_courses_list: course.school_required_optional_courses_list.map(list => ({
                            school_optional_course_id: list.school_optional_course_id,
                            school_optional_course_lab: list.school_optional_course_lab,
                            school_optional_course_lab_preferred: list.school_optional_course_lab_preferred,
                            school_optional_course_credit_hours: list.school_optional_course_credit_hours,
                            school_optional_course_quarter_hours: list.school_optional_course_quarter_hours,
                            school_optional_course_note_section: list.school_optional_course_note_section,
                        })),
                        notes: course.school_optional_course_note_section,
                    })),
                },
                school_prereq_required_course_categories: {
                    input: school.school_prereq_required_course_categories.map(cat => ({
                      school_required_course_category: cat.school_required_course_category,
                      school_required_course_category_number_of_courses_that_need_lab: cat.school_required_course_category_number_of_courses_that_need_lab,
                      school_required_course_category_number_of_credits_need_to_be_completed: cat.school_required_course_category_number_of_credits_need_to_be_completed,
                      school_required_course_category_number_of_quarter_hours_need_to_be_completed: cat.school_required_course_category_number_of_quarter_hours_need_to_be_completed,
                      school_required_course_category_extra_included_courses: cat.school_required_course_category_extra_included_courses.map(c => ({
                        school_required_course_id: c.school_required_course_id,
                        school_required_course_note: c.school_required_course_note,
                      })),
                      school_required_course_category_excluded_courses: cat.school_required_course_category_excluded_courses.map(c => ({
                        school_required_course_id: c.school_required_course_id,
                        school_required_course_note: c.school_required_course_note,
                      })),
                      notes: cat.school_required_course_category_note_section,
                    })),
                },
            },
            notes: school.school_prereq_required_notes.notes,
        },
          },
          school_prereq_recommended_courses: {
            ...defaultSchool.school_prereq_recommended_courses,
            original: {
              input: school.school_prereq_recommended_courses.courses.map(course => ({
                school_recommended_course_id: course.school_recommended_course_id,
                school_recommended_course_lab: course.school_recommended_course_lab,
                school_recommended_course_credit_hours: course.school_recommended_course_credit_hours,
                school_recommended_course_lab_preferred: course.school_recommended_course_lab_preferred,
                school_recommended_course_note_section: course.school_recommended_course_note_section,
                school_recommended_course_quarter_hours: course.school_recommended_course_quarter_hours,
              })),  
              notes: school.school_prereq_recommended_courses.notes,
          },
          draft: {
            input: school.school_prereq_recommended_courses.courses.map(course => ({
              school_recommended_course_id: course.school_recommended_course_id,
              school_recommended_course_lab: course.school_recommended_course_lab,
              school_recommended_course_credit_hours: course.school_recommended_course_credit_hours,
              school_recommended_course_lab_preferred: course.school_recommended_course_lab_preferred,
              school_recommended_course_note_section: course.school_recommended_course_note_section,
              school_recommended_course_quarter_hours: course.school_recommended_course_quarter_hours,
            })),  
            notes: school.school_prereq_recommended_courses.notes,
        },
          },
          school_grade_criteria: {
            ...defaultSchool.school_grade_criteria,
            original: {
              input: {
                  school_minimum_grade_required_for_all_courses: school.school_grade_criteria.school_minimum_grade_required_for_all_courses,
              },
              notes: school.school_grade_criteria.school_grade_criteria_note_section,
            },
            draft: {
              input: {
                  school_minimum_grade_required_for_all_courses: school.school_grade_criteria.school_minimum_grade_required_for_all_courses,
              },
              notes: school.school_grade_criteria.school_grade_criteria_note_section,
            },
          },
          school_time_frame_criteria: {
            ...defaultSchool.school_time_frame_criteria,
            original: {
              input: {
                  school_time_frame_all_courses_must_be_completed: {
                      input: {
                          quantity: Number(school.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.input.split(' ')[0]),
                          units: school.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.input.split(' ')[1],
                      },
                      notes: school.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.notes,
                  },
                  school_time_frame_science_courses_must_be_completed: {
                      input: {
                          quantity: Number(school.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.input.split(' ')[0]),
                          units: school.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.input.split(' ')[1],
                      },
                      notes: school.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.notes,
                  },
                  school_time_frame_math_courses_must_be_completed: {
                      input: {
                          quantity: Number(school.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.input.split(' ')[0]),
                          units: school.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.input.split(' ')[1],
                      },
                      notes: school.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.notes,
                  },
              },
              notes: school.school_time_frame_criteria.school_time_frame_criteria_note_section,
          },
          draft: {
            input: {
                school_time_frame_all_courses_must_be_completed: {
                    input: {
                        quantity: Number(school.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.input.split(' ')[0]),
                        units: school.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.input.split(' ')[1],
                    },
                    notes: school.school_time_frame_criteria.school_time_frame_all_courses_must_be_completed.notes,
                },
                school_time_frame_science_courses_must_be_completed: {
                    input: {
                        quantity: Number(school.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.input.split(' ')[0]),
                        units: school.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.input.split(' ')[1],
                    },
                    notes: school.school_time_frame_criteria.school_time_frame_science_courses_must_be_completed.notes,
                },
                school_time_frame_math_courses_must_be_completed: {
                    input: {
                        quantity: Number(school.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.input.split(' ')[0]),
                        units: school.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.input.split(' ')[1],
                    },
                    notes: school.school_time_frame_criteria.school_time_frame_math_courses_must_be_completed.notes,
                },
            },
            notes: school.school_time_frame_criteria.school_time_frame_criteria_note_section,
        },
          },
          school_pass_fail_criteria: {
            ...defaultSchool.school_pass_fail_criteria,
            original: {
              input: {
                  school_pass_fail_grade_accepted: school.school_pass_fail_criteria.school_pass_fail_grade_accepted,
              },
              notes: school.school_pass_fail_criteria.school_pass_fail_grade_criteria_note_section,
          },
          draft: {
            input: {
                school_pass_fail_grade_accepted: school.school_pass_fail_criteria.school_pass_fail_grade_accepted,
            },
            notes: school.school_pass_fail_criteria.school_pass_fail_grade_criteria_note_section,
        },
          },
          school_ap_criteria: {
            ...defaultSchool.school_ap_criteria,
            original: {
              input: {
                school_ap_courses_accepted: school.school_ap_criteria.school_ap_courses_accepted,
              },
              notes: school.school_ap_criteria.school_ap_courses_criteria_note_section,
          },
          draft: {
              input: {
                school_ap_courses_accepted: school.school_ap_criteria.school_ap_courses_accepted,
              },
              notes: school.school_ap_criteria.school_ap_courses_criteria_note_section,
          },
          },
          school_community_college_criteria: {
            ...defaultSchool.school_community_college_criteria,
            original: {
              input: {
                school_community_college_credits_accepted: school.school_community_college_criteria.school_community_college_credits_accepted,
              },
              notes: school.school_community_college_criteria.school_community_college_criteria_note_section,
          },
          draft: {
              input: {
                school_community_college_credits_accepted: school.school_community_college_criteria.school_community_college_credits_accepted,
              },
              notes: school.school_community_college_criteria.school_community_college_criteria_note_section,
          },
          },
          school_clep_criteria: {
            ...defaultSchool.school_clep_criteria,
            original: {
              input: {
                school_clep_credits_accepted: school.school_clep_criteria.school_clep_credits_accepted,
              },
              notes: school.school_clep_criteria.school_clep_credits_criteria_note_section,
          },
          draft: {
              input: {
                school_clep_credits_accepted: school.school_clep_criteria.school_clep_credits_accepted,
              },
              notes: school.school_clep_criteria.school_clep_credits_criteria_note_section,
          },
          },
          school_online_courses_criteria: {
            ...defaultSchool.school_online_courses_criteria,
            original: {
              input: {
                school_online_courses_accepted: school.school_online_courses_criteria.school_online_courses_accepted,
              },
              notes: school.school_online_courses_criteria.school_online_courses_criteria_note_section,
          },
          draft: {
              input: {
                school_online_courses_accepted: school.school_online_courses_criteria.school_online_courses_accepted,
              },
              notes: school.school_online_courses_criteria.school_online_courses_criteria_note_section,
          },
          },
          school_prerequisite_completion_criteria: {
            ...defaultSchool.school_prerequisite_completion_criteria,
            original: {
                input: {
                    school_all_courses_most_be_completed_before_applying: school.school_prerequisite_completion_criteria.school_all_courses_most_be_completed_before_applying,
                    school_courses_can_be_in_progress_while_applying: school.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying,
                    school_maximum_number_of_courses_pending_while_applying:  school.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying !== null ? {
                        input: school.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying.input,
                        notes: school.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying.notes,
                    } : null,
                    school_maximum_number_of_credits_pending_while_applying: school.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying !== null ? {
                        input: school.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying.input,
                        notes: school.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying.notes,
                    } : null,
                    school_maximum_number_of_science_courses_pending_while_applying: school.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying !== null ? {
                        input: school.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying.input,
                        notes: school.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying.notes,
                    } : null,
                    school_maximum_number_of_non_science_courses_pending_while_applying: school.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying !== null ? {
                        input: school.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying.input,
                        notes: school.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying.notes
                    } : null,
                    school_minimum_grade_required_for_pending_courses: school.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses !== null ? {
                        input: school.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses.input,
                        notes: school.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses.notes,
                    } : null,
                    school_date_pending_courses_must_be_completed: school.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed !== null ? {
                        input: school.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed.input,
                        notes: school.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed.notes,
                    } : null,
                    school_semester_pending_courses_must_be_completed: school.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed !== null ? {
                        input: school.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed.input,
                        notes: school.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed.notes
                    } : null,
                },
                notes: school.school_prerequisite_completion_criteria.school_prerequisite_completion_criteria_note_section
            },
            draft: {
              input: {
                  school_all_courses_most_be_completed_before_applying: school.school_prerequisite_completion_criteria.school_all_courses_most_be_completed_before_applying,
                  school_courses_can_be_in_progress_while_applying: school.school_prerequisite_completion_criteria.school_courses_can_be_in_progress_while_applying,
                  school_maximum_number_of_courses_pending_while_applying:  school.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying !== null ? {
                      input: school.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying.input,
                      notes: school.school_prerequisite_completion_criteria.school_maximum_number_of_courses_pending_while_applying.notes,
                  } : null,
                  school_maximum_number_of_credits_pending_while_applying: school.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying !== null ? {
                      input: school.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying.input,
                      notes: school.school_prerequisite_completion_criteria.school_maximum_number_of_credits_pending_while_applying.notes,
                  } : null,
                  school_maximum_number_of_science_courses_pending_while_applying: school.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying !== null ? {
                      input: school.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying.input,
                      notes: school.school_prerequisite_completion_criteria.school_maximum_number_of_science_courses_pending_while_applying.notes,
                  } : null,
                  school_maximum_number_of_non_science_courses_pending_while_applying: school.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying !== null ? {
                      input: school.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying.input,
                      notes: school.school_prerequisite_completion_criteria.school_maximum_number_of_non_science_courses_pending_while_applying.notes
                  } : null,
                  school_minimum_grade_required_for_pending_courses: school.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses !== null ? {
                      input: school.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses.input,
                      notes: school.school_prerequisite_completion_criteria.school_minimum_grade_required_for_pending_courses.notes,
                  } : null,
                  school_date_pending_courses_must_be_completed: school.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed !== null ? {
                      input: school.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed.input,
                      notes: school.school_prerequisite_completion_criteria.school_date_pending_courses_must_be_completed.notes,
                  } : null,
                  school_semester_pending_courses_must_be_completed: school.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed !== null ? {
                      input: school.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed.input,
                      notes: school.school_prerequisite_completion_criteria.school_semester_pending_courses_must_be_completed.notes
                  } : null,
              },
              notes: school.school_prerequisite_completion_criteria.school_prerequisite_completion_criteria_note_section
          },
          },
          school_paid_experience_required: {
            ...defaultSchool.school_paid_experience_required,
            original: {
                input: school.school_paid_experience_required.input,
                notes: school.school_paid_experience_required.school_paid_experience_required_notes,
            },
            draft: {
              input: school.school_paid_experience_required.input,
              notes: school.school_paid_experience_required.school_paid_experience_required_notes,
          },
          },
          school_patient_experience: {
            ...defaultSchool.school_patient_experience,
            original: {
              input: {
                  school_patient_experience_required: {
                      input: school.school_patient_experience.school_patient_experience_required,
                  },
                  school_patient_experience_recommended: {
                      input: school.school_patient_experience.school_patient_experience_recommended,
                  },
                  school_minimum_patient_care_experience_hours_required: school.school_patient_experience.school_minimum_patient_care_experience_hours_required !== null ? {
                      input: school.school_patient_experience.school_minimum_patient_care_experience_hours_required.input,
                      notes: school.school_patient_experience.school_minimum_patient_care_experience_hours_required.school_minimum_patient_care_experience_hours_required_notes,
                  } : null,
                  school_minimum_patient_care_experience_hours_recommended: school.school_patient_experience.school_minimum_patient_care_experience_hours_recommended !== null ? {
                      input: school.school_patient_experience.school_minimum_patient_care_experience_hours_recommended.input,
                      notes: school.school_patient_experience.school_minimum_patient_care_experience_hours_recommended.school_minimum_patient_care_experience_hours_recommended_notes,
                  } : null,
                  school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required: school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed !== null ? {
                      input: {
                          quantity: Number(school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input.split(' ')[0]),
                          units: school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input.split(' ')[1]
                      },
                      notes: school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes,
                  } : null,
                  school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended !== null ? {
                    input: {
                        quantity: Number(school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.input.split(' ')[0]),
                        units: school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.input.split(' ')[1]
                    },
                    notes: school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended_notes,
                } : null,
                  school_average_patient_care_experience_hours_accepted_previous_cycle: {
                      input: school.school_patient_experience.school_average_patient_care_experience_hours_accepted_previous_cycle,
                  }
              },
              notes:school.school_patient_experience.school_patient_care_experience_general_notes,
          },
          draft: {
            input: {
                school_patient_experience_required: {
                    input: school.school_patient_experience.school_patient_experience_required,
                },
                school_patient_experience_recommended: {
                    input: school.school_patient_experience.school_patient_experience_recommended,
                },
                school_minimum_patient_care_experience_hours_required: school.school_patient_experience.school_minimum_patient_care_experience_hours_required !== null ? {
                    input: school.school_patient_experience.school_minimum_patient_care_experience_hours_required.input,
                    notes: school.school_patient_experience.school_minimum_patient_care_experience_hours_required.school_minimum_patient_care_experience_hours_required_notes,
                } : null,
                school_minimum_patient_care_experience_hours_recommended: school.school_patient_experience.school_minimum_patient_care_experience_hours_recommended !== null ? {
                    input: school.school_patient_experience.school_minimum_patient_care_experience_hours_recommended.input,
                    notes: school.school_patient_experience.school_minimum_patient_care_experience_hours_recommended.school_minimum_patient_care_experience_hours_recommended_notes,
                } : null,
                school_minimum_time_frame_patient_care_experience_needs_to_be_completed_required: school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed !== null ? {
                    input: {
                        quantity: Number(school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input.split(' ')[0]),
                        units: school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.input.split(' ')[1]
                    },
                    notes: school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_notes,
                } : null,
                school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended: school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended !== null ? {
                  input: {
                      quantity: Number(school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.input.split(' ')[0]),
                      units: school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.input.split(' ')[1]
                  },
                  notes: school.school_patient_experience.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended.school_minimum_time_frame_patient_care_experience_needs_to_be_completed_recommended_notes,
              } : null,
                school_average_patient_care_experience_hours_accepted_previous_cycle: {
                    input: school.school_patient_experience.school_average_patient_care_experience_hours_accepted_previous_cycle,
                }
            },
            notes:school.school_patient_experience.school_patient_care_experience_general_notes,
        },
          },
          school_healthcare_experience: {
            ...defaultSchool.school_healthcare_experience,
            original: {
              input: {
                  school_healthcare_experience_required: {
                      input: school.school_healthcare_experience.school_healthcare_experience_required,
                  },
                  school_healthcare_experience_recommended: {
                      input: school.school_healthcare_experience.school_healthcare_experience_recommended,
                  },
                  school_minimum_healthcare_experience_hours_required: school.school_healthcare_experience.school_minimum_healthcare_experience_hours_required !== null ? {
                      input: school.school_healthcare_experience.school_minimum_healthcare_experience_hours_required.input,
                      notes: school.school_healthcare_experience.school_minimum_healthcare_experience_hours_required.school_minimum_healthcare_experience_hours_required_notes,
                  } : null,
                  school_minimum_healthcare_experience_hours_recommended: school.school_healthcare_experience.school_minimum_healthcare_experience_hours_recommended !== null ? {
                      input: school.school_healthcare_experience.school_minimum_healthcare_experience_hours_recommended.input,
                      notes: school.school_healthcare_experience.school_minimum_healthcare_experience_hours_recommended.school_minimum_healthcare_experience_hours_recommended_notes,
                  } : null,
                  school_minimum_time_frame_healthcare_experience_needs_to_be_completed_required: school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed !== null ? {
                      input: {
                          quantity: Number(school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input.split(' ')[0]),
                          units: school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input.split(' ')[1],
                      },
                      notes: school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_notes
                  } : null,
                  school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended: school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended !== null ? {
                    input: {
                        quantity: Number(school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended.input.split(' ')[0]),
                        units: school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended.input.split(' ')[1],
                    },
                    notes: school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended_notes
                } : null,
                  school_average_healthcare_experience_hours_accepted_previous_cycle: {
                      input: school.school_healthcare_experience.school_average_healthcare_experience_hours_accepted_previous_cycle,
                  },
              },
              notes: school.school_healthcare_experience.school_healthcare_experience_general_notes,
          },
          draft: {
            input: {
                school_healthcare_experience_required: {
                    input: school.school_healthcare_experience.school_healthcare_experience_required,
                },
                school_healthcare_experience_recommended: {
                    input: school.school_healthcare_experience.school_healthcare_experience_recommended,
                },
                school_minimum_healthcare_experience_hours_required: school.school_healthcare_experience.school_minimum_healthcare_experience_hours_required !== null ? {
                    input: school.school_healthcare_experience.school_minimum_healthcare_experience_hours_required.input,
                    notes: school.school_healthcare_experience.school_minimum_healthcare_experience_hours_required.school_minimum_healthcare_experience_hours_required_notes,
                } : null,
                school_minimum_healthcare_experience_hours_recommended: school.school_healthcare_experience.school_minimum_healthcare_experience_hours_recommended !== null ? {
                    input: school.school_healthcare_experience.school_minimum_healthcare_experience_hours_recommended.input,
                    notes: school.school_healthcare_experience.school_minimum_healthcare_experience_hours_recommended.school_minimum_healthcare_experience_hours_recommended_notes,
                } : null,
                school_minimum_time_frame_healthcare_experience_needs_to_be_completed_required: school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed !== null ? {
                    input: {
                        quantity: Number(school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input.split(' ')[0]),
                        units: school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.input.split(' ')[1],
                    },
                    notes: school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_notes
                } : null,
                school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended: school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended !== null ? {
                  input: {
                      quantity: Number(school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended.input.split(' ')[0]),
                      units: school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended.input.split(' ')[1],
                  },
                  notes: school.school_healthcare_experience.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended.school_minimum_time_frame_healthcare_experience_needs_to_be_completed_recommended_notes
              } : null,
                school_average_healthcare_experience_hours_accepted_previous_cycle: {
                    input: school.school_healthcare_experience.school_average_healthcare_experience_hours_accepted_previous_cycle,
                },
            },
            notes: school.school_healthcare_experience.school_healthcare_experience_general_notes,
        },
          },
          school_community_service: {
            ...defaultSchool.school_community_service,
            original: {
              input: {
                  school_community_service_required: {
                      input: school.school_community_service.school_community_service_required,
                  },
                  school_minimum_community_service_hours_required: school.school_community_service.school_minimum_community_service_hours_required !== null ? {
                      input: school.school_community_service.school_minimum_community_service_hours_required.input,
                      notes: school.school_community_service.school_minimum_community_service_hours_required.school_minimum_community_service_hours_required_notes,
                  } : null,
                  school_community_service_recommended: {
                      input: school.school_community_service.school_community_service_recommended,
                  },
                  school_minimum_community_service_hours_recommended: school.school_community_service.school_minimum_community_service_hours_recommended !== null ? {
                      input: school.school_community_service.school_minimum_community_service_hours_recommended.input,
                      notes: school.school_community_service.school_minimum_community_service_hours_recommended.school_minimum_community_service_hours_recommended_notes,
                  } : null,
                  school_average_community_service_hours_accepted_previous_cycle: {
                      input: school.school_community_service.school_average_community_service_hours_accepted_previous_cycle
                  },
              },
              notes: school.school_community_service.school_community_service_general_notes,
          },
          draft: {
            input: {
                school_community_service_required: {
                    input: school.school_community_service.school_community_service_required,
                },
                school_minimum_community_service_hours_required: school.school_community_service.school_minimum_community_service_hours_required !== null ? {
                    input: school.school_community_service.school_minimum_community_service_hours_required.input,
                    notes: school.school_community_service.school_minimum_community_service_hours_required.school_minimum_community_service_hours_required_notes,
                } : null,
                school_community_service_recommended: {
                    input: school.school_community_service.school_community_service_recommended,
                },
                school_minimum_community_service_hours_recommended: school.school_community_service.school_minimum_community_service_hours_recommended !== null ? {
                    input: school.school_community_service.school_minimum_community_service_hours_recommended.input,
                    notes: school.school_community_service.school_minimum_community_service_hours_recommended.school_minimum_community_service_hours_recommended_notes,
                } : null,
                school_average_community_service_hours_accepted_previous_cycle: {
                    input: school.school_community_service.school_average_community_service_hours_accepted_previous_cycle
                },
            },
            notes: school.school_community_service.school_community_service_general_notes,
        },
          },
          school_volunteer_service: {
            ...defaultSchool.school_volunteer_service,
            original: {
              input: {
                  school_volunteer_service_required: {
                      input: school.school_volunteer_service.school_volunteer_service_required,
                  },
                  school_minimum_volunteer_service_hours_required: school.school_volunteer_service.school_minimum_volunteer_service_hours_required !== null ? {
                      input: school.school_volunteer_service.school_minimum_volunteer_service_hours_required.input,
                      notes: school.school_volunteer_service.school_minimum_volunteer_service_hours_required.school_minimum_volunteer_service_hours_required_notes,
                  } : null,
                  school_volunteer_service_recommended: {
                      input: school.school_volunteer_service.school_volunteer_service_recommended,
                  },
                  school_minimum_volunteer_service_hours_recommended: school.school_volunteer_service.school_minimum_volunteer_service_hours_recommended !== null ? {
                      input: school.school_volunteer_service.school_minimum_volunteer_service_hours_recommended.input,
                      notes: school.school_volunteer_service.school_minimum_volunteer_service_hours_recommended.school_minimum_volunteer_service_hours_recommended_notes,
                  } : null,
                  school_average_volunteer_service_hours_accepted_previous_cycle: {
                      input: school.school_volunteer_service.school_average_volunteer_service_hours_accepted_previous_cycle,
                  },
              },
              notes: school.school_volunteer_service.school_volunteer_service_general_notes
          },
          draft: {
            input: {
                school_volunteer_service_required: {
                    input: school.school_volunteer_service.school_volunteer_service_required,
                },
                school_minimum_volunteer_service_hours_required: school.school_volunteer_service.school_minimum_volunteer_service_hours_required !== null ? {
                    input: school.school_volunteer_service.school_minimum_volunteer_service_hours_required.input,
                    notes: school.school_volunteer_service.school_minimum_volunteer_service_hours_required.school_minimum_volunteer_service_hours_required_notes,
                } : null,
                school_volunteer_service_recommended: {
                    input: school.school_volunteer_service.school_volunteer_service_recommended,
                },
                school_minimum_volunteer_service_hours_recommended: school.school_volunteer_service.school_minimum_volunteer_service_hours_recommended !== null ? {
                    input: school.school_volunteer_service.school_minimum_volunteer_service_hours_recommended.input,
                    notes: school.school_volunteer_service.school_minimum_volunteer_service_hours_recommended.school_minimum_volunteer_service_hours_recommended_notes,
                } : null,
                school_average_volunteer_service_hours_accepted_previous_cycle: {
                    input: school.school_volunteer_service.school_average_volunteer_service_hours_accepted_previous_cycle,
                },
            },
            notes: school.school_volunteer_service.school_volunteer_service_general_notes
        },
          },
          school_pa_shadowing_required: {
            ...defaultSchool.school_pa_shadowing_required,
            original: {
              input: {
                  school_pa_shadowing_required: school.school_pa_shadowing_required.input,
                  school_minimum_pa_shadowing_hours_required: school.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required,
              },
              notes: school.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required_notes,
          },
          draft: {
            input: {
                school_pa_shadowing_required: school.school_pa_shadowing_required.input,
                school_minimum_pa_shadowing_hours_required: school.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required,
            },
            notes: school.school_pa_shadowing_required.school_minimum_pa_shadowing_hours_required_notes,
        },
          },
          school_pa_shadowing_recommended: {
            ...defaultSchool.school_pa_shadowing_recommended,
            original: {
              input: {
                school_pa_shadowing_recommended: school.school_pa_shadowing_recommended.input,
                school_minimum_pa_shadowing_hours_recommended: school.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended,
              },
              notes: school.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended_notes,
          },
          draft: {
            input: {
              school_pa_shadowing_recommended: school.school_pa_shadowing_recommended.input,
              school_minimum_pa_shadowing_hours_recommended: school.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended,
            },
            notes: school.school_pa_shadowing_recommended.school_minimum_pa_shadowing_hours_recommended_notes,
        },
          },
          school_average_pa_shadowing_hours_accepted_previous_cycle: {
            ...defaultSchool.school_average_pa_shadowing_hours_accepted_previous_cycle,
            original: {
                input: school.school_average_pa_shadowing_hours_accepted_previous_cycle.input,
                notes: school.school_average_pa_shadowing_hours_accepted_previous_cycle.school_average_pa_shadowing_hours_accepted_previous_cycle_notes,
            },
            draft: {
              input: school.school_average_pa_shadowing_hours_accepted_previous_cycle.input,
              notes: school.school_average_pa_shadowing_hours_accepted_previous_cycle.school_average_pa_shadowing_hours_accepted_previous_cycle_notes,
          },
          },
          school_certifications_required: {
            ...defaultSchool.school_certifications_required,
            original: {
              input: {
                  school_certifications_required: {
                      input: school.school_certifications_required.input,
                  },
                  school_certifications_required_options: school.school_certifications_required.school_certifications_required_options !== null ? {
                      input: school.school_certifications_required.school_certifications_required_options.map(opt => ({
                        value: opt,
                      }))
                  } : null,
              },
              notes: school.school_certifications_required.school_certification_notes,
          },
          draft: {
            input: {
                school_certifications_required: {
                    input: school.school_certifications_required.input,
                },
                school_certifications_required_options: school.school_certifications_required.school_certifications_required_options !== null ? {
                    input: school.school_certifications_required.school_certifications_required_options.map(opt => ({
                      value: opt,
                    }))
                } : null,
            },
            notes: school.school_certifications_required.school_certification_notes,
        },
          },
          school_application_submitted_on_caspa: {
            ...defaultSchool.school_application_submitted_on_caspa,
            original: {
              input: {
                  school_application_submitted_on_caspa: school.school_application_submitted_on_caspa.input,
                  school_caspa_application_deadline_date: school.school_application_submitted_on_caspa.school_caspa_application_deadline_date,
                  school_caspa_application_deadline_type: school.school_application_submitted_on_caspa.school_caspa_application_deadline_type
              },
              notes: school.school_application_submitted_on_caspa.school_caspa_application_notes,
          },
          draft: {
            input: {
                school_application_submitted_on_caspa: school.school_application_submitted_on_caspa.input,
                school_caspa_application_deadline_date: school.school_application_submitted_on_caspa.school_caspa_application_deadline_date,
                school_caspa_application_deadline_type: school.school_application_submitted_on_caspa.school_caspa_application_deadline_type
            },
            notes: school.school_application_submitted_on_caspa.school_caspa_application_notes,
        },
          },
          school_application_submitted_directly_to_school: {
            ...defaultSchool.school_application_submitted_directly_to_school,
            original: {
              input: {
                  school_application_submitted_directly_to_school: school.school_application_submitted_directly_to_school.input,
                  school_application_direct_to_school_deadline: school.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline,
                  school_application_direct_to_school_fee: school.school_application_submitted_directly_to_school.school_application_direct_to_school_fee,
              },
              notes: school.school_application_submitted_directly_to_school.school_application_direct_to_school_notes,
          },
          draft: {
            input: {
                school_application_submitted_directly_to_school: school.school_application_submitted_directly_to_school.input,
                school_application_direct_to_school_deadline: school.school_application_submitted_directly_to_school.school_application_direct_to_school_deadline,
                school_application_direct_to_school_fee: school.school_application_submitted_directly_to_school.school_application_direct_to_school_fee,
            },
            notes: school.school_application_submitted_directly_to_school.school_application_direct_to_school_notes,
        },
          },
          school_supplemental_application_required: {
            ...defaultSchool.school_supplemental_application_required,
            original: {
              input: {
                  school_supplemental_application_required: school.school_supplemental_application_required.input,
                  school_supplemental_application_deadline: school.school_supplemental_application_required.school_supplemental_application_deadline,
                  school_supplemental_application_fee: school.school_supplemental_application_required.school_supplemental_application_fee,
                  school_supplemental_application_link: school.school_supplemental_application_required.school_supplemental_application_link,
                  school_supplemental_application_link_provided_with_invite_only: school.school_supplemental_application_required.school_supplemental_application_link_provided_with_invite_only,
              },
              notes: school.school_supplemental_application_required.school_supplemental_application_notes,
          },
          draft: {
            input: {
                school_supplemental_application_required: school.school_supplemental_application_required.input,
                school_supplemental_application_deadline: school.school_supplemental_application_required.school_supplemental_application_deadline,
                school_supplemental_application_fee: school.school_supplemental_application_required.school_supplemental_application_fee,
                school_supplemental_application_link: school.school_supplemental_application_required.school_supplemental_application_link,
                school_supplemental_application_link_provided_with_invite_only: school.school_supplemental_application_required.school_supplemental_application_link_provided_with_invite_only,
            },
            notes: school.school_supplemental_application_required.school_supplemental_application_notes,
        },
          },
          school_international_students_accepted: {
            ...defaultSchool.school_international_students_accepted,
            original: {
              input: school.school_international_students_accepted.input,
              notes: school.school_international_students_accepted.notes,
            },
            draft: {
              input: school.school_international_students_accepted.input,
              notes: school.school_international_students_accepted.notes,
            },
          },
          school_preference: {
            ...defaultSchool.school_preference,
            original: {
              input: school.school_preference,
            },
            draft: {
              input: school.school_preference,
            },
          }
        }
      })
    }
  }, [schools])

  // useEffect(() => {
  //   const updateAllSchools = async () => {
  //     if (schools) {
  //       const promises = schools.map(async (school) => {
  //         if (school.school_exams_general_note === undefined) {
  //           const updatedSchool: School = {
  //             ...school, 
  //             school_exams_general_note: "",
  //           }
            
  //           return updateSchoolDoc(updatedSchool, school.id);
  //         }
  //       });

  //       try {
  //         await Promise.all(promises);
  //       } catch (err:any) {
  //         console.log(err);
  //       }
  //     }
  //   };

  //   updateAllSchools();
    
  // })


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
    localStorage.removeItem('newSchool');
    setToggleSideMenu(false)
    //eslint-disable-next-line
  }, [])
  
  // const addSchoolButton = () => {
  //   dispatch(setIsEdit(false));
  //   navigate('/schools/add-school#general-info');
  // };

  const addSchoolButton = () => {
    dispatch(setIsEditSchool(false));
    dispatch(setSelectedSchool(defaultSchool))
    navigate('/schools/add-school#general-info');
  };

  // const editSchool = (school: School) => {
  //   dispatch(setIsEdit(true));
  //   localStorage.setItem('newSchool', JSON.stringify(school));
  //   navigate('/schools/add-school#general-info');
  // };

  const editSchool = (school: NewSchool) => {
    dispatch(setIsEditSchool(true));
    dispatch(setSelectedSchool(school));
    navigate('/schools/add-school#general-info');
  };

  // const deleteSchool = (e:any, schoolName: string) => {
  //   setName(schoolName);
  //   toggleDelete(e)
  // };

  const changeLiveStatus = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    if (!loggedInUser.permissions.canMakeLive) return;
    const selectedSchool = schools.find(school => school.id === id);
    if (selectedSchool) {
      const updatedSchool = {
        ...selectedSchool,
        isLive: !selectedSchool.isLive,
      }
      try {
        await addDocToSchoolCollection(updatedSchool, updatedSchool.id);
        dispatch(editSchoolData(updatedSchool));
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
        <div >
          <p className='text-[48px] font-medium'>Schools</p>
          <p className='text-xl'>Total: {schools.length}</p>
        </div>

        {loggedInUser.permissions.canAddOrDelete && <button className={`text-lg border-2 
        border-[#F06A6A] text-[#F06A6A] rounded py-2 px-4 hover:text-white hover:bg-[#F06A6A]`} onClick={addSchoolButton}>
          + Add School
        </button>}
      </div>
      <div className={`w-full max-w-[1800px] px-10 pb-10`}>
      <div className={`w-full rounded-t-xl shadow-lg 
      shadow-gray-600`}>
        <table className='w-full relative'>
          <thead className='bg-[#eeeef2] mt-8 sticky top-[256px] z-20'>
            <tr>
              <th scope="col" className='font-semibold text-xl text-left p-[10px]'>Logo</th>
              <th scope="col" className='font-semibold text-xl text-left p-[10px]'>Name</th>
              <th scope="col" className='font-semibold text-xl text-left p-[10px]'>City</th>
              <th scope="col" className='font-semibold text-xl text-left p-[10px]'>State</th>
              <th scope='col' className='font-semibold text-xl text-right p-[10px]'>Live Status</th>
            </tr>
          </thead>
          <tbody>
          {/* {
            schools && schools.filter(school => school.school_name.input.toLowerCase().includes(schoolName)).filter(item => stateSearch.length === 0 ?
              item : stateSearch.includes(item.school_state.input)).map((d, i) => (
                <tr className="border-b-[0.125px] border-gray-400">
                  <td className='text-xl text-left p-[10px]'>{d.school_name.input}</td>
                  <td className='text-xl text-left p-[10px]'>{d.school_city.input}</td>
                  <td className='text-xl text-left p-[10px]'>{d.school_state.input}</td>
                  <td className='flex justify-end items-center p-[10px]'>
                    {canEdit && <button onClick={() => editSchool(d)}><FiEdit3 className='h-7 w-7 border-2 rounded border-[#4573D2] bg-none text-[#4573D2] hover:text-white hover:bg-[#4573D2]'/></button>}
                    {loggedInUser.permissions.canAddOrDelete && <button onClick={(e:any) => deleteSchool(e, d.school_name.input)} className='ml-2'><AiOutlineClose className='h-7 w-7 border-2 rounded border-[#F06A6A] bg-none text-[#F06A6A] hover:text-white hover:bg-[#F06A6A]'/></button>}
                    <button onClick={(e:MouseEvent<HTMLButtonElement>) => changeLiveStatus(e, d.id)}><HiOutlineSignal className={`h-7 w-7 ml-2 ${d.isLive ? 'text-[#4FC769]' : 'text-[#B4B4B4]'}`}/></button>
                  </td>
                </tr>
              )
            )
          } */}
          {
            newSchools && newSchools.filter(school => school.school_name.original.input.toLowerCase().includes(schoolName)).filter(item => stateSearch.length === 0 ?
              item : stateSearch.includes(item.school_state.original.input)).map((d, i) => (
                <tr className="border-b-[0.125px] border-gray-400">
                  <td className='p-[10px]'>
                    <div className='w-[80px] border border-outline'>
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