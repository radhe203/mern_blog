import React, { useEffect, useState } from 'react'
import {useLocation} from "react-router-dom"
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPost from '../components/DashPost'
function Dashboard() {
  const [tab,setTab] = useState()
  console.log(tab)
  const location = useLocation()
  useEffect(()=>{
    const urlPrams = new URLSearchParams(location.search)
    const tabFormUrl = urlPrams.get('tab')
    if(tabFormUrl){
      setTab(tabFormUrl)
    }

  },[location.search])
  return (
    <div className=' min-h-screen flex flex-col md:flex-row'>
      <div className=' md:w-56'>
        <DashSidebar/>
      </div>
      {tab === "profile" && <DashProfile/>}
      {tab === "posts" && <DashPost/>}
    </div>
  )
}

export default Dashboard