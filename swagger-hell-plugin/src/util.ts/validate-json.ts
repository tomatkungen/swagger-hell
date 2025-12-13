export const validateJson = <T>(json: T): boolean => {
    try {
        JSON.stringify(json);
        return true;
    } catch {
        return false;
    }
}