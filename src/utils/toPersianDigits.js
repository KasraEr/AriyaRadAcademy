export const toPersianDigits = (str) =>
  str?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) ?? "";

