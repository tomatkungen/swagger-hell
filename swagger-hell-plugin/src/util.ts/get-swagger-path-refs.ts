import { OpenAPI3 } from "openapi-typescript";
import { recursiveObject } from "./recursive-object";

export const getSwaggerPathRefs = (swaggerFile: OpenAPI3): string[] => {
    const usedPathRefs = new Set<string>();

    recursiveObject(swaggerFile.paths || {}, (key, value) => {
        key === '$ref' && usedPathRefs.add(value);
    })

    return Array.from(usedPathRefs);
}