import Taro, { useRouter } from '@tarojs/taro'
import { CSSProperties, useEffect, useState } from 'react'
import classNames from 'classnames'
import { View, Image, ScrollView, AdCustom, PageMeta } from '@tarojs/components'
import {
  NavigationHeader,
  AdjacentNavigation,
  DetailContent,
  usePageMeta,
} from '@periodic-table-pro/components'
import { DetailData, getDetailData } from '@periodic-table-pro/data'
import { useShareMessage } from '../../hooks'

import './index.scss'
import { useRecoilState } from 'recoil'
import { themeModeState } from '@periodic-table-pro/components/recoil/atom'

const PLATFORM = process.env.PLATFORM
const DETAIL_CUSTOM_AD = process.env.DETAIL_CUSTOM_AD

export default function DetailPage() {
  const router = useRouter()
  const [theme] = useRecoilState(themeModeState)
  const [atomicNumber, setAtomicNumber] = useState(1)
  // const [scrollInto, setScrollInto] = useState('')

  usePageMeta()
  useShareMessage({
    path: '/pages/detail/index?Z=' + router.params.Z,
    posterImage: false,
  })

  useEffect(() => {
    const Z = parseInt(router.params.Z || '1')
    console.log('Z ', Z)
    if (isFinite(Z)) {
      setAtomicNumber(Z)
    }
  }, [router])

  const detailData = getDetailData(atomicNumber)
  console.log(detailData)

  const handleTapPrevious = () => {
    const Z = detailData.previous
      ? detailData.previous.atomicNumber
      : detailData.atomicNumber
    Taro.redirectTo({
      url: '/pages/detail/index?Z=' + Z,
    })
  }

  const handleTapNext = () => {
    const Z = detailData.next
      ? detailData.next.atomicNumber
      : detailData.atomicNumber
    Taro.redirectTo({
      url: '/pages/detail/index?Z=' + Z,
    })
  }

  return (
    <View className={classNames('detail page', theme)}>
      <NavigationHeader themeClass={theme} />

      <DetailContent detailData={detailData} />

      <AdjacentNavigation
        themeClass={theme}
        previous={detailData.previous ? detailData.previous.symbol : '--'}
        current={detailData.symbol}
        next={detailData.next ? detailData.next.symbol : '--'}
        onTapPrevious={handleTapPrevious}
        onTapNext={handleTapNext}
      />
    </View>
  )
}
