import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
// template
import License from './License'
import jsPDF from 'jspdf'

const Certificate = () => {
const [download , setDownload] = useState()
const [generateCertificated , setGenerateCertificated] = useState()
const licenseCirtificatedRef = useRef(null)

const handleGeneratePdf = async () => {
  const inputData = licenseCirtificatedRef.current
  try {
    const canvas = await html2canvas(inputData!)
    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF({
      orientation : 'landscape',
      unit : 'px',
      format : 'a4',
    })

    const width = pdf.internal.pageSize.getWidth()
    const height = (canvas.height * width) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, width, height)
    pdf.save('certificate.pdf')
  } catch (error) {
    
  }
}
  return (
    <div>
      <div ref={licenseCirtificatedRef} >
        <License />
      </div>
      <div>
        <button className='btn' onClick={() => handleGeneratePdf()} >Download Certificate</button>
      </div>
    </div>
  )
}

export default Certificate

