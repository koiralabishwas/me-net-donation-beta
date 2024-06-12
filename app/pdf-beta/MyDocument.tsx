'use client'
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'NotoSansJP',
  src: 'https://fonts.gstatic.com/ea/notosansjp/v6/NotoSansJP-Regular.otf'
});



// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 100,
    padding: 100,
    flexGrow: 1
  },
  text: {
    fontFamily: 'NotoSansJP',
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>寄付控除証明証</Text>
      </View>
      <View style={styles.section}>
        <Text>寄付をしたことをこちらにて</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument