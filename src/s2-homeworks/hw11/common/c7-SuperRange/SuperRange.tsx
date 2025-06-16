import React from 'react';
import { Slider, SliderProps } from '@mui/material';

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{ // стили для слайдера
                width: 200, // или другая ширина по дизайну
                color: 'limegreen', // Основной цвет (активная часть трека и ползунок)
                '& .MuiSlider-thumb': {
                    backgroundColor: 'limegreen', // Цвет ползунка
                    border: '2px solid white', // Белая обводка ползунка как на дизайне
                    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                        boxShadow: 'inherit', // Убираем стандартную тень при фокусе/наведении
                    },
                    '&::before': { // Убираем пульсацию при фокусе, если она есть
                        display: 'none',
                    },
                },
                '& .MuiSlider-rail': {
                    backgroundColor: '#bdbdbd', // Цвет неактивной части трека (серый)
                    opacity: 1,
                },
                '& .MuiSlider-track': {
                    border: 'none', // Убираем границу трека, если она есть и мешает
                }
            }}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    );
}

export default SuperRange;