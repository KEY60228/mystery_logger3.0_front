import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import HistoryIcon from '@material-ui/icons/History'
import SearchIcon from '@material-ui/icons/Search'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import NotificationsIcon from '@material-ui/icons/Notifications'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import PersonIcon from '@material-ui/icons/Person'

import { RootState } from '../stores/index'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      position: "fixed",
      width: "100%",
      left: 0,
      bottom: 0,
    }
  })
)

export const BottomNav: FC = (

) => {
  const classes = useStyles()
  const [value, setValue] = useState<number>(0)

  const isLogin = useSelector((state: RootState) => !! state.auth.user)
  const userName = useSelector((state: RootState) => state.auth.user ? state.auth.user.name : '')
  const userId = useSelector((state: RootState) => state.auth.user ? state.auth.user.account_id : '')

  return (
    <BottomNavigation
      value={value}
      onChange={(ev, newValue) => setValue(newValue)}
      showLabels
      className={classes.root}
    >
      { !isLogin &&
        <BottomNavigationAction
          component={Link}
          to={'/'}
          label='Top'
          icon={<HomeIcon />}
        />
      }
      { isLogin &&
        <BottomNavigationAction
          component={Link}
          to={'/timeline'}
          label='Timeline'
          icon={<HistoryIcon />}
        />
      }
      <BottomNavigationAction
        component={Link}
        to={'/search'} 
        label='Search' 
        icon={<SearchIcon />} 
      />
      <BottomNavigationAction
        component={Link}
        to={'/trend'} 
        label='Trend' 
        icon={<TrendingUpIcon />} 
      />
      { !isLogin &&
        <BottomNavigationAction
          component={Link}
          to={'/preregister'} 
          label='Sign up' 
          icon={<HowToRegIcon />} 
        />
      }
      { isLogin &&
        <BottomNavigationAction
          component={Link}
          to={'/notifications'} 
          label='Notifications' 
          icon={<NotificationsIcon />} 
        />
      }
      { !isLogin &&
        <BottomNavigationAction
          component={Link}
          to={`/login`} 
          label='Login' 
          icon={<LockOpenIcon />} 
        />
      }
      { isLogin &&
        <BottomNavigationAction
          component={Link}
          to={`/users/${userId}`} 
          label={`${userName}`} 
          icon={<PersonIcon />} 
        />
      }
    </BottomNavigation>
  )
}