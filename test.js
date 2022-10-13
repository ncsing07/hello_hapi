const { spec } = require('pactum');

// const baseUrl = 'https://api-op-stage.thomasmov.xyz';
const baseUrl = 'http://localhost:8019';

it('should get a response with status code 200', async () => {
  const res1 = await spec()
    .get(baseUrl + '/site/signup')
    .withJson({
        "username": "keladmin2",
        "password": "keladmin",
        "email": "keladmin@test.com"
    })
    .inspect()
    .expectStatus(200);

    // const token = res1.json.data.token;

    // await spec()
    //     .get(baseUrl + '/can-shu/operator/list')
    //     .withHeaders('Authorization', 'Bearer ' + token)
    //     // .inspect()
    //     .expectStatus(200);

});
