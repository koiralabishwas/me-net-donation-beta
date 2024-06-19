'use client'
import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './MyDocument';

const PDFPage: React.FC = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <PDFViewer width="100%" height="100%">
      <MyDocument />
    </PDFViewer>
  </div>
);

export default PDFPage;
