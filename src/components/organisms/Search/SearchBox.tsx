import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button, Card, Grid, Input } from '@material-ui/core'

import { SelectForm } from '../../molecules/SelectForm'

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

export const SearchBox: FC<Props> = ({
    organizers,
    venues,
    categories,
    search,
    keywords,
    setKeywords,
    category,
    setCategory,
    organizer,
    setOrganizer,
    venue,
    setVenue,
}) => {
    const classes = useStyles()

    return (
        <>
            <Card className={classes.root}>
                <Grid container direction="column" alignItems="center">
                    <Input
                        placeholder="Keywords"
                        value={keywords}
                        onChange={ev => setKeywords(ev.target.value)}
                        className={classes.form}
                    />
                    <SelectForm
                        value={organizer}
                        setValue={setOrganizer}
                        choices={organizers}
                        className={{ width: '200px', margin: '8px' }}
                    />
                    <SelectForm
                        value={venue}
                        setValue={setVenue}
                        choices={venues}
                        className={{ width: '200px', margin: '8px' }}
                    />
                    <SelectForm
                        value={category}
                        setValue={setCategory}
                        choices={categories}
                        className={{ width: '200px', margin: '8px' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={search}
                        className={classes.button}
                    >
                        検索
                    </Button>
                </Grid>
            </Card>
        </>
    )
}
