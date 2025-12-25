import { OpenAPI3 } from "openapi-typescript";
import { getObjectByRefs } from "./get-object-by-propertys";
import { recursiveObject } from "./recursive-object";

export const getSwaggerComponentRefs = (swaggerFile: OpenAPI3, pathRef: string, refs: Set<string>, index: number): void => {
    const objComponentRef = getObjectByRefs(swaggerFile, pathRef);

    if (!objComponentRef || index > 10)
        return;

    console.log(new Array(index + 1).join(' '), pathRef);
    recursiveObject(objComponentRef, (key, value) => {
        if (key === '$ref' && typeof value === 'string') {
            refs.add(value);
            getSwaggerComponentRefs(swaggerFile, value, refs, index + 1);
            // Add logic here to collect nested refs if needed
        }
    })
}

