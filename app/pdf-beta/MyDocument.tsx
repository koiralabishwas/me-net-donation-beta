'use client'
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'NotoSansJP',
  src: 'https://fonts.gstatic.com/s/notosansjp/v27/-F6ofjtqLzI2JPCgQBnw7HFQogg.woff2'
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  text: {
    fontFamily: 'NotoSansJP', // Ensure the correct font family is used
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>what is the</Text>
      </View>
      <View style={styles.section}>
        <Text>寄付をしたことをこちらにて</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument