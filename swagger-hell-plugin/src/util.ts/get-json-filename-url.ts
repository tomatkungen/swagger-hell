export const getJSONFileNameFromUrl = (url: string): string => {
    const urlObj = new URL(url);

    const hostName = urlObj.hostname.replace(/\./g, '-');
    const pathname = urlObj.pathname.split('/').filter(Boolean).join('-');

    const fileName = `${hostName !== "" ? `${hostName}-` : ''}${pathname || 'root'}`;

    return fileName.endsWith('.json') ?
        fileName.toLowerCase() :
        `${fileName}.json`.toLowerCase();
}