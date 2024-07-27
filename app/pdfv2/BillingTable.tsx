"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import { title } from "process";

import NotoSansJp from '@/app/fonts/NotoSansJP-Regular.ttf'


// Create styles
Font.register({
  family : 'NotoSansJP',
  src : NotoSansJp,
  fontStyle : 'normal'
})
const styles = StyleSheet.create({
  title : {
    fontFamily : "NotoSansJP"
  },
  page: {
    fontFamily : "NotoSansJP",
    flexDirection: "column",
    padding: 10,

  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,

  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,

  },
  tableRow: {
    fontFamily : "NotoSansJP",
    flexDirection: "row",

  },
  tableCol: {
    fontFamily : "NotoSansJP",
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,

  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,

  },
});

// Create Document Component
export const BillingTable = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title} >認定NPO法人 多文化共生教育ネットワークかながわ</Text>
          <Text style={styles.title} >寄付控除証明書</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>月</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>サブスクリプション情報</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>金額</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>ステータス</Text>
              </View>
            </View>
            {/* Table Data */}
            {[
              {
                month: "January",
                plan: "Basic",
                amount: "$10",
                status: "Paid",
              },
              {
                month: "February",
                plan: "Basic",
                amount: "$10",
                status: "Paid",
              },
              { month: "3月", plan: "Basic", amount: "$10", status: "Paid" },
              { month: "April", plan: "Basic", amount: "$10", status: "Paid" },
              // Add more rows as needed
            ].map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.month}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.plan}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.amount}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
);
