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

interface Props {
    open: boolean
    setOpen: (value: boolean) => void
    rating: number
    setRating: (value: number) => void
    result: number
    setResult: (value: number) => void
    joined_at: string | null
    setJoined_at: (value: string | null) => void
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

export const ReviewForm: FC<Props> = ({
    open,
    setOpen,
    rating,
    setRating,
    result,
    setResult,
    joined_at,
    setJoined_at,
    contents,
    setContents,
    post,
    update,
    isNew,
    product,
    className,
}) => {
    const classes = useStyles(className)

    const resultSelect: {
        id: number
        name: string
    }[] = [
        { id: 0, name: '脱出結果を選択'},
        { id: 1, name: '成功！！' },
        { id: 2, name: '失敗...' }
    ]

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
        >
            <ReviewHeader
                setOpen={setOpen}
                post={post}
                update={update}
                isNew={isNew}
                product={product}
            />
            <Card className={classes.card}>
                <Grid container justify="center" wrap="nowrap">
                    <CardMedia
                        image={`/product_img/${product.image_name}`}
                        className={classes.img}
                    />
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <SlideRatings
                            rating={rating}
                            setRating={setRating}
                            className={{ marginLeft: '20px', fontSize: '16px' }}
                        />
                        <FormControl>
                            <SelectForm
                                value={result}
                                setValue={setResult}
                                choices={resultSelect}
                                className={{ width: '180px', margin: '0px'}}
                            />
                            <Calender
                                date={joined_at}
                                setDate={setJoined_at}
                                className={{ width: '180px' }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Box className={classes.box}>
                    <Grid container alignItems="center" wrap="nowrap">
                        <Checkbox />
                        <Typography className={classes.alert}>
                            ネタバレが含まれる場合"必ず"チェックしてください
                        </Typography>
                    </Grid>
                    <TextField
                        multiline
                        onChange={ev => setContents(ev.currentTarget.value)}
                        value={contents}
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
