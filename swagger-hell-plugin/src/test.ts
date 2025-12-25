// import { /*addSwaggerUrl, getSwaggerNames,*/ getSwaggerByUrl } from './services/swagger-service';

import { typeDefinitionsSwaggerByEndpoints } from "./handler/type-definitions-handler";
import { getSwaggerByName, getSwaggerEndpointsByName, getSwaggerInfoByName } from "./services/swagger-service";
import { getSwaggerTypeDefinitions } from "./services/swagger-type-definitions";

(async () => {
    // await addSwaggerUrl('https://petstore.swagger.io/v2/swagger.json');
    // await addSwaggerUrl('https://petstore3.swagger.io/api/v3/openapi.json');
    // const swaggers = await getSwaggerNames();
    // const swaggers = await getSwaggerByUrl('https://petstore3.swagger.io/api/v3/openapi.json');

    // const swaggers = await getSwaggerByName('petstore3-swagger-io-api-v3-openapi');
    // console.log(swaggers);
    
    // const swaggers2 = await getSwaggerEndpointsByName('petstore3-swagger-io-api-v3-openapi');
    // console.log(swaggers2);

    // const swaggers3 = await getSwaggerInfoByName('petstore3-swagger-io-api-v3-openapi');
    // console.log(swaggers3);

    // const swaggers4 = await getSwaggerTypeDefinitions("petstore3-swagger-io-api-v3-openapi");
    // console.log(swaggers4);

    const _swaggers5 = await typeDefinitionsSwaggerByEndpoints("petstore3-swagger-io-api-v3-openapi", ["/pet", "/user"]);
    // console.log(swaggers5);
})()
