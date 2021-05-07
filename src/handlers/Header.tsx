import React, { FC, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Button, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { SideMenu } from './SideMenu'

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            height: '72px',
            width: '100%',
            borderBottom: 'solid #C0C0C0 1px',
            position: 'fixed',
            backgroundColor: theme.palette.common.white,
            zIndex: 1000,
        },
        titleLink: {
            height: '40px',
            padding: '0',
            margin: '16px 20px',
        },
        titleLogo: {
            height: '40px',
        },
        buttons: {
            margin: '16px 20px',
            float: 'right',
        },
        button: {
            height: '40px',
            width: '40px',
            padding: '0',
            marginLeft: '8px',
        },
        fake: {
            height: '72px',
        },
    }),
)

export const Header: FC = () => {
    const classes = useStyles()
    const history = useHistory()
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    return (
        <>
            <Box className={classes.root}>
                <Button component={Link} to="/" className={classes.titleLink}>
                    <img
                        src={'/img/TitleLogo.png'}
                        className={classes.titleLogo}
                    />
                </Button>
                <Box className={classes.buttons}>
                    <IconButton onClick={() => history.push('/search/keywords')} className={classes.button}>
                        <SearchIcon fontSize="large" />
                    </IconButton>
                    <IconButton onClick={() => setMenuOpen(true)} className={classes.button}>
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Box>
            <Box className={classes.fake} />
            <SideMenu
                open={menuOpen}
                setOpen={setMenuOpen}
            />
        </>
    )
}
