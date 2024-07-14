"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Ensure fonts are available in the project and paths are correct
// Font.register({
//   family: "NotoSansJP",
//   fonts: [
//     { src: "../fonts/NotoSans-Regular.ttf" },
//     { src: "../fonts/NotoSansJP-Bold.ttf", fontWeight: "bold" },
//   ],
// });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
  },
  company: {
    marginTop: 10,
  },
  itemsTable: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    textAlign: "center",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontWeight: "bold",
    padding: 5,
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    textAlign: "center",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  textVertical: {
    flexDirection: "column",
  },
});

const data = [
  {
    title: "発注日",
    value: "2024/4/01",
    items: [
      {
        name: "サンプル1",
        surface: "1",
        thickness: "式",
        width: "10,000",
        length: "10,000",
      },
      {
        name: "サンプル1",
        surface: "1",
        thickness: "式",
        width: "10,000",
        length: "10,000",
      },
      {
        name: "サンプル1",
        surface: "1",
        thickness: "式",
        width: "10,000",
        length: "10,000",
      },
      {
        name: "サンプル1",
        surface: "1",
        thickness: "式",
        width: "10,000",
        length: "10,000",
      },
      {
        name: "サンプル1",
        surface: "1",
        thickness: "式",
        width: "10,000",
        length: "10,000",
      },
      {
        name: "サンプル1",
        surface: "1",
        thickness: "式",
        width: "10,000",
        length: "10,000",
      },
    ],
  },
];

export default function PDF() {
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <View>
          <Text style={styles.header}>領収書</Text>
        </View>
        <View style={styles.details}>
          <View style={styles.textVertical}>
            <Text>株式会社〇〇</Text>
            <Text>〇〇 御中</Text>
          </View>
          <View style={styles.detailItem}>
            <Text>発行日 {data[0].value}</Text>
            <View style={styles.company}>
              <Text>株式会社〇〇</Text>
              <Text>東京都〇〇〇〇〇〇〇〇〇〇</Text>
              <Text>TEL：00-0000-0000</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.itemsTable}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>概要</Text>
              <Text style={styles.tableColHeader}>数量</Text>
              <Text style={styles.tableColHeader}>単位</Text>
              <Text style={styles.tableColHeader}>単価</Text>
              <Text style={styles.tableColHeader}>金額</Text>
            </View>
            {data[0].items.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCol}>{item.name}</Text>
                <Text style={styles.tableCol}>{item.surface}</Text>
                <Text style={styles.tableCol}>{item.thickness}</Text>
                <Text style={styles.tableCol}>{item.width}</Text>
                <Text style={styles.tableCol}>{item.length}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

