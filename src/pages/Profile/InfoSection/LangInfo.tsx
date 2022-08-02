import * as React from 'react'
import { AccordionSummary, Typography, Accordion, AccordionDetails } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import analyzeReposLanguages from '../../../utils/analyzeReposLanguages'

import { snackbarContext, userContext } from '../../../App'

import { customScrollbar } from '../../../themes'

const LangInfo: React.FC = () => {
	const snackbar = React.useContext(snackbarContext)
	const user = React.useContext(userContext)
	
	const [langListExpanded, setLangListExpanded] = React.useState<boolean>(false)
	const [langList, setLangList] = React.useState<[string, number][]>([])
	
	const getLangInfo = React.useCallback(async (): Promise<void> => {
		const langMap = await analyzeReposLanguages(user.profile!.repos)
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
	}, [langList])
	
	return (
		<Accordion
			expanded={ langListExpanded }
			sx={ {
				maxHeight: '30vh',
				overflow: 'auto',
				maxWidth: '80%',
				fontSize: '12px',
				...customScrollbar
			} }
		>
			<AccordionSummary expandIcon={ <ExpandMore /> } onClick={ handleAccordionExpansion }>
				<Typography sx={ { color: 'primary.main' } }>
					Languages
				</Typography>
			</AccordionSummary>
			{ langList.map(([language, value]) => (
					<AccordionDetails key={ language }>
						{ language }: { value }%
					</AccordionDetails>
				)
			) }
		</Accordion>
	)
}

export default LangInfo
