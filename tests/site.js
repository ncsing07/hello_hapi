const { spec, request, e2e } = require('pactum');
const { environmentData } = require('./config/env');

before(() => {
    request.setBaseUrl(environmentData.baseUrl);
});

let token = '';

it('should get a response with status code 200', async () => {

    let random = (Math.random() + 1).toString(36).substring(3);

    const login = await spec()
        .post('/site/login')
        .withJson({
            'username': environmentData.admin,
            'password': environmentData.admin,
        })
        .inspect()
        .expectStatus(200);

    token = login.json.data.token;

    const post = await spec()
        .post('/site/create-post')
        .withHeaders('Authorization', 'Bearer ' + token)
        .withJson({
            'title': random,
            'body': 'Here is ' + random + ' body',
        })
        .inspect()
        .expectStatus(200);

    await spec()
        .get('/site/view-post?id={id}')
        .withHeaders('Authorization', 'Bearer ' + token)
        .withPathParams('id', post.json.data.id)
        .inspect()
        .expectStatus(200)
        .expectJson({
            'status': 200,
            'message': 'Data Found',
            'data': {
                'body': post.json.data.body,
                'id': post.json.data.id,
                'title': post.json.data.title
            }
        });
});



// let token = '';

// it('should get a response with status code 200', async () => {
//     const response = await spec()
//         .post('/site/login')
//         .withJson({
//             'username': environmentData.admin,
//             'password': environmentData.admin,
//         })
//         .inspect()
//         .expectStatus(200);
  
//     token = response.json.data.token;
  
//     await spec()
//         .get('/site/index')
//         .withHeaders('Authorization', 'Bearer ' + token)
//         .inspect()
//         .expectStatus(200);
// });

// before(async () => {
//     request.setBaseUrl(environmentData.baseUrl);
//     // const response = await spec().post('/site/login').withJson({
//     //     'username': environmentData.admin,
//     //     'password': environmentData.admin,
//     // }).expectStatus(200);
//     // token = response.json.data.token;
// });

// it('should get a response with status code 200', async () => {

//     // let username = (Math.random() + 1).toString(36).substring(4);

//     // const signup = await spec()
//     //     .get(baseUrl + '/site/signup')
//     //     .withJson({
//     //         'username': username,
//     //         'password': username,
//     //         'email': username + '@test.com'
//     // })
//     // .inspect()
//     // .expectStatus(200);

//     const login = await spec()
//         .post('/site/login')
//         .withJson({
//             'username': environmentData.admin,
//             'password': environmentData.admin,
//     })
//     .inspect()
//     .expectStatus(200);

//     token = login.json.data.token;

//     // console.log(token);

//     // module.exports = { token : token };


//     // var post = require('./post/default');
//     // console.log(post);

//     await spec()
//         .get('/site/index')
//         .withHeaders('Authorization', 'Bearer ' + token)
//         .expectStatus(200);
// });




