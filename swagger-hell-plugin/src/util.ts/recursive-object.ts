export const recursiveObject = (obj: object, func: (key: string, value: string) => void): void => {
    if (typeof obj !== 'object' || !obj) {
        return;
    }

    if (Array.isArray(obj)) {
        obj.map(item => recursiveObject(item, func));
        return;
    }

    for (const [key, value] of Object.entries(obj)) {

        if (value && typeof value === "string") {
            func(key, value);
        }

        if (obj && typeof obj === 'object') {
            recursiveObject((obj as any)[key], func);
        }
    }
}