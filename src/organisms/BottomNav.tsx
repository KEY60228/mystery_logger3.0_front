import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import LockOpenIcon from '@material-ui/icons/LockOpen'

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

  return (
    <BottomNavigation
      value={value}
      onChange={(ev, newValue) => setValue(newValue)}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to={'/'}
        label='Top'
        icon={<HomeIcon />}
      />
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
      <BottomNavigationAction
        component={Link}
        to={'/preregister'} 
        label='Sign up' 
        icon={<HowToRegIcon />} 
      />
      <BottomNavigationAction
        component={Link}
        to={`/login`} 
        label='Login' 
        icon={<LockOpenIcon />} 
      />
    </BottomNavigation>
  )
}