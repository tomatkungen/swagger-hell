import { type OpenAPI3 } from "openapi-typescript";
import { getJSONFileNameFromUrl } from "../util.ts/get-json-filename-url";
import { getFileJson, isFileExist, isFolderNotExistCreate, renameFile, saveFile } from "./file-handler";
import { fetchJson } from "../util.ts/fetch-json";
import { validateOpaJson } from "../util.ts/validate-opa-json";

export const fileSwagger = async (url: string): Promise<OpenAPI3 | null> => {

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