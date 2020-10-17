import React, { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Card, Box, Grid, Tabs, Tab, Typography } from '@material-ui/core'

import { UserDetail, ReviewDetail } from '../@types'
import { ListedProducts } from './ListedProducts'
import { ReviewCard } from './ReviewCard'

interface Props {
  user: UserDetail
  className?: ClassProps
}

interface ClassProps {
  width?: string
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '8px'
    }
  })
)

const TabPanel: FC<TabPanelProps> = ({
  children, index, value
}) => {
  return (
    <div hidden={value !== index}>
      { value === index &&
        <Box p={2}>
          {children}
        </Box>
      }
    </div>
  )
}

export const UserTabs: FC<Props> = ({
  user, className
}) => {
  const classes = useStyles(className)
  const [value, setValue] = useState<number>(0)

  return (
    <Card className={classes.root}>
      <Grid container justify='center' alignItems='center'>
        <Tabs value={value} onChange={(ev, newValue) => setValue(newValue)}>
          <Tab label={`行った公演 ${user.reviews_count}`} />
          <Tab label={`行きたい公演 ${user.wannaProducts_count}`} />
          <Tab label={`LIKEした投稿 ${user.likeReviews_count}`} />
        </Tabs>
      </Grid>
      <TabPanel value={value} index={0}>
        { user.joinedProducts &&
          <ListedProducts products={user.joinedProducts} />
        }
        { !user.joinedProducts &&
          <Typography>まだ行った公演はありません</Typography>
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        { user.wannaProducts &&
          <ListedProducts products={user.wannaProducts} />
        }
        { !user.wannaProducts &&
          <Typography>まだ行きたい公演はありません</Typography>
        }
      </TabPanel>
      <TabPanel value={value} index={2}>
        { user.likeReviews &&
          <Box>
            { user.likeReviews.map((likeReview: ReviewDetail) => (
              <ReviewCard 
                key={likeReview.id}
                review={likeReview}
                reviewerProfile
                cardActionArea
                productTitle
                productCard
                
              />
            ))}
          </Box>
        }
        { !user.likeReviews &&
          <Typography>まだLIKEした投稿はありません</Typography>
        }
      </TabPanel>
    </Card>
  )
}

