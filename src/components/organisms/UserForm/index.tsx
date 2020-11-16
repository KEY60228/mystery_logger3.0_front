import React, { FC, useState, forwardRef, ReactElement, Ref } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
    Dialog,
    Grid,
    Card,
    TextField,
    CardMedia,
    FormControl,
    Slide,
    Input,
    InputLabel,
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { UserDetail } from '../../../@types'
import { UserFormHeader } from './UserFormHeader'

interface Props {
    user: UserDetail
    update: (id: number) => void
    open: boolean
    setOpen: (value: boolean) => void
    name: string
    setName: (value: string) => void
    accountId: string
    setAccountId: (value: string) => void
    profile: string
    setProfile: (value: string) => void
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
        media: {
            height: '72px',
            width: '72px',
            border: '1px solid grey',
            borderRadius: '50%',
            margin: '8px',
            backgroundSize: 'contain',
        },
        form: {
            width: '300px',
            margin: '12px auto',
        },
    }),
)

const Transition = forwardRef(
    (
        props: TransitionProps & { children?: ReactElement },
        ref: Ref<unknown>,
    ) => {
        return <Slide direction="up" ref={ref} {...props} />
    },
)

export const UserForm: FC<Props> = ({
    user,
    update,
    open,
    setOpen,
    name,
    setName,
    accountId,
    setAccountId,
    profile,
    setProfile,
    className,
}) => {
    const classes = useStyles(className)

    const [preview, setPreview] = useState<any>(null)

    const onFileChange = (ev: any) => {
        // 何も選択されていない場合
        if (ev.target.files.length === 0) {
            setPreview('')
            return false
        }
        
        // ファイルが画像でない場合
        if (! ev.target.files[0].type.match('image.*')) {
            setPreview('')
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
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
        >
            <UserFormHeader
                user={user}
                setOpen={setOpen}
                update={update}
            />
            <Card className={classes.root}>
                <Grid container direction='column' alignItems='center'>
                    { preview &&
                        <CardMedia image={preview} className={classes.media} />
                    }
                    { !preview &&
                        <CardMedia image={`/user_img/${user.image_name}`} className={classes.media} />
                    }
                    <FormControl className={classes.form}>
                        <Input type='file' onChange={onFileChange} />
                    </FormControl>
                    <FormControl className={classes.form}>
                        <InputLabel htmlFor='Name'>Name</InputLabel>
                        <Input id='Name' value={name} onChange={(ev) => setName(ev.target.value)} />
                    </FormControl>
                    <FormControl className={classes.form}>
                        <InputLabel htmlFor='AccountId'>Account ID</InputLabel>
                        <Input id='AccountId' value={accountId} onChange={(ev) => setAccountId(ev.target.value)} />
                    </FormControl>
                    <FormControl className={classes.form}>
                        <TextField
                            multiline
                            onChange={(ev) => setProfile(ev.target.value)}
                            value={profile}
                            fullWidth
                            variant="outlined"
                            rows={12}
                            placeholder="Profile"
                            size="small"
                        />
                    </FormControl>
                </Grid>
            </Card>
        </Dialog>
    )
}
