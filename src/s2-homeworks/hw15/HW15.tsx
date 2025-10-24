import React, { useEffect, useMemo, useState } from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import { useSearchParams } from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'
import { CircularProgress } from '@mui/material'
/*
 * 1 - дописать SuperPagination
 * 2 - дописать SuperSort
 * 3 - проверить pureChange тестами
 * 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
 * 4 - сделать стили в соответствии с дизайном
 * 5 - добавить HW15 в HW5/pages/JuniorPlus
 * */

type TechType = {
  id: number
  tech: string
  developer: string
}

type ParamsType = {
  sort: string
  page: number
  count: number
}

const getTechs = (params: ParamsType) => {
  return axios
    .get<{
      techs: TechType[]
      totalCount: number
    }>('https://samurai.it-incubator.io/api/3.0/homework/test3', { params })
    .catch((e) => {
      alert(e.response?.data?.errorText || e.message)
    })
}

const HW15 = () => {
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(4)
  const [idLoading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(100)
  const [searchParams, setSearchParams] = useSearchParams()
  const [techs, setTechs] = useState<TechType[]>([])

  const sendQuery = (params: any) => {
    setLoading(true)
    getTechs(params).then((res) => {
      if (res) {
        setTechs(res.data.techs)
        setTotalCount(res.data.totalCount)
        setLoading(false)
      }
      // делает студент
      // сохранить пришедшие данные
      //
    })
  }

  const onChangePagination = (newPage: number, newCount: number) => {
    // делает студент
    // setPage(
    // setCount(
    // sendQuery(
    // setSearchParams(
    //
    setPage(newPage)
    setCount(newCount)
    sendQuery({ page: newPage, count: newCount, sort })
    setSearchParams({ page: newPage.toString(), count: newCount.toString() })
  }

  const onChangeSort = (newSort: string) => {
    // делает студент
    // setSort(
    // setPage(1) // при сортировке сбрасывать на 1 страницу
    // sendQuery(
    // setSearchParams(
    //
    setSort(newSort)
    setPage(1)
    sendQuery({ page, count, sort: newSort })
    setSearchParams({ page: '1', count: count.toString() })
  }

  useEffect(() => {
    const params = Object.fromEntries(searchParams)
    sendQuery({ page: params.page, count: params.count })
    setPage(+params.page || 1)
    setCount(+params.count || 4)
  }, [])

  const sortedData = <T, K extends keyof T>(
    objectsArray: T[],
    field: K,
    direction: 'asc' | 'desc' = 'asc',
  ): T[] => {
    const isNumeric = (s: string): boolean => /^\d+$/.test(s)
    const weight = (s: string): number => (isNumeric(s) ? 0 : 1)

    /* ---------- фабрика компараторов ---------- */
    type Direction = 'asc' | 'desc'

    const makeComparator =
      (dir: Direction) =>
      (a: T, b: T): number => {
        const ta = String(a[field])
        const tb = String(b[field])

        // 1. группы: числа < не-числа
        const wa = weight(ta)
        const wb = weight(tb)
        if (wa !== wb) return dir === 'asc' ? wa - wb : wb - wa

        // 2. обе числовые → как числа
        if (wa === 0) {
          const na = parseInt(ta, 10)
          const nb = parseInt(tb, 10)
          return dir === 'asc' ? na - nb : nb - na
        }

        // 3. обе не числовые → строки
        return dir === 'asc' ? ta.localeCompare(tb) : tb.localeCompare(ta)
      }

    /* ---------- использование ---------- */
    return [...objectsArray].sort(makeComparator(direction))
  }

  const sortedTechs = () => {
    if (sort === '0tech') {
      return sortedData(techs, 'tech', 'asc')
    } else if (sort === '1tech') {
      return sortedData(techs, 'tech', 'desc')
    } else if (sort === '0developer') {
      return sortedData(techs, 'developer', 'asc')
    } else if (sort === '1developer') {
      return sortedData(techs, 'developer', 'desc')
    }
    return techs
  }

  // const sortedTechs = useMemo(() => {
  //   if (sort === '0tech') {
  //     return sortedData(techs, 'tech', 'asc')
  //   } else if (sort === '1tech') {
  //     return sortedData(techs, 'tech', 'desc')
  //   } else if (sort === '0developer') {
  //     return sortedData(techs, 'developer', 'asc')
  //   } else if (sort === '1developer') {
  //     return sortedData(techs, 'developer', 'desc')
  //   }
  //   return techs
  // }, [sort, techs])

  const array: TechType[] = [
    { id: 1, tech: '1', developer: '3developer' },
    { id: 2, tech: '10', developer: '2developer' },
    { id: 3, tech: '1tech', developer: 'developer' },
    { id: 4, tech: '5css', developer: '5developer' },
    { id: 5, tech: '5yamn', developer: '12developer' },
    { id: 6, tech: 'techs', developer: '04developer' },
    { id: 7, tech: 'abrms0', developer: '04developer' },
    { id: 8, tech: 'yamn', developer: '012developer' },
  ]
  // console.log(sortedData(array, 'tech', 'desc'))

  const sortedArrayTechs = sortedTechs()

  const mappedTechs = techs.map((t) => (
    <div key={t.id} className={s.row}>
      <div id={'hw15-tech-' + t.id} className={s.tech}>
        {t.tech}
      </div>

      <div id={'hw15-developer-' + t.id} className={s.developer}>
        {t.developer}
      </div>
    </div>
  ))

  return (
    <div id={'hw15'}>
      <div className={s2.hwTitle}>Homework #15</div>

      <div className={s2.hw}>
        {idLoading && (
          <div id={'hw15-loading'} className={s.loading}>
            <CircularProgress size={150} thickness={3} />
          </div>
        )}

        <SuperPagination
          page={page}
          itemsCountForPage={count}
          totalCount={totalCount}
          onChange={onChangePagination}
        />

        <div className={s.rowHeader}>
          <div className={s.techHeader}>
            Tech
            <SuperSort sort={sort} value={'tech'} onChange={onChangeSort} />
          </div>

          <div className={s.developerHeader}>
            Developer
            <SuperSort
              sort={sort}
              value={'developer'}
              onChange={onChangeSort}
            />
          </div>
        </div>

        {mappedTechs}
      </div>
    </div>
  )
}

export default HW15
