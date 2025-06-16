import React from 'react'
import {Slider, SliderProps} from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{
                width: 200,
                color: 'limegreen',
                '& .MuiSlider-thumb': {
                    backgroundColor: 'limegreen',
                    border: '2px solid white',
                    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                        boxShadow: 'inherit',
                    },
                    '&::before': {
                        display: 'none',
                    },
                },
                '& .MuiSlider-rail': {
                    backgroundColor: '#bdbdbd',
                    opacity: 1,
                },
                '& .MuiSlider-track': {
                    border: 'none',
                }
            }}
            {...props}
        />
    )
}

export default SuperRange
