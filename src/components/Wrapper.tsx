'use client'

import { Box } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

export default function Wrapper(props: Props) {
    return <Box
        sx={{
            position: 'absolute',
            width: '100vw',
            height: '100vh'
        }}
    >
        {props.children}
    </Box>
}