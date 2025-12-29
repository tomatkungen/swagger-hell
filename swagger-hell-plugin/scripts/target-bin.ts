/**
 * CLi to get target
 * 
 * rustc -Vv | grep host | cut -f2 -d' ' -> host: aarch64-apple-darwin -> aarch64-apple-darwin (macos)
 * rustc -Vv | Select-String "host:" | ForEach-Object {$_.Line.split(" ")[1]} (win) 
 */


import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const extension = process.platform === 'win32' ? '.exe' : '';
const platform = process.platform;

const rustInfo = execSync('rustc -vV').toString();
const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];

if (!targetTriple) {
    console.error('Failed to determine platform target triple');
}

const rename = (
    os: 'macos' | 'linux' | 'win',
    ext: '.exe' | '',
    target: string,
) => {

    const rootPathFile = path.join(__dirname, '..', 'bin', `inter-process-communication-${os}${ext}`)
    const pathFolder = path.join(__dirname, '..', '..', 'swagger-hell', 'src-tauri', 'bin')
    const copyPathFile = path.join(__dirname, '..', '..', 'swagger-hell', 'src-tauri', 'bin', `inter-process-communication-${os}${ext}`)
    const renamePathFile = path.join(__dirname, '..', '..', 'swagger-hell', 'src-tauri', 'bin', `inter-process-communication-${target}${ext}`)

    // Create Destination folder if not exists
    if (!fs.existsSync(pathFolder))
        fs.mkdirSync(pathFolder);

    // Copy
    fs.copyFileSync(rootPathFile, copyPathFile);

    console.log(`Target: ${target}`)
    console.log(`Destination: ${renamePathFile}`)

    // Rename
    fs.renameSync(copyPathFile, renamePathFile);
}

platform === 'linux' && rename('linux', extension, targetTriple);
platform === 'darwin' && rename('macos', extension, targetTriple);
platform === 'win32' && rename('win', extension, targetTriple);



