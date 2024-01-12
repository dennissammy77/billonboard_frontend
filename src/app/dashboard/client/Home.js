import { Banner } from '@/components/ui/dashboard/banner'
import React from 'react'

function Home() {
  return (
    <Banner 
      msg={'We are here to help you advertise your business or your content.'} 
      msg2={'Talk to our qualified experts.'} 
      img={'../../boardad.jpg'}
    />
  )
}

export default Home