/**
 * @param date
 * @returns 令和X年Y月Z日
 */
export function dateInJapanese(date: Date) {
  const japaneseDate = new Intl.DateTimeFormat("ja-JP-u-ca-japanese", {
    dateStyle: "long",
  }).format(date);
  return japaneseDate;
}

/**
 * @param date
 * @returns 令和X年
 */
export const yearInJapanese = (date: Date) => {
  const yearIndex = dateInJapanese(date).indexOf("年");
  return dateInJapanese(date).substring(0, yearIndex + 1);
};

/**
 * @param date
 * @returns 令和X年
 */
export const yearMonthInJapanese = (date: Date) => {
  const yearIndex = dateInJapanese(date).indexOf("月");
  return dateInJapanese(date).substring(0, yearIndex + 1);
};
