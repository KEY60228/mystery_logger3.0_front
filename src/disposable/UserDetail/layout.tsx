import React, { FC, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider } from '@material-ui/core'

import { User, UserContents, UserDetail } from '../../@types'
import { UserProfile } from './components/UserProfile'
import { UserStatics } from './components/UserStatics'
import { UserTabs } from './components/UserTabs'
import { Footer } from '../../reusable/Footer'
import { FollowList } from './components/FollowList'
import { UserForm } from './components/UserForm'
import { LinearLoader } from '../../handlers/Loader/LinearLoader'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores'
import { headerHeight, footerHeight } from '../../util'

interface Props {
    user: UserDetail
    userFormOpen: boolean
    setUserFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    userContents: UserContents
    setUserContents: React.Dispatch<React.SetStateAction<UserContents>>
    image_name: File | null
    setImage_name: React.Dispatch<React.SetStateAction<File|null>>
    editUser: () => void
    updateUser: () => void
    follow: (user: User) => void
    unfollow: (user: User) => void
    logout: () => void
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '16px auto 24px',
            minHeight: `calc(100vh - ${headerHeight} - ${footerHeight} - 40px)`,
            maxWidth: '600px',
        },
        innerBox: {
            margin: '0 20px',
        },
        divider: {
            marginTop: '16px',
        },
        staticDivider: {
            margin: '24px 0',
        },
        lastDivider: {
            margin: '24px 0 40px',
        },
    })
)

export const UserDetailTemplate: FC<Props> = props => {
    const classes = useStyles()

    const loading = useSelector((state: RootState) => state.error.loading)

    const [followsOpen, setFollowsOpen] = useState<boolean>(false)
    const [followersOpen, setFollowersOpen] = useState<boolean>(false)

    return (
        <>
            {loading && <LinearLoader />}
            <Box className={classes.root}>
                <Box className={classes.innerBox}>
                    <UserProfile
                        user={props.user}
                        setFollowsOpen={setFollowsOpen}
                        setFollowersOpen={setFollowersOpen}
                        editUser={props.editUser}
                        follow={props.follow}
                        unfollow={props.unfollow}
                        logout={props.logout}
                    />
                    <Divider className={classes.divider} />
                    <UserStatics user={props.user} />
                    <Divider className={classes.staticDivider} />
                    <UserTabs user={props.user} />
                    <Divider className={classes.lastDivider} />
                </Box>
            </Box>
            <Footer />
            <FollowList
                users={props.user.follows}
                open={followsOpen}
                setOpen={setFollowsOpen}
                label='フォローしている人'
                follow={props.follow}
                unfollow={props.unfollow}
            />
            <FollowList
                users={props.user.followers}
                open={followersOpen}
                setOpen={setFollowersOpen}
                label='フォロワー'
                follow={props.follow}
                unfollow={props.unfollow}
            />
            <UserForm
                user={props.user}
                open={props.userFormOpen}
                setOpen={props.setUserFormOpen}
                userContents={props.userContents}
                setUserContents={props.setUserContents}
                image_name={props.image_name}
                setImage_name={props.setImage_name}
                updateUser={props.updateUser}
            />
        </>
    )
}