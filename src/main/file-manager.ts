import { dialog } from "electron";
import path from 'node:path';
import fs from 'fs';
import { parseCSVToJSON } from "./utils";
import { ResponseReadFile } from "./type";

export async function getInitialData(): Promise<ResponseReadFile | undefined> {
  try {
    const lastRoute = path.join(__dirname,'..','..','..', '../data/data.txt');
    if (!fs.existsSync(lastRoute)) return
    const content = fs.readFileSync(lastRoute, "utf-8");
    const lines = content?.split('\n');
    const filePath = lines?.[0];
    if (!filePath) return;
    if(!fs.existsSync(filePath)) return
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const file = parseCSVToJSON(filePath, fileContent);
    if(!file.success) return file;
    return file;

  } catch (error) {
    return {
      route: "",
      success: false,
      message: `Error al leer el archivo inicial: ${(error as Error).message}`
    }
  }
}

export async function handleFileOpen(): Promise<ResponseReadFile | undefined> {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [
      { name: "CSV Files", extensions: ["csv"] },
      { name: "All Files", extensions: ["*"] },
    ],
    properties: ["openFile"],
  });
  if (canceled) return;
  const filePath = filePaths[0];
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const file = parseCSVToJSON(filePath, fileContent);
    if (path.extname(filePath).toLowerCase() !== ".csv") {
      return {
        route: "",
        success: false,
        message: `Formato de archivo no válido, solo se permiten archivos CSV.`
      }
    }
    const outputTempRouteFolder = path.join(__dirname,'..','..','..', '../data');
    if(!file.success) return file;
    if (!fs.existsSync(outputTempRouteFolder)) {
      fs.mkdirSync(outputTempRouteFolder, { recursive: true });
    }
    fs.writeFileSync(path.join(outputTempRouteFolder, 'data.txt'), filePath, 'utf-8');
    return file;
  } catch (error) {
    return {
      route: "",
      success: false,
      message: `Error al leer el archivo: ${(error as Error).message}`
    }
  }

}

// const log=(text:string):ResponseReadFile=>{
//   return {
//     route: "",
//     success: false,
//     message: text
//   }

// }
