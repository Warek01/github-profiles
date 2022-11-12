import * as React from 'react'
import { Typography, Tooltip } from '@mui/material'

type RoundBgTextProps = {
  text: string
  bg: string
  tooltip?: string | number
}

const RoundBgText: React.FC<RoundBgTextProps> = ({ text, bg, tooltip }) => {
  const textElement: JSX.Element = (
    <Typography
      sx={{
        backgroundColor: bg,
        padding: '.25em .5em',
        borderRadius: '1em',
        fontSize: '.75em',
        cursor: 'default',
        margin: '0 5px',
      }}
      component="span">
      {text}
    </Typography>
  )

  return !tooltip ? textElement : <Tooltip title={tooltip!}>{textElement}</Tooltip>
}

export default RoundBgText
