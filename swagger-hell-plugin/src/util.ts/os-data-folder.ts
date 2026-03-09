import os from 'node:os';
import process from 'node:process';
import path from 'node:path';

export const osDataFolder = (folderName: string): string => {
    const homedir = os.homedir();

    // Macos
    if (process.platform === 'darwin')
        return path.join(homedir, "Library", "Application Support", folderName); 

    // Windows
    if (process.platform === 'win32')
        return path.join(homedir, 'AppData', 'Local', folderName, 'Data');

    // Linux
    return path.join(homedir, '.local', 'share', folderName);
}