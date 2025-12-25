import { OpenAPI3 } from "openapi-typescript";

export const pruneSwaggerComponentRefs = (swaggerFile: OpenAPI3, refs: string[]): void => {
    if (!swaggerFile.components?.schemas)
        return;

    const activeRefs = refs.map((ref) => (
        ref.replace(/^#\//, '').split('/').at(-1) // Remove leading '#/' and split by '/'
    ));

    Object
        .keys(swaggerFile.components.schemas ?? {})
        .forEach((ref) => {
            if (ref && !activeRefs.includes(ref) && swaggerFile.components?.schemas)
                delete swaggerFile.components.schemas[ref];
        });
}