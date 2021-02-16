import React, { FC, forwardRef, ReactElement, Ref } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Slide, Dialog, AppBar, Toolbar, Grid, IconButton, Button, Box, Slider, Select, MenuItem, Checkbox, OutlinedInput } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { Rating } from '@material-ui/lab'
import { TransitionProps } from '@material-ui/core/transitions'
import CloseIcon from '@material-ui/icons/Close'

import { Product, ReviewContents } from '../@types'
import { ProductImage } from './ProductImage'

interface Props {
    product: Product
    formOpen: boolean
    setFormOpen: (value: boolean) => void
    reviewContents: ReviewContents
    setReviewContents: React.Dispatch<React.SetStateAction<ReviewContents>>  
    postReview: () => void
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
        closeButton: {
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
        postButton: {
            fontSize: '15px',
            fontWeight: 'bold',
            minWidth: '32px',
            padding: '0',
        },
        reviewBox: {
            margin: '32px 20px',
        },
        rightBox: {
            flexGrow: 1,
        },
        rating: {
            marginBottom: '10px',
        },
        ratingLabel: {
            margin: '0 4px',
            lineHeight: '24px',
            fontSize: '14px',
        },
        slider: {
            width: '136px',
            margin: '0 auto 30px',
            display: 'block',
            padding: '0',
        },
        resultSelect: {
            margin: '0 auto',
            width: '160px',
            display: 'block',
            padding: '0',
        },
        resultSelectSelect: {
            paddingRight: '0 !important',
        },
        calender: {
            width: '160px',
            margin: '16px auto 0',
            display: 'block'
        },
        spoilCheck: {
            margin: '24px 0',
        },
        spoilCheckBox: {
            width: '24px',
            height: '24px',
        },
        spoilCheckLabel: {
            color: theme.palette.error.main,
            lineHeight: '24px',
            fontSize: '13px',
            fontWeight: 'bold',
            margin: '0',
        },
    })
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
    const classes = useStyles()

    const contentsChange = (ev: React.ChangeEvent<{value: string}>) => {
        ev.persist()
        props.setReviewContents(prev => ({...prev, contents: ev.target.value}))
    }

    return (
        <Dialog
            fullScreen
            open={props.formOpen}
            onClose={() => props.setFormOpen(false)}
            TransitionComponent={Transition}
        >
            <AppBar color='secondary' position='static' className={classes.header}>
                <Toolbar className={classes.toolbar}>
                    <Grid
                        container
                        alignItems='center'
                        wrap='nowrap'
                    >
                        <IconButton
                            color='primary'
                            onClick={() => props.setFormOpen(false)}
                            className={classes.closeButton}
                        >
                            <CloseIcon />
                        </IconButton>
                        <p className={classes.title}>
                            {props.product.name}
                        </p>
                        <Button color='primary' onClick={props.postReview} className={classes.postButton}>投稿</Button>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box className={classes.reviewBox}>
                <Grid container wrap='nowrap'>
                    <ProductImage
                        product={props.product}
                        transition={false}
                        className={{ height: '168px', width: '120px', margin: '0 8px' }}
                    />
                    <Box className={classes.rightBox}>
                        <Grid container justify='center' alignItems='center' className={classes.rating}>
                            <Rating
                                value={
                                    props.reviewContents.rating === 0 || props.reviewContents.rating === null ? 0 : parseFloat(props.reviewContents.rating.toFixed(1))
                                }
                                precision={0.1}
                                readOnly
                                size='large'
                            />
                            <p className={classes.ratingLabel}>{props.reviewContents.rating === 0 || props.reviewContents.rating === null ? '-' : props.reviewContents.rating.toFixed(1)}</p>
                        </Grid> 
                        <Slider
                            value={props.reviewContents.rating}
                            onChange={(ev, newValue: number) => props.setReviewContents((prev: ReviewContents) => ({...prev, rating: newValue}))}
                            max={5}
                            step={0.5}
                            className={classes.slider}
                        />
                        <Select
                            value={props.reviewContents.result}
                            onChange={(ev: React.ChangeEvent<{value: unknown}>) => props.setReviewContents((prev: ReviewContents) => ({...prev, result: ev.target.value as number}))}
                            className={classes.resultSelect}
                            classes={{select: classes.resultSelectSelect}}
                        >
                            <MenuItem value={0}>脱出結果を選択</MenuItem>
                            <MenuItem value={1}>成功！！</MenuItem>
                            <MenuItem value={2}>失敗...</MenuItem>
                        </Select>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                format="yyyy/MM/dd"
                                margin="normal"
                                id="joined-date"
                                label="参加日"
                                value={props.reviewContents.joined_at}
                                maxDate={Date()}
                                onChange={(newDate: Date | null) => props.setReviewContents((prev: ReviewContents) => ({...prev, joined_at: newDate}))}
                                className={classes.calender}
                            />
                        </MuiPickersUtilsProvider>
                    </Box>
                </Grid>
                <Grid container alignItems='center' wrap='nowrap' className={classes.spoilCheck}>
                    <Checkbox
                        color='primary'
                        checked={props.reviewContents.spoil}
                        onChange={() => props.setReviewContents((prev: ReviewContents) => ({...prev, spoil: !props.reviewContents.spoil}))}
                        className={classes.spoilCheckBox}
                    />
                    <p
                        className={classes.spoilCheckLabel}
                        onClick={() => props.setReviewContents((prev: ReviewContents) => ({...prev, spoil: !props.reviewContents.spoil}))}
                    >
                        ネタバレが含まれる場合"必ず"チェックしてください
                    </p>
                </Grid>
                <OutlinedInput
                    multiline
                    fullWidth
                    rows={12}
                    placeholder='レビューを書かなくても投稿できます'
                    value={props.reviewContents.contents || ''}
                    onChange={contentsChange}
                />
            </Box>
        </Dialog>
    )
}
