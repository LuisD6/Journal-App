import { Box, Divider, Drawer, List, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem"

export const SideBar = ({ drawerWidth = 240, isActive, toggleSidebar }) => {

  const { displayName } = useSelector(state => state.auth)
  const { notes } = useSelector(state => state.journal)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? isActive : true}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true, // Mejora el rendimiento en móvil
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component='div'>
            {displayName}
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {notes.map(note => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  )
}
