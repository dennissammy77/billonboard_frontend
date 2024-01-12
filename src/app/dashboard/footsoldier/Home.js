import { Banner } from '@/components/ui/dashboard/banner'
import React from 'react'

function Home() {
  return (
    <Banner 
      msg={'Earn extra cash by listing boards around the country. Need more information?'} 
      msg2={'contact us'} 
      img={'../../boardad.jpg'}
    />
  )
}

export default Home