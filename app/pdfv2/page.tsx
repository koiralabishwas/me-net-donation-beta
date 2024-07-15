'use client'
import React from 'react'
import DownloadBillingTable from './DownloadBillingTable'
import { BillingTable } from './BillingTable'

const page = () => {
  return (
    <div>
      {/* BillingTable needs to get rendered first to render DownLoad it */}
      {<BillingTable/> ? <div className='bg-teal-300'><DownloadBillingTable  /></div> : <p>Loading...</p> }
      <BillingTable />
    </div>
  )
}

export default page