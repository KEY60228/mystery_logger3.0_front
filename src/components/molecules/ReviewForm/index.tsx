import React, { FC, forwardRef, ReactElement, Ref } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
    Dialog,
    Grid,
    Card,
    Checkbox,
    Box,
    TextField,
    Typography,
    CardMedia,
    FormControl,
    Slide,
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'

import { Product } from '../../../@types'
import { Calender } from './Calender'
import { SlideRatings } from './SlideRatings'
import { ReviewHeader } from './ReviewHeader'
import { SelectForm } from '../SelectForm'
import { RootState } from '../../../stores'
import { useSelector } from 'react-redux'
import { LinearLoader } from '../../../Loader/LinearLoader'

interface Props {
    open: boolean
    setOpen: (value: boolean) => void
    rating: number
    setRating: (value: number) => void
    result: number
    setResult: (value: number) => void
    joined_at: Date | null
    setJoined_at: (value: Date | null) => void
    spoil: boolean
    setSpoil: (value: boolean) => void
    contents: string | null
    setContents: (value: string | null) => void
    product: Product
    post?: () => void
    update: () => void
    isNew: boolean
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        card: {
            margin: '8px',
        },
        img: {
            height: '180px',
            minWidth: '120px',
            backgroundSize: 'contain',
            margin: '12px',
        },
        box: {
            width: '100%',
            padding: '8px',
        },
        alert: {
            fontSize: '12px',
            color: 'red',
            fontWeight: 'bold',
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

export const ReviewForm: FC<Props> = props => {
    const classes = useStyles(props.className)
    const loading = useSelector((state: RootState) => state.error.loading)

    const resultSelect: {
        id: number
        name: string
    }[] = [
        { id: 0, name: '脱出結果を選択' },
        { id: 1, name: '成功！！' },
        { id: 2, name: '失敗...' },
    ]

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={() => props.setOpen(false)}
            TransitionComponent={Transition}
        >
            <ReviewHeader
                setOpen={props.setOpen}
                post={props.post}
                update={props.update}
                isNew={props.isNew}
                product={props.product}
            />
            { loading &&
                <LinearLoader />
            }
            <Card className={classes.card}>
                <Grid container justify="center" wrap="nowrap">
                    <CardMedia
                        image={`${process.env.API_BASEURL}${props.product.image_name}`}
                        className={classes.img}
                    />
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <SlideRatings
                            rating={props.rating}
                            setRating={props.setRating}
                            className={{ marginLeft: '20px', fontSize: '16px' }}
                        />
                        <FormControl>
                            <SelectForm
                                value={props.result}
                                setValue={props.setResult}
                                choices={resultSelect}
                                className={{ width: '180px', margin: '0px' }}
                            />
                            <Calender
                                date={props.joined_at}
                                setDate={props.setJoined_at}
                                className={{ width: '180px' }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Box className={classes.box}>
                    <Grid container alignItems="center" wrap="nowrap">
                        <Checkbox
                            checked={props.spoil}
                            onChange={() => props.setSpoil(!props.spoil)}
                        />
                        <Typography className={classes.alert}>
                            ネタバレが含まれる場合"必ず"チェックしてください
                        </Typography>
                    </Grid>
                    <TextField
                        multiline
                        onChange={ev =>
                            props.setContents(ev.currentTarget.value)
                        }
                        value={props.contents || ''}
                        fullWidth
                        variant="outlined"
                        rows={12}
                        placeholder="レビューを書かなくても投稿できます"
                        size="small"
                    />
                </Box>
            </Card>
        </Dialog>
    )
}
