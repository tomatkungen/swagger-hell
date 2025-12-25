import openapiTS, { astToString } from "openapi-typescript";
import { Nullable } from "../services/swagger-service";
import { getSwaggerComponentRefs } from "../util.ts/get-swagger-component-refs";
import { getSwaggerPathRefs } from "../util.ts/get-swagger-path-refs";
import { pruneSwaggerComponentRefs } from "../util.ts/prune-swagger-component-refs";
import { filenameSwagger } from "./swagger-handler";
import { SwaggerDefinition } from "../services/swagger-type-definitions";


export const typeDefinitionsSwagger = async (filename: string): Promise<SwaggerDefinition> => {
    const swaggerFile = await filenameSwagger(filename);

    if (!swaggerFile)
        return { swaggerRaw: null, SwaggerDefinitionType: null };

    const swaggerAst = await openapiTS(swaggerFile);

    return {
        swaggerRaw: JSON.stringify(swaggerFile, null, 2),
        SwaggerDefinitionType: astToString(swaggerAst)
    };
}

export const typeDefinitionsSwaggerByEndpoints = async (filename: string, endpoints: string[]): Promise<SwaggerDefinition> => {
    const swaggerFile = await filenameSwagger(filename);

    if (!swaggerFile)
        return { swaggerRaw: null, SwaggerDefinitionType: null };

    // Prune the swagger file to only include specified endpoints
    swaggerFile.paths = swaggerFile.paths || {};

    // Remove endpoints that do not exist in the swagger file
    swaggerFile.paths = Object.fromEntries(
        Object.entries(swaggerFile.paths)
            .filter(([path]) => endpoints.includes(path))
    );

    // Get all $ref definitions that are used in the remaining paths
    const pathRefs: string[] = getSwaggerPathRefs(swaggerFile);
    console.log('paths:', pathRefs);

    // Get all $ref definition that uar used in the components
    const componentRefs: string[] = pathRefs.reduce<string[]>((prevPathRef, currPathRef) => {
        const refs = new Set<string>();

        getSwaggerComponentRefs(swaggerFile, currPathRef, refs, 0);

        if (refs.size > 0)
            prevPathRef.push(...Array.from(refs));

        return prevPathRef;
    }, []);

    console.log('components:', componentRefs);

    // Prune the components to only include those that are used
    pruneSwaggerComponentRefs(swaggerFile, [...pathRefs, ...componentRefs]);

    // console.log('swaggerile', JSON.stringify(swaggerFile, null, 2));
    // Generate Type Definitions from the pruned swagger file
    const swaggerAst = await openapiTS(swaggerFile);

    return {
        swaggerRaw: JSON.stringify(swaggerFile, null, 2),
        SwaggerDefinitionType: astToString(swaggerAst)
    };
}