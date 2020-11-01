import React, { FC, forwardRef, ReactElement, Ref } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Dialog, Grid, Card, Checkbox, Box, TextField, Typography, CardMedia, FormControl, Slide } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions';

import { Product } from '../../@types'
import { Calender } from '../atoms/Calender'
import { SlideRatings } from '../molecules/SlideRatings'
import { ReviewHeader } from '../molecules/ReviewHeader'
import { ResultForm } from '../molecules/ResultForm'

interface Props {
    open: boolean
    setOpen: (value: boolean) => void
    rating: number
    setRating: (value: number) => void
    result: number
    setResult: (value: number) => void
    joined_at: string|null
    setJoined_at: (value: string|null) => void
    contents: string|null
    setContents: (value: string|null) => void
    product: Product
    post?: () => void
    edit: () => void
    isEdit: boolean
    className?: ClassProps
}

interface ClassProps {
    width?: string
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {

        },
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
        }
    })
)

const Transition = forwardRef((
    props: TransitionProps & { children?: ReactElement },
    ref: Ref<unknown>,
) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ReviewForm: FC<Props> = ({
    open, setOpen, rating, setRating, result, setResult, joined_at, setJoined_at, contents, setContents, post, edit, isEdit, product, className
}) => {
    const classes = useStyles(className)

    return (
        <Dialog fullScreen open={open} onClose={() => setOpen(false)} TransitionComponent={Transition}>
            <ReviewHeader setOpen={setOpen} post={post} edit={edit} isEdit={isEdit} product={product} />
            <Card className={classes.card}>
                <Grid container justify='center' wrap='nowrap'>
                    <CardMedia
                        image={`/product_img/${product.image_name}`}
                        className={classes.img}
                    />
                    <Grid container direction='column' justify='center' alignItems='center'>
                        <SlideRatings
                            rating={rating}
                            setRating={setRating}
                            className={{marginLeft: '20px', fontSize: '16px'}}
                        />
                        <FormControl>
                            <ResultForm result={result} setResult={setResult} className={{width: '180px'}} />
                            <Calender
                                date={joined_at}
                                setDate={setJoined_at}
                                className={{width: '180px'}}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Box className={classes.box}>
                    <Grid container alignItems='center' wrap='nowrap'>
                        <Checkbox />
                        <Typography className={classes.alert}>ネタバレが含まれる場合"必ず"チェックしてください</Typography>
                    </Grid>
                    <TextField
                        multiline
                        onChange={(ev) => setContents(ev.currentTarget.value)}
                        value={contents}
                        fullWidth
                        variant="outlined"
                        rows={12}
                        placeholder='レビューを書かなくても投稿できます'
                        size='small'
                    />
                </Box>
            </Card>
        </Dialog>
    )
}
