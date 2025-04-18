import { useState } from 'react'
import { Box, Toolbar } from '@mui/material'
import { NavBar } from '../components/NavBar'
import { SideBar } from '../components/SideBar'

const drawerWidth = 240

export const JournalLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate__faster">

      <NavBar drawerWidth={drawerWidth} toggleSidebar={toggleSidebar} />

      <SideBar 
        drawerWidth={drawerWidth} 
        isActive={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />

      <Box 
        component='main'
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>

    </Box>
  )
}
