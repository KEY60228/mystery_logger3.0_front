import React, { FC, useState } from 'react'
import { useHistory } from 'react-router'
import queryString from 'query-string'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { AppBar, Box, Button, Dialog, Divider, Grid, IconButton, Slide, Toolbar } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import CloseIcon from '@material-ui/icons/Close'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    organizers: OrganizerProp[]|null
    venues: VenueProp[][]|null
    organizer: string
    setOrganizer: React.Dispatch<React.SetStateAction<string>>
    venue: string
    setVenue: React.Dispatch<React.SetStateAction<string>>
    pref: string
    setPref: React.Dispatch<React.SetStateAction<string>>
    category: string
    setCategory: React.Dispatch<React.SetStateAction<string>>
    search: string
}

// 後ほどリファクタ対象か
interface OrganizerProp {
    id: number
    service_name: string
    company_name: string
}
interface VenueProp {
    id: number
    name: string
    addr_pref_id: number
    addr_prefecture: string
    service_name: string
}

const useStyles = makeStyles(theme =>
    createStyles({
        root: {

        },
        fake: {
            height: '48px',
            width: '48px',
        },
        title: {
            color: theme.palette.primary.main,
            lineHeight: '24px',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        label: {
            margin: '16px',
            lineHeight: '16px',
            fontSize: '14px',
        },
        selectedLabel: {
            lineHeight: '16px',
            fontSize: '14px',
            color: '#C0C0C0',
        },
        nextIcon: {
            margin: '0 16px',
        },
        searchButton: {
            display: 'block',
            margin: '16px auto',
            width: '280px',
            height: '40px',
        },
        clearButton: {
            lineHeight: '16px',
            fontSize: '14px',
            color: '#C0C0C0',
            textAlign: 'center',
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

export const FilterDialog: FC<Props> = props => {
    const classes = useStyles()
    const history = useHistory()
    const query = queryString.parse(props.search)

    const [organizerOpen, setOrganizerOpen] = useState<boolean>(false)
    const [venueOpen, setVenueOpen] = useState<boolean>(false)
    const [categoryOpen, setCategoryOpen] = useState<boolean>(false)

    const [venuePrefOpen, setVenuePrefOpen] = useState<number|false>(false)

    const clearConditions = () => {
        props.setOrganizer('')
        props.setVenue('')
        props.setPref('')
        props.setCategory('')
    }

    const closeDialog = () => {
        props.setOpen(false)
        setOrganizerOpen(false)
        setVenueOpen(false)
        setCategoryOpen(false)
        if (query.organizer && !Array.isArray(query.organizer)) {
            props.setOrganizer(query.organizer)
        } else {
            props.setOrganizer('')
        }
        if (query.venue && !Array.isArray(query.venue)) {
            props.setVenue(query.venue)
        } else {
            props.setVenue('')
        }
        if (query.pref && !Array.isArray(query.pref)) {
            props.setPref(query.pref)
        } else {
            props.setPref('')
        }
        if (query.category && !Array.isArray(query.category)) {
            props.setCategory(query.category)
        } else {
            props.setCategory('')
        }
    }

    const backToMenu = () => {
        setOrganizerOpen(false)
        setVenueOpen(false)
        setCategoryOpen(false)
    }

    const filter = () => {
        let url = '/search?'
        if (props.organizer) url += `organizer=${props.organizer}&`
        if (props.venue) url += `venue=${props.venue}&`
        if (props.pref) url += `pref=${props.pref}&`
        if (props.category) url += `category=${props.category}&`
        history.push(url)
        closeDialog()
        clearConditions()
    }

    const selectOrganizer = (organizer: OrganizerProp) => {
        // setSelectedOrganizer(organizer)
        props.setOrganizer(String(organizer.id))
        setOrganizerOpen(false)
    }

    const selectPref = (pref: {id: number, name: string}) => {
        // setSelectedVenue(null)
        // setSelectedPref(pref)
        props.setVenue('')
        props.setPref(String(pref.id))
        setVenuePrefOpen(false)
        setVenueOpen(false)
    }

    const selectVenue = (venue: VenueProp) => {
        // setSelectedPref(null)
        // setSelectedVenue(venue)
        props.setPref('')
        props.setVenue(String(venue.id))
        setVenuePrefOpen(false)
        setVenueOpen(false)
    }

    const selectCategory = (category: {id: number, name: string}) => {
        // setSelectedCategory(category)
        props.setCategory(String(category.id))
        setCategoryOpen(false)
    }
    

    // 酷いけど…とりあえず…
    const categoryList = [
        {id: 1, name: 'ルームタイプ'},
        {id: 2, name: 'ホールタイプ'},
        {id: 3, name: 'キット配布タイプ'},
        {id: 4, name: 'オンライン'},
        {id: 5, name: 'その他'},
    ]

    return (
        <Dialog
            open={props.open}
            onClose={closeDialog}
            fullScreen
            TransitionComponent={Transition}
        >
            <AppBar color='secondary' position='static'>
                <Toolbar>
                    <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                        { (organizerOpen || venueOpen || categoryOpen) &&
                            <IconButton onClick={backToMenu}>
                                <ArrowBackIcon color='primary' />
                            </IconButton>
                        }
                        { (!organizerOpen && !venueOpen && !categoryOpen) &&
                            <div className={classes.fake} />
                        }
                        <p className={classes.title}>絞り込み</p>
                        <IconButton onClick={closeDialog}>
                            <CloseIcon color='primary' />
                        </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>
            {(!organizerOpen && !venueOpen && !categoryOpen) &&
                <Box>
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => setOrganizerOpen(true)}
                        >
                            <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                                <p className={classes.label}>主催団体</p>
                                { (props.organizers && props.organizer) &&
                                    <span className={classes.selectedLabel}>{props.organizers.find(organizer => String(organizer.id) === props.organizer)?.service_name}</span>
                                }
                            </Grid>
                            <NavigateNextIcon className={classes.nextIcon} />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => setVenueOpen(true)}
                        >
                            <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                                <p className={classes.label}>開催場所</p>
                                { (props.venues && props.pref) &&
                                    <span className={classes.selectedLabel}>{props.venues.find(pref => String(pref[0].addr_pref_id) === props.pref)![0].addr_prefecture}</span>
                                }
                                { (props.venues && props.venue) &&
                                    <span className={classes.selectedLabel}>{props.venues.find(pref => pref.find(venue => String(venue.id) === props.venue))?.find(venue => String(venue.id) === props.venue)?.name}</span>
                                }
                            </Grid>
                            <NavigateNextIcon className={classes.nextIcon} />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => setCategoryOpen(true)}
                        >
                            <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                                <p className={classes.label}>カテゴリー</p>
                                { props.category &&
                                    <span className={classes.selectedLabel}>{categoryList.find(category => String(category.id) === props.category)?.name}</span>
                                }
                            </Grid>
                            <NavigateNextIcon className={classes.nextIcon} />
                        </Grid>
                        <Divider />
                    </Box>
                    <Button
                        color='primary'
                        variant='outlined'
                        onClick={filter}
                        className={classes.searchButton}
                    >
                        この条件で検索
                    </Button>
                    <p onClick={clearConditions} className={classes.clearButton}>条件をクリア</p>
                </Box>
            }
            {organizerOpen &&
                <Box>
                    <Divider />
                    { props.organizers && props.organizers.map(organizer => (
                        <Box key={organizer.id}>
                            <Grid
                                container
                                justify='space-between'
                                alignItems='center'
                                wrap='nowrap'
                                onClick={() => selectOrganizer(organizer)}
                            >
                                <p>
                                    {organizer.service_name}
                                    {organizer.company_name &&
                                        <span> / {organizer.company_name}</span>
                                    }
                                </p>
                                <NavigateNextIcon />
                            </Grid>
                            <Divider />
                        </Box>
                    ))}
                </Box>
            }
            {venueOpen &&
                <Box>
                    { props.venues && props.venues.map(venues => (
                        <React.Fragment key={venues[0].id}>
                            <Box
                                onClick={() => 
                                    venuePrefOpen === venues[0].addr_pref_id ? selectPref({id: venues[0].addr_pref_id, name: venues[0].addr_prefecture}) : setVenuePrefOpen(venues[0].addr_pref_id)
                                }
                            >
                                <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                                    <p>
                                        {venues[0].addr_prefecture || 'その他'}
                                    </p>
                                    {venuePrefOpen !== venues[0].addr_pref_id &&
                                        <ExpandMoreIcon />
                                    }
                                    {venuePrefOpen === venues[0].addr_pref_id &&
                                        <NavigateNextIcon />
                                    }
                                </Grid>
                                <Divider />
                            </Box>
                            {venuePrefOpen === venues[0].addr_pref_id && venues.map(venue => (
                                <Box key={venue.id} onClick={() => selectVenue(venue)}>
                                    <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
                                        <p>{venue.name}<span> By {venue.service_name}</span></p>
                                        <NavigateNextIcon />
                                    </Grid>
                                    <Divider />
                                </Box>
                            ))}
                        </React.Fragment>
                    ))}
                </Box>
            }
            {categoryOpen &&
                <>
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => selectCategory({id: 1, name: 'ルームタイプ'})}
                        >
                            <p>ルームタイプ</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => selectCategory({id: 3, name: 'ホールタイプ'})}
                        >
                            <p>ホールタイプ</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => selectCategory({id: 3, name: 'キット配布タイプ'})}
                        >
                            <p>キット配布タイプ</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => selectCategory({id: 4, name: 'オンライン'})}
                        >
                            <p>オンライン</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                    <Box>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='center'
                            wrap='nowrap'
                            onClick={() => selectCategory({id: 5, name: 'その他'})}
                        >
                            <p>その他</p>
                            <NavigateNextIcon />
                        </Grid>
                        <Divider />
                    </Box>
                </>
            }
        </Dialog>
    )
}
