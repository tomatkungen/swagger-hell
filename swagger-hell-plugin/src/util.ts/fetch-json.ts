import { validateJson } from "./validate-json";

export const fetchJson = async <T>(url: string): Promise<T | null> => {
    const response = await fetch(url);

    if (!response.ok) {
        console.log(`Failed to fetch Swagger JSON from ${url}: ${response.statusText}`);
        return null;
    }
    try {
        const json = await response.json() as T;

        if (!validateJson(json)) {
            console.log(`Invalid JSON structure from ${url}`);
            return null;
        }

        return json;
    } catch (error) {
        console.log(`Invalid JSON received from ${url}: ${error}`);
        return null;
    }
}