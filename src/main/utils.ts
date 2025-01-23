import { ResponseReadFile } from "./type";
const REQUIRE_HEADERS = ["id","username","password","title"];

export const parseCSVToJSON = (filePath:string,fileContent:string):ResponseReadFile =>{
  if(isValidCSV(fileContent)){
    const lines = fileContent.trim().split("\n");
    const headers = lines[0].split(",");
    const rows = lines.slice(1);
    const contentJSON = rows.map((row) => {
        const values = row.split(",");
        return headers.reduce((acc, header, index) => {
            acc[header.trim()] = values[index]?.trim() || "";
            return acc;
        }, {});
    });
    return { route: filePath, success: true, data: contentJSON };
  }else{
    return { route: "", success: false, message: "El archivo no es un CSV válido. Debe contener los campos id,username,password y title (en ese orden). Ademas debe contener almenos un registro" };
  }
}

export const isValidCSV = (content:string):boolean=>{
  const lines = content.trim().split('\n');
  if(lines.length<2) return false;
  const header = lines[0].split(',').map((header)=>header.trim());
  return (
    header.length === REQUIRE_HEADERS.length &&
    REQUIRE_HEADERS.every((requireHeader)=>header.includes(requireHeader))
  )
}
