import { graphql } from "graphql";
import { rootValue, schema } from "./resolver/resolver";

(async () => {
    const query = /* GraphQL */ `
        query {
            getSwaggerNames {
                current
                previous
            }
        }
    `
    const res = await graphql({
        schema,
        source: query,
        rootValue,
        variableValues: null
    });

    console.log('query', JSON.stringify(res));

    const mutaion = /* GraphQL */ `
        mutation AddSwaggerUrl($url: String!) {
            addSwaggerUrl(url: $url)
        }
    `
    const resMut = await graphql({
        schema,
        source: mutaion,
        rootValue,
        variableValues: { url: 'https://petstore3.swagger.io/api/v3/openapi.json' }
    });

    console.log('mutation', JSON.stringify(resMut));
})();