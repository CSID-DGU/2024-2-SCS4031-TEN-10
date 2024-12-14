import * as XLSX from "xlsx";

export async function GetFestivalJsonData() {
  const xlsxInfo = {
    xlsxUrl: "/data/festival_data.xlsx",
    sheetPage: 1,
    columnStartIdx: 3,
    rowStartIdx: 1,
  };
  return await ConvertXlsxToJson(xlsxInfo);
}

async function ConvertXlsxToJson(xlsxInfo: any) {
  const { xlsxUrl, sheetPage, columnStartIdx, rowStartIdx } = xlsxInfo;

  let jsonResult;

  await fetch(xlsxUrl)
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[sheetPage];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const formattedData = jsonData
        .slice(1)
        .slice(columnStartIdx)
        .map((row: any, index) => ({
          festival_idx: index + 1,
          festival_province: row[rowStartIdx],
          festival_city: row[rowStartIdx + 1],
          festival_name: row[rowStartIdx + 2],
          festival_type: row[rowStartIdx + 3],
          festival_period: row[rowStartIdx + 4],
          festival_season: row[rowStartIdx + 5],
          festival_location: row[rowStartIdx + 6],
          festival_content: row[rowStartIdx + 7],
        }));
      jsonResult = formattedData;
    })
    .catch((error) => console.error("Error reading excel file:", error));

  return jsonResult;
}
