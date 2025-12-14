import fs from "fs";
import path from "path";

// Create folder if it does not exist
export const isFolderNotExistCreate = (rootFolder: string): string => {
    const folderPath = path.resolve(__dirname, '..', '..', rootFolder);

    // If folder does not exist, create it
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    return folderPath;
}

export const getFileJson = <T>(folderPath: string, filename: string): T | null => {
    const file = getFile(folderPath, filename);

    if (!file) 
        return null;

    try {
        const json = JSON.parse(file);
        return json;
    } catch (error) {
        console.error(`Error parsing JSON from file ${filename}: ${error}`);
        return null;
    }
}


export const getFile = (folderPath: string, filename: string): string | null => {
    if (fs.existsSync(path.join(folderPath, filename))) {
        return fs.readFileSync(path.join(folderPath, filename), 'utf-8');
    }

    return null;
}

export const getFilesInFolder = (folderPath: string): string[] => {
    return fs.readdirSync(folderPath) || [];
}

export const isFileExist = (folderPath: string, filename: string): boolean => {
    return fs.existsSync(path.join(folderPath, filename));
}

export const saveFile = (folderPath: string, filename: string, content: string): void => {
    fs.writeFileSync(path.join(folderPath, filename), content, { encoding: 'utf-8', flag: 'w' });
}

export const renameFile = (folderPath: string, oldFilename: string, newFilename: string): void => {
    fs.renameSync(path.join(folderPath, oldFilename), path.join(folderPath, newFilename));
}

