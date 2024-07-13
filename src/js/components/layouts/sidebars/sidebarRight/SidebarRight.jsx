import React from 'react'
import './SidebarRight.css'
import SidebarRow from '../sidebarLeft/SidebarRow'
import { List, ListItem, ListItemButton } from '@mui/material'
import PropTypes from 'prop-types'

export default function Widgets({ friendsOnline = [] }) {
  console.log(friendsOnline)
  return (
    <div className="widgets">
      <List>
        {friendsOnline.map((el, idx) => {
          return (
            <ListItem disablePadding key={idx}>
              <ListItemButton component="a" href="#">
                <SidebarRow
                  src={el.avatar_account}
                  title={el.user_fname + '_' + el.user_lname}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

Widgets.propTypes = {
  friendsOnline: PropTypes.object,
}
