// define your environments with the relevant data as a map
const environments = {
    staging: {
        baseUrl: 'http://localhost:8019',
        admin: 'autoAPI',
    },
    v1: {
        baseUrl: 'http://localhost:8029',
        admin: 'autoAPI',
    },
}

// get the environment name from the command line
// or default to development
const getEnvironmentData = () => {
    const environment = process.env.ENVIRONMENT || 'staging';
    console.log('Using environment: ', environment);
    // get the environment data from the map
    const environmentData = environments[environment];
    return environmentData;
};

// export the environment data
module.exports = {
    environmentData: getEnvironmentData(),
};