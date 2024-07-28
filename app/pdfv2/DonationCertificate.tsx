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
import NotoSansJp from "@/app/fonts/NotoSansJP-Regular.ttf";

Font.register({
  family: "NotoSansJP",
  src: NotoSansJp,
  fontStyle: "normal",
});

const styles = StyleSheet.create({
  title: {
    fontFamily: "NotoSansJP",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  centeredText: {
    fontFamily: "NotoSansJP",
    fontSize: 12,
    marginBottom: 5,
    textAlign: "center",
  },
  text: {
    fontFamily: "NotoSansJP",
    fontSize: 12,
    marginBottom: 5,
  },
  page: {
    fontFamily: "NotoSansJP",
    flexDirection: "column",
    padding: 20,
  },
  section: {
    margin: 10,
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
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  totalCol: {
    width: "75%",
    padding: 5,
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  totalAmountCol: {
    width: "25%",
    padding: 5,
    borderStyle: "solid",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "right",
  },
});

// Example data
const data = {
  donationNumber: "12314134",
  donorName: "山田太郎",
  totalAmount: 1123,
  details: [
    { id: "001", date: "2024/01/15", type: "サブスクリプション型", amount: 500 },
    { id: "002", date: "2024/02/20", type: "ワンタイム型", amount: 623 },
  ],
};

// Format current date as ２０XX年YY月ZZ日
const formatDate = (date : Date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}年${month}月${day}日`;
};

const DonationCertificate = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>寄付控除証明書</Text>
        <Text style={styles.centeredText}>認定NPO法人 多文化共生教育ネットワークかながわ</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>発行日付: {formatDate(new Date())}</Text>
        <Text style={styles.text}>寄付者番号: {data.donationNumber}</Text>
        <Text style={styles.text}>寄付者名: {data.donorName}</Text>
        <Text style={styles.text}>{new Date().getUTCFullYear()}年 寄付合計額: {data.totalAmount}円</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>詳細</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>寄付ID</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>寄付日付</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>寄付種類</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>金額</Text>
            </View>
          </View>
          {/* Table Data */}
          {data.details.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.id}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.date}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.type}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.amount}円</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.totalRow}>
          <View style={styles.totalCol}>
            <Text style={styles.tableCell}>合計</Text>
          </View>
          <View style={styles.totalAmountCol}>
            <Text style={styles.tableCell}>{data.totalAmount}円</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default DonationCertificate;
