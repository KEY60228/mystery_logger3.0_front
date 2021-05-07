import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Grid, Dialog, OutlinedInput, Slide, FormControl, InputLabel, FormHelperText, Toolbar, IconButton, AppBar, Button, Input, InputAdornment } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import CloseIcon from '@material-ui/icons/Close'

import { User, UserContents } from '../../../@types'
import { setMessage } from '../../../stores/error'
import { RootState, useAppDispatch } from '../../../stores'
import { LinearLoader } from '../../../handlers/Loader/LinearLoader'

interface Props {
    user: User
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    userContents: UserContents
    setUserContents: React.Dispatch<React.SetStateAction<UserContents>>
    image_name: File | null
    setImage_name: React.Dispatch<React.SetStateAction<File|null>>
    updateUser: () => void
}

const useStyles = makeStyles(theme => 
    createStyles({
        root: {

        },
        header: {
            height: '64px',
        },
        toolbar: {
            padding: '0 20px',
            height: '64px',
        },
        closeIcon: {
            width: '32px',
            height: '32px',
            padding: '0',
        },
        title: {
            lineHeight: '24px',
            fontSize: '16px',
            margin: '0 8px',
            flexGrow: 1,
            textAlign: 'center',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        updateButton: {
            fontSize: '15px',
            fontWeight: 'bold',
            minWidth: '32px',
            padding: '0',
        },
        media: {
            height: '72px',
            width: '72px',
            border: '1px solid',
            borderRadius: '50%',
            margin: '16px',
            backgroundSize: 'contain',
        },
        form: {
            width: '300px',
            height: '32px',
            margin: '0 auto 24px',
            display: 'block',
        },
        formInputRoot: {
            width: '100%',
        },
        formNameInput: {
            padding: '0.4em 0 0.4em 8px',
            '&::placeholder': {
                fontSize: '14px',
            },
        },
        formAccountIdInput: {
            padding: '0.4em 0',
            '&::placeholder': {
                fontSize: '14px',
            },
        },
        helper: {
            color: theme.palette.error.main,
            lineHeight: '16px',
            fontSize: '12px',
        },
    })
)

const Transition = React.forwardRef(
    (
        props: TransitionProps & { children?: React.ReactElement },
        ref: React.Ref<unknown>,
    ) => {
        return <Slide direction="up" ref={ref} {...props} />
    },
)

export const UserForm: FC<Props> = props => {
    const classes = useStyles()
    const dispatch = useAppDispatch()

    const loading = useSelector((state: RootState) => state.error.loading)
    const message = useSelector((state: RootState) => state.error.message)

    // ユーザー画像
    const [preview, setPreview] = useState<any>(null)
    const onFileChange = (
        ev: React.ChangeEvent<HTMLInputElement>,
    ): false | void => {
        // 何も選択されていない場合
        if (ev.target.files === null || ev.target.files.length === 0) {
            setPreview('')
            props.setImage_name(null)
            return false
        }

        // ファイルが画像でない場合
        if (ev.target.files[0].type.match('image.*') === null) {
            setPreview('')
            props.setImage_name(null)
            return false
        }

        // FileReaderクラスのインスタンスを取得
        const reader = new FileReader()

        // ファイルを読み込む
        // 読み込まれたファイルはデータURL形式で受け取る
        reader.readAsDataURL(ev.target.files[0])

        // ファイルを読み込み終わったタイミングで実行する処理
        reader.onload = e => {
            // previewに読み込み結果(データURL)を代入する
            setPreview(e.target?.result)
        }

        props.setImage_name(ev.target.files[0])
    }

    const validateName = (name: string) => {
        props.setUserContents(prev => ({...prev, name: name}))
        if (!name) {
            if (message) {
                const errors = Object.assign({}, message.errors, {
                    name: 'Nameは必須です',
                })
                dispatch(setMessage({ errors: errors }))
            } else {
                dispatch(setMessage({ errors: { name: 'Nameは必須です' } }))
            }
            return
        }
        if (message) {
            const errors = Object.assign({}, message.errors, { name: null })
            dispatch(setMessage({ errors: errors }))
        } else {
            dispatch(setMessage(null))
        }
    }

    const validateAccountId = (account_id: string) => {
        props.setUserContents(prev => ({...prev, account_id: account_id}))

        if (!account_id) {
            if (message) {
                const errors = Object.assign({}, message.errors, {
                    account_id: 'Account IDは必須です',
                })
                dispatch(setMessage({ errors: errors }))
            } else {
                dispatch(
                    setMessage({
                        errors: { account_id: 'Account IDは必須です' },
                    }),
                )
            }
            return
        }
        const regex = /^[0-9a-zA-Z]+$/
        if (!regex.test(account_id)) {
            if (message) {
                const errors = Object.assign({}, message.errors, {
                    account_id: 'Account IDは半角英数字で入力してください',
                })
                dispatch(setMessage({ errors: errors }))
            } else {
                dispatch(
                    setMessage({
                        errors: {
                            account_id:
                                'Account IDは半角英数字で入力してください',
                        },
                    }),
                )
            }
            return
        }
        if (message) {
            const errors = Object.assign({}, message.errors, {
                account_id: null,
            })
            dispatch(setMessage({errors: errors}))
        } else {
            dispatch(setMessage(null))
        }
    }

    const handleClose = () => {
        setPreview(null)
        dispatch(setMessage(null))
        props.setOpen(false)
    }

    const handleName = (ev: React.ChangeEvent<{value: string}>) => {
        ev.persist()
        validateName(ev.target.value)
    }

    const handleAccountId = (ev: React.ChangeEvent<{value: string}>) => {
        ev.persist()
        validateAccountId(ev.target.value)
    }

    const handleProfile = (ev: React.ChangeEvent<{value: string}>) => {
        ev.persist()
        props.setUserContents(prev => ({...prev, profile: ev.target.value}))
    }

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar
                color="secondary"
                position="static"
                className={classes.header}
            >
                <Toolbar className={classes.toolbar}>
                    <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                        <IconButton
                            color="primary"
                            onClick={handleClose}
                            className={classes.closeIcon}
                        >
                            <CloseIcon />
                        </IconButton>
                        <p className={classes.title}>
                            ユーザー情報編集
                        </p>
                        <Button
                            color='primary'
                            onClick={props.updateUser}
                            className={classes.updateButton}
                        >
                            投稿
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
            {loading && <LinearLoader />}
            <Box className={classes.root}>
                <Grid container direction="column" alignItems="center">
                    {preview && (
                        <img src={preview} className={classes.media} />
                    )}
                    {!preview && (
                        <img
                            src={`${process.env.IMAGES_BASEURL}${props.user.image_name}`}
                            className={classes.media}
                        />
                    )}
                    <FormControl className={classes.form}>
                        <Input
                            type="file"
                            onChange={onFileChange}
                        />
                    </FormControl>
                    <FormControl className={classes.form}>
                        <OutlinedInput
                            id="name"
                            aria-describedby={'name-helper'}
                            color='primary'
                            placeholder='ユーザー名'
                            value={props.userContents.name}
                            error={!!message?.errors?.name}
                            onChange={handleName}
                            classes={{root: classes.formInputRoot, input: classes.formNameInput}}
                        />
                        {message?.errors?.name && (
                            <FormHelperText id={'name-helper'} className={classes.helper}>
                                {message.errors.name}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl className={classes.form}>
                        <OutlinedInput
                            id="account_id"
                            aria-describedby={'account_id-helper'}
                            placeholder='アカウントID'
                            value={props.userContents.account_id}
                            error={!!message?.errors?.account_id}
                            onChange={handleAccountId}
                            startAdornment={
                                <InputAdornment position='start'>@</InputAdornment>
                            }
                            classes={{root: classes.formInputRoot, input: classes.formAccountIdInput}}
                        />
                        {message?.errors?.account_id && (
                            <FormHelperText id={'account_id-helper'} className={classes.helper}>
                                {message.errors.account_id}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl className={classes.form}>
                        <OutlinedInput
                            multiline
                            fullWidth
                            rows={12}
                            placeholder="プロフィール"
                            value={props.userContents.profile || ''}
                            onChange={handleProfile}
                        />
                    </FormControl>
                </Grid>
            </Box>
        </Dialog>
    )
}