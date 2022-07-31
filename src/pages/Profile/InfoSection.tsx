import * as React from 'react'
import {
	Grid,
	Tooltip,
	Avatar,
	Typography,
	Link,
	Collapse,
	Accordion,
	AccordionSummary,
	AccordionDetails
} from '@mui/material'
import {
	AccountBoxOutlined,
	InfoOutlined,
	PersonOutlined,
	LocationOnOutlined,
	PaidOutlined,
	Twitter,
	GitHub,
	PlaylistAdd,
	ExpandMore
} from '@mui/icons-material'

import { UserProfile } from '../../types'

import analyzeReposLanguages from '../../utils/analyzeReposLanguages'

import { snackbarContext } from '../../App'

type InfoSectionProps = {
	user: UserProfile
	isAuth: boolean
}

const InfoSection: React.FC<InfoSectionProps> = ({ user, isAuth }) => {
	const snackbar = React.useContext(snackbarContext)
	
	const avatarSize = React.useMemo(() => ({
		width: {
			lg: '128px',
			md: '128px',
			sm: '96px',
			xs: '64px'
		}, height: {
			lg: '128px',
			md: '128px',
			sm: '96px',
			xs: '64px'
		}
	}), [])
	
	const [langListExpanded, setLangListExpanded] = React.useState<boolean>(false)
	const [langList, setLangList] = React.useState<[string, number][]>([])
	
	const getLangInfo = React.useCallback(async (): Promise<void> => {
		const langMap = await analyzeReposLanguages(user.repos)
		snackbar.showThenHide(`Loaded in ${ langMap.elapsedMs } ms`, 1000)
		
		const sortedArr: [string, number][] = []
		langMap.parsed.forEach((value, key) => sortedArr.push([key, value]))
		sortedArr.sort((a, b) => b[1] - a[1])
		
		setLangList(sortedArr)
	}, [])
	
	const handleAccordionExpansion = React.useCallback(async (): Promise<void> => {
		if (!langList.length)
			await getLangInfo()
		
		setLangListExpanded(prev => !prev)
	}, [])
	
	const langElements: JSX.Element[] = langList.map(([language, value]) => (
			<AccordionDetails key={ language }>
				{ language }: { value }%
			</AccordionDetails>
		)
	)
	
	return (
		<Grid item container={ true } display='flex' flexDirection='column'>
			<Grid item display='flex' justifyContent='center'>
				<Tooltip title={ user.login }>
					<Avatar
						src={ user.avatar_url ?? '' }
						alt={ user.login }
						sx={ { ...avatarSize, margin: '3vh 0' } }
					>
						{ user.login[0] }
					</Avatar>
				</Tooltip>
			</Grid>
			<Grid item>
				<Typography component='span'>
					<AccountBoxOutlined sx={ { fontSize: '1em', marginRight: '5px' } } />
					{ user.name ?? '' } <Link href={ `https://github.com/${ user.login }` }>@{ user.login }</Link>
				</Typography>
			</Grid>
			<Grid item>
				<Collapse in={ !!user.bio }>
					<Typography>
						<InfoOutlined sx={ { fontSize: '1em', marginRight: '5px' } } />
						{ user.bio ?? '' }
					</Typography>
				</Collapse>
			</Grid>
			<Grid item>
				<PersonOutlined sx={ { fontSize: '1em', marginRight: '5px' } } />
				{ user.followers } followers, { user.following } following
			</Grid>
			<Grid item>
				<Collapse in={ !!user.location }>
					<LocationOnOutlined sx={ { fontSize: '1em', marginRight: '5px' } } />
					{ user.location }
				</Collapse>
			</Grid>
			<Grid item>
				<Collapse in={ isAuth }>
					<PaidOutlined sx={ { fontSize: '1em', marginRight: '5px' } } />
					Plan: { user.plan?.name }
				</Collapse>
			</Grid>
			<Grid item>
				<Collapse in={ isAuth && !!user.twitter_username }>
					<Twitter sx={ { fontSize: '1em', marginRight: '5px' } } />
					{ user.twitter_username }
				</Collapse>
			</Grid>
			<Grid item>
				<GitHub sx={ { fontSize: '1em', marginRight: '5px' } } />
				{ user.public_repos ?? 0 } public repos
			</Grid>
			<Grid item>
				<PlaylistAdd sx={ { fontSize: '1em', marginRight: '5px' } } />
				{ user.public_gists ?? 0 } public gists
			</Grid>
			<Grid item>
				<Accordion expanded={ langListExpanded }>
					<AccordionSummary expandIcon={ <ExpandMore /> } onClick={ handleAccordionExpansion }>
						<Typography>
							Languages
						</Typography>
					</AccordionSummary>
					{ langElements }
				</Accordion>
			</Grid>
		</Grid>
	)
}

export default InfoSection
