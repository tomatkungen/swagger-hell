import { type OpenAPI3 } from "openapi-typescript";
import { fetchSwagger, fileSwagger } from "../handler/swagger-handler";

// Fetch Swagger JSON from URL
export const addSwaggerUrl = async (url: string): Promise<OpenAPI3 | null> =>
    (await fetchSwagger(url))

// Get Swagger JSON from file
export const getSwaggerByUrl = async (url: string): Promise<OpenAPI3 | null> =>
    (await fileSwagger(url))