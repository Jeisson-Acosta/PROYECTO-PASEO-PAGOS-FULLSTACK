import { useEffect, useState } from 'react'
import './App.css'
import { HeaderApp } from './components/HeaderApp.jsx'
import { useInfo } from './hooks/useInfo.js'
import { TableUsers } from './components/TableUsers.jsx'
import { AddPerson } from './components/modals/AddPerson.jsx'
import { useAddPerson } from './hooks/modals/useAddPerson.js'
import { getAllInfo } from '../services/getAllInfo.js'

function App() {
  const { setAllInfo } = useInfo()
  const { open, dataToEdit } = useAddPerson()
  useEffect(() => { getAllInfo(setAllInfo) }, [])

  return (
    <>
      <HeaderApp />
      <TableUsers />
      {open && <AddPerson data={dataToEdit} />}
    </>
  )
}

export default App
