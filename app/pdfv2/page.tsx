'use client'
import React from 'react'
import DownloadBillingTable from './DownloadBillingTable'
import { BillingTable } from './BillingTable'
import { Button } from '../components/ui/button'

const page = () => {
  return (
    <div className='flex w-full content-center'>
      
      {/* BillingTable needs to get rendered first to render DownLoad it */}
      {<BillingTable/> ? <Button> <DownloadBillingTable  /></Button> : <p>Loading...</p> }
    </div>
  )
}

export default page