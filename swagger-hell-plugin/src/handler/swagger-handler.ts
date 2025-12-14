import type { OpenAPI3 } from "openapi-typescript";
import type { SwaggerFileNames, SwaggerInfo } from "../services/swagger-service";
import { fetchJson } from "../util.ts/fetch-json";
import { getJSONFileNameFromUrl } from "../util.ts/get-json-filename-url";
import { validateOpaJson } from "../util.ts/validate-opa-json";
import { getFileJson, getFilesInFolder, isFileExist, isFolderNotExistCreate, renameFile, saveFile } from "./file-handler";

export const urlSwagger = async (url: string): Promise<OpenAPI3 | null> => {

    // Folder to store swaggers
    const swaggerFolder = isFolderNotExistCreate('swaggers');

    // Generate filename from URL
    const filename = getJSONFileNameFromUrl(url);

    // Check if file exists and return its content
    return getFileJson<OpenAPI3>(swaggerFolder, filename);
}

export const fetchSwagger = async (url: string): Promise<OpenAPI3 | null> => {

    // Fetch Swagger JSON from URL
    const openAPI3 = await fetchJson<OpenAPI3>(url)

    if (!openAPI3 || !validateOpaJson(openAPI3, "3"))
        return null;

    const filename = getJSONFileNameFromUrl(url);

    // Folder to store swaggers
    const swaggerFolder = isFolderNotExistCreate('swaggers');

    // If file exists, rename it to filename_prev.json
    if (isFileExist(swaggerFolder, filename)) {
        renameFile(swaggerFolder, filename, `${filename.replace(".json", "_prev.json")}`);
    }

    // Save the fetched Swagger JSON to file
    saveFile(swaggerFolder, filename, JSON.stringify(openAPI3, null, 2));

    return openAPI3;
}

export const filenamesSwagger = async (): Promise<SwaggerFileNames> => {
    const swaggerFolder = isFolderNotExistCreate('swaggers');

    const filenames = getFilesInFolder(swaggerFolder);

    return {
        previous: filenames.filter(name => name.endsWith('_prev.json')).map(name => name.replace('.json', '')),
        current: filenames.filter(name => !name.endsWith('_prev.json')).map(name => name.replace('.json', '')),
    }
}

export const filenameSwagger = async (filename: string): Promise<OpenAPI3 | null> => {
    // Folder to store swaggers
    const swaggerFolder = isFolderNotExistCreate('swaggers');

    // Ensure filename ends with .json
    if (!filename.endsWith('.json'))
        filename = `${filename}.json`;

    // Check if file exists and return its content
    return getFileJson<OpenAPI3>(swaggerFolder, filename);
}

export const endpointsSwagger = async (filename: string): Promise<string[]> => {
    const swagger = await filenameSwagger(filename);

    if (!swagger)
        return [];

    return swagger.paths ? Object.keys(swagger.paths) : [];
}

export const infoSwagger = async (filename: string): Promise<SwaggerInfo> => {
    const swagger = await filenameSwagger(filename);

    if (!swagger)
        return {
            title: null,
            version: null,
            description: null,
        };
    
    return {
        title: swagger.info?.title || null,
        version: swagger.info?.version || null,
        description: swagger.info?.description || null,
    }
}