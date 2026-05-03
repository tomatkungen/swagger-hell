export const getSwaggerEndpointsByNameOperator = /* GraphQL */ `
    query GetSwaggerEndpointsByName($filename: String!) {
        getSwaggerEndpointsByName(filename: $filename)
    }
`;