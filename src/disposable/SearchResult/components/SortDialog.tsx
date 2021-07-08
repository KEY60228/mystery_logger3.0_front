import React, { FC } from "react"
import { useHistory } from "react-router-dom"
import queryString from 'query-string'
import { makeStyles, createStyles } from "@material-ui/core/styles"
import { Drawer, Box, Grid, IconButton, Divider } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import CheckIcon from "@material-ui/icons/Check"

interface Props {
    search: string
    query: queryString.ParsedQuery<string>
    sortOpen: boolean
    setSortOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const useStyles = makeStyles(theme => 
    createStyles({
        drawer: {
            backgroundColor: theme.palette.common.black,
        },
        drawerLabel: {
            color: theme.palette.primary.main,
            marginLeft: '16px',
            lineHeight: '24px',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        tran: {
            '&:hover': {
                cursor: 'pointer',
            },
        },
        closeButton: {
            float: 'right',
        },
        selectLabel: {
            margin: '16px 0 16px 40px',
            lineHeight: '24px',
            fontSize: '14px',
        },
        selected: {
            margin: '16px 0',
            color: theme.palette.primary.main,
            lineHeight: '24px',
            fontSize: '14px',
        },
        check: {
            margin: '16px 8px',
        },
    })
)

export const SortDialog: FC<Props> = props => {
    const classes = useStyles()
    const history = useHistory()

    const sort = (ranking: number) => {
        let param = props.search
        if (props.query.page) {
            param = props.search.replace(`&page=${props.query.page}`, '')
        }
        if (props.query.ranking) {
            param = param.replace(`ranking=${props.query.ranking}`, `ranking=${ranking}`)
            props.setSortOpen(false)
            history.push(`/search${param}`)
        } else if (props.search.indexOf('?') !== -1) {
            props.setSortOpen(false)
            history.push(`/search${props.search}&ranking=${ranking}`)
        } else {
            props.setSortOpen(false)
            history.push(`/search?ranking=${ranking}`)
        }
    }

    return (
        <Drawer
            anchor='bottom'
            open={props.sortOpen}
            onClose={() => props.setSortOpen(false)}
        >
            <Box className={classes.drawer}>
                <Grid container justify='space-between' wrap='nowrap'>
                    <p className={classes.drawerLabel}>並び替え</p>
                    <IconButton onClick={() => props.setSortOpen(false)} className={classes.closeButton}>
                        <CloseIcon color='primary' />
                    </IconButton>
                </Grid>
            </Box>
            <Grid container wrap='nowrap' onClick={() => sort(1)} className={classes.tran}>
                {props.query.ranking === '1' &&
                    <>
                        <CheckIcon color='primary' className={classes.check} />
                        <p className={classes.selected}>評価が高い順</p>
                    </>
                }
                {props.query.ranking !== '1' &&
                    <p className={classes.selectLabel}>評価が高い順</p>
                }
            </Grid>
            <Divider />
            <Grid container wrap='nowrap' onClick={() => sort(2)} className={classes.tran}>
                {props.query.ranking === '2' &&
                    <>
                        <CheckIcon color='primary' className={classes.check} />
                        <p className={classes.selected}>投稿数が多い順</p>
                    </>
                }
                {props.query.ranking !== '2' &&
                    <p className={classes.selectLabel}>投稿数が多い順</p>
                }
            </Grid>
            <Divider />
            <Grid container wrap='nowrap' onClick={() => sort(3)} className={classes.tran}>
                {props.query.ranking === '3' &&
                    <>
                        <CheckIcon color='primary' className={classes.check} />
                        <p className={classes.selected}>成功率が低い順</p>
                    </>
                }
                {props.query.ranking !== '3' &&
                    <p className={classes.selectLabel}>成功率が低い順</p>
                }
            </Grid>
            <Divider />
            <Grid container wrap='nowrap' onClick={() => sort(4)} className={classes.tran}>
                {props.query.ranking === '4' &&
                    <>
                        <CheckIcon color='primary' className={classes.check} />
                        <p className={classes.selected}>成功率が高い順</p>
                    </>
                }
                {props.query.ranking !== '4' &&
                    <p className={classes.selectLabel}>成功率が高い順</p>
                }
            </Grid>
            <Divider />
            <Grid container wrap='nowrap' onClick={() => sort(5)} className={classes.tran}>
                {props.query.ranking === '5' &&
                    <>
                        <CheckIcon color='primary' className={classes.check} />
                        <p className={classes.selected}>Likeの多い順</p>
                    </>
                }
                {props.query.ranking !== '5' &&
                    <p className={classes.selectLabel}>Likeの多い順</p>
                }
            </Grid>
        </Drawer>
    )
}


