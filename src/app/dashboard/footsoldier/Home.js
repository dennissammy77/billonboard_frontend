import { Banner } from '@/components/ui/dashboard/banner'
import React from 'react'

function Home() {
  return (
    <Banner 
      msg={'Earn extra cash by listing billboards around the country'} 
      msg2={''} 
      img={'../../boardad.jpg'}
    />
  )
}

export default Home