"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { dateInJapanese, yearInJapanese } from "@/app/utils/date";

import NotoSansJP from "@/public/fonts/NotoSansJP-Regular.ttf";
import NotoSansJPBold from "@/public/fonts/NotoSansJP-Bold.ttf";
import NotoSansJPThin from "@/public/fonts/NotoSansJP-Thin.ttf";
import MEnetLogo from "@/public/logo.png";
import { numberWithCommas } from "../utils/number";
import { data } from "./data";

const FILE_NAME = `${yearInJapanese(new Date())}_ME-net寄附控除証明書`;

Font.register({
  family: "NotoSansJP",
  fonts: [
    {
      src: NotoSansJP,
      fontStyle: "normal",
      fontWeight: "normal",
    },
    {
      src: NotoSansJPBold,
      fontStyle: "normal",
      fontWeight: "bold",
    },
    {
      src: NotoSansJPThin,
      fontStyle: "normal",
      fontWeight: "thin",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansJP",
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  textCentered: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: "center",
  },
  textRight: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: "right",
  },
  fontBold: {
    fontWeight: "bold",
  },
  fontThin: {
    fontWeight: "thin",
  },
  section: {
    padding: 10,
  },
  sectionFlex: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionBox: {
    padding: 10,
    borderRadius: 10,
  },
  backgroundPrimary: {
    backgroundColor: "#fafafa",
  },
  backgroundDanger: {
    backgroundColor: "#fff1f2",
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flex: 1,
    marginLeft: 10,
    alignItems: "flex-end",
  },
  logo: {
    width: "68px",
    height: "68px",
  },
  logoWrapper: {
    paddingRight: 10,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eef2ff",
  },
  tableBody: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    padding: 5,
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    textAlign: "center",
  },
  tableCell: {
    fontSize: 10,
  },
  totalAmount: {
    paddingRight: 30,
  },
});

const totalAmount = data.details.reduce((acc, cur) => acc + cur.amount, 0);

const DonationCertificate = () => (
  <Document title={FILE_NAME}>
    <Page size="A4" orientation="portrait" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.textRight}>{dateInJapanese(new Date())}</Text>
        <Text style={styles.subTitle}>
          {yearInJapanese(new Date())}分寄附金受領証明書
        </Text>
      </View>
      <View style={styles.sectionFlex}>
        <View style={styles.leftColumn}>
          <Text style={styles.text}>{data.postalCode}</Text>
          <Text style={styles.text}>{data.address}</Text>
          <Text style={styles.text}>{data.donorName} 様</Text>
        </View>
        <View style={[styles.rightColumn, styles.logoWrapper]}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={MEnetLogo.src} style={styles.logo} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.textRight}>認定通知書の番号 市市活第502号</Text>
        <Text style={styles.textRight}>認定年月日 令和6年4月10日</Text>
        <Text style={styles.textRight}>
          神奈川県横浜市栄区小菅ヶ谷一丁目2-1
        </Text>
        <Text style={styles.textRight}>
          地球市民かながわプラザ NPOなどのための事務室内
        </Text>
        <Text style={styles.textRight}>
          認定NPO法人多文化共生教育ネットワークかながわ
        </Text>
        <Text style={styles.textRight}>理事長 武 一美</Text>
      </View>
      <View style={[styles.sectionBox, styles.backgroundPrimary]}>
        <Text style={styles.textCentered}>
          平素は当法人の活動にご理解、ご協力を賜り、厚く御礼申し上げます。
        </Text>
        <Text style={styles.textCentered}>
          頂戴した貴重なご寄附は、当団体の諸事業の運営に有効に使わせて頂きます。
        </Text>
        <Text style={styles.textCentered}>
          今後とも、変わらぬご支援、ご協力をどうぞよろしくお願い申し上げます。
        </Text>
      </View>
      <View style={styles.section}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>寄附年月日</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>寄附ID</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>寄附事業</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>寄附種類</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>寄附金額</Text>
            </View>
          </View>
          {/* Table Data */}
          {data.details.map((item, index) => (
            <View style={styles.tableBody} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {dateInJapanese(new Date(item.date))}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.id}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.project}</Text>
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
      </View>
      <View style={[styles.section, styles.totalAmount]}>
        <Text style={[styles.textRight, styles.fontBold]}>
          合計 {numberWithCommas(totalAmount)}円
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.textCentered}>
          上記の金額を受領したことを証明します。
        </Text>
      </View>
      <View style={[styles.section, styles.fontThin]}>
        <Text style={styles.textCentered}>
          （注）上記の金額は、当法人の行う特定非営利活動に係る外国につながる子どもたちの
        </Text>
        <Text style={styles.textCentered}>
          ための教育・進路支援に関する事業に関連する寄附金として受領した金額であり、
        </Text>
        <Text style={styles.textCentered}>
          租税特別措置法第41条の18の2第1項及び同法第66条の11の2
        </Text>
        <Text style={styles.textCentered}>
          第2項に規定する特定非営利活動に係る事業に関連する寄附に係る
        </Text>
        <Text style={styles.textCentered}>
          支出金に該当することを証明いたします。
        </Text>
      </View>
      <View style={[styles.sectionBox, styles.backgroundDanger]}>
        <Text style={styles.textCentered}>
          寄附金の支出による税制上の優遇措置の適用を受けるためには、確定申告等が必要です。
        </Text>
        <Text style={styles.textCentered}>
          申告の際、この「寄附金受領証明書」が必要となりますので、大切に保存してください。
        </Text>
      </View>
    </Page>
  </Document>
);

export default DonationCertificate;
