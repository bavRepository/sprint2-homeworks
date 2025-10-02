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
