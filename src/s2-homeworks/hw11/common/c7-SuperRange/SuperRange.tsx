import React from 'react'
import { Slider, SliderProps } from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{ // стили для слайдера
                width: '150px',
                color: '#00CC22', // Основной цвет (активная часть)
                '& .MuiSlider-rail': {
                    color: '#8B8B8B', // Цвет неактивной части
                },
                '& .MuiSlider-thumb': {
                    backgroundColor: '#FFFFFF', // Цвет самого ползунка
                    border: '1px solid #00CC22', // Рамка ползунка
                },
            }}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange