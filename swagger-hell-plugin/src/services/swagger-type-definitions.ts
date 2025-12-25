import { typeDefinitionsSwagger, typeDefinitionsSwaggerByEndpoints } from "../handler/type-definitions-handler";
import { Nullable } from "./swagger-service";

type SwaggerDefinitionType = Nullable<string>;
type SwaggerFile = Nullable<string>;

export type SwaggerDefinition = {
    swaggerRaw: SwaggerFile;
    SwaggerDefinitionType: SwaggerDefinitionType;
}

// Get Swagger Type Definitions by filename
export const getSwaggerTypeDefinitions = async (filename: string): Promise<SwaggerDefinition> =>
    (await typeDefinitionsSwagger(filename))

// Get Swagger Type Definitions by filename and endpoints
export const getSwaggerTypeDefinitionsByEndpoints = async (filename: string, endpoints: string[]): Promise<SwaggerDefinition> => 
    (await typeDefinitionsSwaggerByEndpoints(filename, endpoints))