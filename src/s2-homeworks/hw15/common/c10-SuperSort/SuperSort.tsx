import React from 'react'
import downIcon from './assets/down.png'
import upIcon from './assets/up.png'
import noneIcon from './assets/noneDownUp.png'
// добавить в проект иконки и импортировать

export type SuperSortPropsType = {
  id?: string
  sort: string
  value: string
  onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
  // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
  if (sort === '') return down
  if (sort === down) return up
  if (sort === up) return down
  return down
}

const SuperSort: React.FC<SuperSortPropsType> = ({
  sort,
  value,
  onChange,
  id = 'hw15',
}) => {
  const up = '0' + value
  const down = '1' + value

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  const icon = sort === down ? downIcon : sort === up ? upIcon : noneIcon

  return (
    <span id={id + '-sort-' + value} onClick={onChangeCallback}>
      {/*сделать иконку*/}
      <img id={id + '-icon-' + sort} src={icon} />
      {/*а это убрать*/}
    </span>
  )
}

export default SuperSort
