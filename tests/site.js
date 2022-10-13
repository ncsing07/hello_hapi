const { spec, request } = require('pactum');
const { environmentData } = require('./config/env.js');

before(() => {
    request.setBaseUrl(environmentData.baseUrl);
});

it('should get a response with status code 200', async () => {

    // let username = (Math.random() + 1).toString(36).substring(4);

    // const signup = await spec()
    //     .get(baseUrl + '/site/signup')
    //     .withJson({
    //         'username': username,
    //         'password': username,
    //         'email': username + '@test.com'
    // })
    // .inspect()
    // .expectStatus(200);

    const login = await spec()
        .post('/site/login')
        .withJson({
            'username': environmentData.admin,
            'password': environmentData.admin,
    })
    .expectStatus(200);

    const token = login.json.data.token;

    await spec()
        .get('/site/view')
        .withHeaders('Authorization', 'Bearer ' + token)
        .expectStatus(200);
});


// require('./posts/default.js')(token);


