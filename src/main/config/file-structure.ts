interface Data {
  [key: string]: string;
}

interface CollectionItem {
  title: string;
  data: Data;
}

interface Collection {
  title: string;
  description: string;
  privateKey: string;
  publicKey: string;
  collection: CollectionItem[];
}
interface TemporalFile {
  path: string;
  title: string;
  description: string;
  status: boolean
}

export interface ConfigStructure {
  lastPathTemporalFile: string | null;
  temporalsFiles: TemporalFile[],
  collections: Collection[];
}

export const FILE_MANAGER_EMPTY:ConfigStructure = {
  lastPathTemporalFile: null,
  temporalsFiles: [],
  collections: []
}
// const FileManagerEmpty = {
//   lastPathTemporalFile: null,
//   temporalsFiles: [
//     {
//       path: "../data/data.csv",
//       title: "title",
//       description: "description",
//       status: true,
//     }

//   ],
//   collections: [
//     {
//       title: "Credenciales de acceso a la base de datos",
//       description: "Archivo de ejemplo para almacenar las credenciales de acceso a la base de datos",
//       privateKey: "MIIBVwIBADANBgkqhkiG9w0BAQEFAASCAT...",
//       publicKey: "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAL...",
//       collection: [
//         {
//           title: "Acceso a MongoDB",
//           data: {
//             user: "U2FsdGVkX1+F8J3Qz...",
//             password: "U2FsdGVkX1+F8J3Qz...",
//             host: "U2FsdGVkX1+F8J3Qz...",
//             port: "U2FsdGVkX1+F8J3Qz...",
//             database: "U2FsdGVkX1+F8J3Qz..."
//           }
//         },
//         {
//           title: "Acceso a MySQL",
//           data: {
//             user: "U2FsdGVkX1+F8J3Qz...",
//             password: "U2FsdGVkX1+F8J3Qz...",
//             host: "U2FsdGVkX1+F8J3Qz...",
//             port: "U2FsdGVkX1+F8J3Qz...",
//             database: "U2FsdGVkX1+F8J3Qz..."
//           }
//         }
//       ]
//     }
//   ]
// }

//--- archivos temporadles---
//una lista de credenciales con formato id,username,password y title.
// esta lista proviene de un csv, unicamente se almacena la ruta
//se crea una variable de estado que indicara si el archivo anteriormente ingresado sigue existiendo la ruta

//---colecciones de datos encriptados (deben estar en el sistema no depender de archivos externos)----
// La clave pública es obligatoria.
// La clave privada es opcional tenerla almacenada en el sistema.
// Si el usuario no tiene la clave privada almacenada en el sistema, se le pedirá cada vez que quiera desencriptar un archivo junto con una clave personal.
// Siempre se le pedirá al usuario una clave personal que funciona en conjunto con la clave privada para desencriptar un archivo.
