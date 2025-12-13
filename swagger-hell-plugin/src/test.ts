import { addSwaggerUrl } from './services/swagger-service';

(async () => {
    await addSwaggerUrl('https://petstore3.swagger.io/api/v3/openapi.json')
    // await addSwaggerUrl('https://petstore.swagger.io/v2/swagger.json');
})()
