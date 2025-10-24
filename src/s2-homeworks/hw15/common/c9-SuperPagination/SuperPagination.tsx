import React, { ChangeEvent } from 'react'
import SuperSelect from '../../../hw07/common/c5-SuperSelect/SuperSelect'
import { Pagination } from '@mui/material'
import s from './SuperPagination.module.css'

export type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  page,
  itemsCountForPage,
  totalCount,
  onChange,
  id = 'hw15',
}) => {
  const lastPage = Number((totalCount / itemsCountForPage).toFixed()) // пишет студент // вычислить количество страниц

  const onChangeCallback = (event: ChangeEvent<unknown>, page: number) => {
    // пишет студент
    onChange(page, itemsCountForPage)
  }

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(page, Number(event.currentTarget.value))
  }

  return (
    <div className={s.pagination}>
      <Pagination
        id={id + '-pagination'}
        sx={{
          '& .MuiPaginationItem-root': {
            // Targets all pagination items
            border: '1px solid #black',
            width: '24px',
            height: '24px',
            marginRight: '12px',
            color: 'black', // Sets text color for all items
            '&.Mui-selected': {
              // Targets the selected item
              backgroundColor: '#06c', // Sets background for selected item
              color: 'white', // Sets text color for selected item
            },
          },
        }}
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        hideNextButton
        hidePrevButton
        shape='rounded'
      />

      <span className={s.text1}>Показать</span>

      <SuperSelect
        id={id + '-pagination-select'}
        value={itemsCountForPage}
        options={[
          { id: 4, value: 4 },
          { id: 7, value: 7 },
          { id: 10, value: 10 },
        ]}
        onChange={onChangeSelect}
      />

      <span className={s.text2}>строк в таблице</span>
    </div>
  )
}

export default SuperPagination
