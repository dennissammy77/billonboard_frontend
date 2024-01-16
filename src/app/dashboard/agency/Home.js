import { Banner } from '@/components/ui/dashboard/banner'
import React from 'react'

function Home() {
  return (
    <Banner 
      msg={'Looking for clients to advertise their business? Talk to our sales team to help promote your billboards'} 
      msg2={'Contact us!'} 
      img={'../../boardad.jpg'}
    />
  )
}

export default Home