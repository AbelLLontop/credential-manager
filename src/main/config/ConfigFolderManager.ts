import fs from 'fs'
import path from 'path';
import { ConfigStructure, FILE_MANAGER_EMPTY } from './file-structure';


export class ConfigFolderManager {
  public static readonly DEFAULT_FILE_NAME = "config-data.json";
  private static instance: ConfigFolderManager | null = null;
  private configStructure: ConfigStructure;
  private filePath: string;

  constructor(pathFolderConfig: string) {
    this.filePath = this.initializeConfigFolder(pathFolderConfig);
    this.configStructure = this.loadConfig();
  }

  public static getInstance(pathFolderConfig?: string): ConfigFolderManager {
    if (this.instance === null) {
      if (!pathFolderConfig) throw new Error('A pathFolderConfig is required for the first initialization');
      this.instance = new ConfigFolderManager(pathFolderConfig);
    }
    return this.instance;
  }



  setLastPathTemporalFile(pathName: string): void {
    this.configStructure.lastPathTemporalFile = pathName;
    this.saveConfig();
  }

  getLastPathTemporalFile(): string|null {
    return this.configStructure.lastPathTemporalFile;
  }

  private initializeConfigFolder(pathFolder: string): string {
    const resolvePathFolder = path.resolve(pathFolder);

    if (!fs.existsSync(resolvePathFolder)) {
      fs.mkdirSync(resolvePathFolder, { recursive: true })
    }
    const filePath = path.join(resolvePathFolder, ConfigFolderManager.DEFAULT_FILE_NAME);
    if (!fs.existsSync(filePath)) {
      const fileManagerEmpty = JSON.stringify(FILE_MANAGER_EMPTY, null, 2)
      fs.writeFileSync(filePath, fileManagerEmpty, 'utf-8');
    }
    return filePath;
  }

  private loadConfig(): ConfigStructure {
    try {
      const fileContent = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(fileContent) as ConfigStructure;
    } catch (error) {
      throw new Error(`Failed to load configuration file: ${(error as Error).message}`);
    }
  }

  private saveConfig(): void {
    try {
      const content = JSON.stringify(this.configStructure, null, 2);
      fs.writeFileSync(this.filePath, content, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to save configuration file: ${(error as Error).message}`);
    }

  }


}

