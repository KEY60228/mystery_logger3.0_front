import React, { FC, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Divider } from '@material-ui/core'

import { UserContents, UserDetail } from '../../@types'
import { UserProfile } from './components/UserProfile'
import { UserStatics } from './components/UserStatics'
import { UserTabs } from './components/UserTabs'
import { Footer } from '../../reusable/Footer'
import { FollowList } from './components/FollowList'
import { UserForm } from './components/UserForm'


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
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '16px 20px 24px',
        },
        divider: {
            marginTop: '16px',
        },
        staticDivider: {
            margin: '24px 0',
        },
        lastDivider: {
            margin: '40px 0',
        },
    })
)

export const UserDetailTemplate: FC<Props> = props => {
    const classes = useStyles()

    const [followsOpen, setFollowsOpen] = useState<boolean>(false)
    const [followersOpen, setFollowersOpen] = useState<boolean>(false)

    return (
        <>
            <Box className={classes.root}>
                <UserProfile
                    user={props.user}
                    setFollowsOpen={setFollowsOpen}
                    setFollowersOpen={setFollowersOpen}
                    editUser={props.editUser}
                />
                <Divider className={classes.divider} />
                <UserStatics user={props.user} />
                <Divider className={classes.staticDivider} />
                <UserTabs user={props.user} />
                <Divider className={classes.lastDivider} />
            </Box>
            <Footer />
            <FollowList
                users={props.user.follows}
                open={followsOpen}
                setOpen={setFollowsOpen}
                label='フォローしている人'
                follow={() => console.log()}
                unfollow={() => console.log()}
            />
            <FollowList
                users={props.user.followers}
                open={followersOpen}
                setOpen={setFollowersOpen}
                label='フォロワー'
                follow={() => console.log()}
                unfollow={() => console.log()}
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