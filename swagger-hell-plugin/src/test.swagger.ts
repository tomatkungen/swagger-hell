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

    console.log(JSON.stringify(res));
})();