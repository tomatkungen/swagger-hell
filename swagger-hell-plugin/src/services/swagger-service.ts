import { type OpenAPI3 } from "openapi-typescript";
import { endpointsSwagger, fetchSwagger, filenamesSwagger, filenameSwagger, infoSwagger, urlSwagger } from "../handler/swagger-handler";

export type Nullable<T> = T| null

export type SwaggerFileNames = {
    current: string[];
    previous: string[];
}

export type SwaggerInfo = {
    title: Nullable<string>;
    version: Nullable<string>;
    description: Nullable<string>;
}

// Fetch Swagger JSON from URL
export const addSwaggerUrl = async (url: string): Promise<OpenAPI3 | null> =>
    (await fetchSwagger(url))

// Get Swagger JSON by URL
export const getSwaggerByUrl = async (url: string): Promise<OpenAPI3 | null> =>
    (await urlSwagger(url))

// Get Swagger filenames and previous filenames
export const getSwaggerNames = async (): Promise<SwaggerFileNames> => 
    (await filenamesSwagger())

// Get Swagger JSON by filename
export const getSwaggerByName = async (filename: string): Promise<OpenAPI3 | null> =>
    (await filenameSwagger(filename))

// Get Swagger endpoints by filename
export const getSwaggerEndpointsByName = async (filename: string): Promise<string[]> => 
    (await endpointsSwagger(filename))

// Get Swagger info
export const getSwaggerInfoByName = async (filename: string): Promise<SwaggerInfo> => 
    (await infoSwagger(filename))