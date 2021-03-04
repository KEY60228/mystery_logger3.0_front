import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button, Card, Grid, Input } from '@material-ui/core'

import { SelectForm } from '../../../_reusable/SelectForm'

interface Props {
    organizers: { id: number; name: string }[]
    venues: { id: number; name: string }[]
    categories: { id: number; name: string }[]
    search: () => void
    keywords: string
    setKeywords: (value: string) => void
    category: number
    setCategory: (value: number) => void
    organizer: number
    setOrganizer: (value: number) => void
    venue: number
    setVenue: (value: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '8px',
        },
        form: {
            width: '200px',
            margin: '8px',
        },
        button: {
            margin: '8px',
        },
    }),
)

export const SearchBox: FC<Props> = props => {
    const classes = useStyles()

    const onClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault()
        props.search()
    }

    return (
        <>
            <Card className={classes.root}>
                <form>
                    <Grid container direction="column" alignItems="center">
                        <Input
                            placeholder="Keywords"
                            value={props.keywords}
                            onChange={ev => props.setKeywords(ev.target.value)}
                            className={classes.form}
                        />
                        <SelectForm
                            value={props.organizer}
                            setValue={props.setOrganizer}
                            choices={props.organizers}
                            className={{ width: '200px', margin: '8px' }}
                        />
                        <SelectForm
                            value={props.venue}
                            setValue={props.setVenue}
                            choices={props.venues}
                            className={{ width: '200px', margin: '8px' }}
                        />
                        <SelectForm
                            value={props.category}
                            setValue={props.setCategory}
                            choices={props.categories}
                            className={{ width: '200px', margin: '8px' }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={onClick}
                            className={classes.button}
                        >
                            検索
                        </Button>
                    </Grid>
                </form>
            </Card>
        </>
    )
}
