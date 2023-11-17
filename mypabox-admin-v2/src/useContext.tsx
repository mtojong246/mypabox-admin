import React, { FC, ReactNode, createContext, useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode;
}

const SchoolContext = createContext({
  handleSchoolName: (e: any) => {},
  handleStateSearch: (e: any) => {},
  handleName: (e: any) => {},
  handleState: (e: any) => {},
  handleOpenForm: (e: any) => {},
  handleToggleSideMenu: (e: any) => {},
  handleCity: (e: any) => {},
  schoolName: '',
  state: '',
  city: '',
  openForm: false,
  name: '',
  stateSearch: [{}],
  toggleSideMenu: false,
  show: true,
  setName: (e: any) => {},
  setState: (e: any) => {},
  setCity: (e: any) => {},
  setOpenForm: (v: boolean) => {},
  setShow: (v: boolean) => {},
  setStateSearch: (newValue: Array<Object>) => {},
  setToggleSideMenu: (e:any) => {},
  
});

const SchoolContextProvider: FC<Props> = ({ children }: { children: ReactNode }) => {
  const [schoolName, setSchoolName] = useState('')
  const [stateSearch, setStateSearch] = useState([{}])
  const [name, setName] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [openForm, setOpenForm] = useState(false)
  const [show, setShow] = useState(true)
  const [toggleSideMenu, setToggleSideMenu] = useState(false)
  
  // Converts current value of input field to all lowercase letters
  const handleSchoolName = (e: { target: { value: string; }; }) => {
    setSchoolName(e.target.value.toLowerCase())
  }
  
  // Sets stateSearch to mapped newValue array which displays the value of each state in an array
  const handleStateSearch = (newValue: any) => {
    setStateSearch(newValue.map((state: any) => state.value))
  }
  
  /* Uses boolean value so when openForm is false, it will set openForm to true and the 
  add school form will be seen and vice versa */
  const handleOpenForm = () => {
    setOpenForm(!openForm)
  }
  
  // Sets name to value of input field
  const handleName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(e.target.value)
  }
  
  // Sets state to value of input field
  const handleState = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setState(e.target.value)
  }
  
  // Sets city to value of input field
  const handleCity = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCity(e.target.value)
  }



  const handleToggleSideMenu = () => {
    setToggleSideMenu(!toggleSideMenu)
  }

  return (
    <SchoolContext.Provider value={{ handleCity, handleState, handleName, handleOpenForm, handleStateSearch, handleSchoolName,
      schoolName, state, city, name, openForm, stateSearch, setName, setState, setCity, setOpenForm, setStateSearch,
      handleToggleSideMenu, toggleSideMenu, show, setShow, setToggleSideMenu }}>
      {children}
    </SchoolContext.Provider>
  )
}

export { SchoolContext, SchoolContextProvider }