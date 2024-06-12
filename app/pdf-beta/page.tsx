'use client'
import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './MyDocument';

const pdfPage = () => (
  <div id='root'>
  <PDFViewer>
    <MyDocument />
  </PDFViewer>
  </div>
);

export default pdfPage

