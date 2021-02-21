import React, { FC } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Button, Divider, Drawer, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useSelector } from 'react-redux'
import { RootState } from '../stores'
import { useHistory } from 'react-router'

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            width: '240px',
            backgroundColor: theme.palette.common.black,
        },
        box: {
            margin: '16px 24px',
        },
        closeButton: {
            color: theme.palette.primary.main,
            padding: '0',
            width: '40px',
            height: '40px',
            display: 'block',
            margin: '0 0 0 auto',
        },
        topDivider: {
            backgroundColor: '#C0C0C0',
            marginTop: '16px',
        },
        registerButton: {
            width: '100%',
            margin: '24px 0 0'
        },
        registerButtonLabel: {
            margin: '0',
        },
        listItem: {
            lineHeight: '16px',
            fontSize: '13px',
            color: theme.palette.primary.main,
            textAlign: 'right',
            margin: '24px 0 0',
        },
        divider: {
            margin: '24px 0 0',
            backgroundColor: '#C0C0C0',
        },
    })
)

export const SideMenu: FC<Props> = props => {
    const classes = useStyles()
    const history = useHistory()

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const link = (url: string) => {
        props.setOpen(false)
        history.push(url)
    }

    return (
        <Drawer
            anchor='right'
            open={props.open}
            onClose={() => props.setOpen(false)}
            classes={{paper: classes.root}}
        >
            <Box className={classes.box}>
                <IconButton onClick={() => props.setOpen(false)} className={classes.closeButton}>
                    <CloseIcon fontSize='large' />
                </IconButton>
                <Divider className={classes.topDivider} />
                {currentUser &&
                    <p
                        className={classes.listItem}
                        onClick={() => link(`/users/${currentUser.account_id}`)}
                    >
                        マイページ
                    </p>
                }
                {!currentUser &&
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => link('/preregister')}
                        className={classes.registerButton}
                    >
                        <p className={classes.registerButtonLabel}>ログイン・会員登録</p>
                    </Button>
                }
                <Divider className={classes.divider} />
                <p className={classes.listItem}>キーワードから探す</p>
                <p className={classes.listItem}>ランキングから探す</p>
                <p className={classes.listItem}>主催団体から探す</p>
                <p className={classes.listItem}>開催場所から探す</p>
                <p className={classes.listItem}>カテゴリーから探す</p>
                <Divider className={classes.divider} />
                <p className={classes.listItem}>新着レビューを見る</p>
                <p className={classes.listItem}>人気のレビューを見る</p>
                <p className={classes.listItem}>人気のユーザーを見る</p>
                <Divider className={classes.divider} />
                <p className={classes.listItem}>運営団体</p>
                <p className={classes.listItem}>お問い合わせ</p>
            </Box>
        </Drawer>
    )
}