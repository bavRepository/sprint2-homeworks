import React from 'react'
import { Slider, SliderProps } from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
  return (
    <Slider
      sx={{
        ml: 3,
        mr: 3,
        color: '#0c2',
        height: 3,
        padding: '13px 0',
        width: '147px',
        '& .MuiSlider-thumb': {
          height: 18,
          width: 18,
          backgroundColor: '#fff',
          border: '1px solid  #0c2',
          '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
          },
          '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: '#0c2',
            marginLeft: 1,
            marginRight: 1,
          },
        },
        '& .MuiSlider-track': {
          height: 3,
        },
        '& .MuiSlider-rail': {
          color: '#8b8b8b',
          opacity: 1,
          height: 3,
        },
      }}
      {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
    />
  )
}

export default SuperRange
