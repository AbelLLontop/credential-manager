import { dialog } from "electron";
import path from 'node:path';
import fs from 'fs';
import { parseCSVToJSON } from "./utils";
import { ResponseReadFile } from "./type";
import { ConfigFolderManager } from "./config/ConfigFolderManager";





export async function getInitialData(configFolderManager:ConfigFolderManager): Promise<ResponseReadFile | undefined> {
  try {
    const filePath = configFolderManager.getLastPathTemporalFile();
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

export async function handleFileOpen(configFolderManager:ConfigFolderManager): Promise<ResponseReadFile | undefined> {
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
    if(!file.success) return file;
    configFolderManager.setLastPathTemporalFile(filePath)
    return file;
  } catch (error) {
    return {
      route: "",
      success: false,
      message: `Error al leer el archivo: ${(error as Error).message}`
    }
  }

}
