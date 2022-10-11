const { spec } = require('pactum');

const baseUrl = 'https://api-op-stage.thomasmov.xyz';
// const baseUrl = 'https://stageapi.thomasmov.xyz';

it('should get a response with status code 200', async () => {
  const res1 = await spec()
    .post(baseUrl + '/site/login')
    .withJson({
        "LoginForm": {
            "username": "keladmin2",
            "password": "keladmin",
            "rememberMe": 1
        }
    })
    // .inspect()
    .expectStatus(200);

    const token = res1.json.data.token;

    await spec()
        .get(baseUrl + '/can-shu/operator/list')
        .withHeaders('Authorization', 'Bearer ' + token)
        // .inspect()
        .expectStatus(203);

});