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
		const arr: [string, number][] = []
		const langMap = await analyzeReposLanguages(user.repos)
		snackbar.showThenHide(`Loaded in ${ langMap.elapsedMs } ms`, 1000)
		
		langMap.parsed.forEach((value, key) => arr.push([key, value]))
		
		for (let i = 0; i < arr.length - 1; i++)
			for (let j = i + 1; j < arr.length; j++) {
				if (arr[j][1] > arr[i][1]) {
					const temp = arr[i]
					arr[i] = arr[j]
					arr[j] = temp
				}
			}
		
		setLangList(arr)
	}, [setLangList, setLangListExpanded])
	
	const handleAccordionExpansion = React.useCallback(async (): Promise<void> => {
		if (!langList.length)
			await getLangInfo()
		
		setLangListExpanded(prev => !prev)
	}, [getLangInfo, setLangListExpanded])
	
	const langElements = langList.map(arr => (
			<AccordionDetails key={ arr[0] }>
				{ arr[0] }: { arr[1] }%
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
