import * as React from 'react'
import { Typography, Tooltip, Collapse } from '@mui/material'

type IconedTextProps = {
  text?: string
  icon?: JSX.Element
  tooltip?: string | number
  condition?: boolean
}

const StartIconText: React.FC<IconedTextProps> = ({ text, icon, tooltip, condition = false }) => {
  const element: JSX.Element = (
    <Typography component="span">
      {icon} {text}
    </Typography>
  )

  return <Collapse in={condition}>{!tooltip ? element : <Tooltip title={tooltip!}>{element}</Tooltip>}</Collapse>
}

export default StartIconText
