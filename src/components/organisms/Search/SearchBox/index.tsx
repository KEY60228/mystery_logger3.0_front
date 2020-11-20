import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button, Card, Grid, Input } from '@material-ui/core'

import { VenueForm } from './VenueForm'
import { CategoryForm } from './CategoryForm'
import { OrganizerForm } from './OrganizerForm'

interface Props {
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
        }
    })
)

export const SearchBox: FC<Props> = ({
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
                    <Input placeholder="Keywords" value={keywords} onChange={ev => setKeywords(ev.target.value)} className={classes.form} />
                    <OrganizerForm organizer={organizer} setOrganizer={setOrganizer} />
                    <VenueForm venue={venue} setVenue={setVenue} />
                    <CategoryForm category={category} setCategory={setCategory} />
                    <Button variant="contained" color="primary" onClick={search} className={classes.button}>検索</Button>
                </Grid>
            </Card>
        </>
    )
}