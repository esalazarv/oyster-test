const config = {
    app: {
        name: 'Oyster',
    },
    api: {
        host: '/api',
        timeout: 5000,
    },
    auth: {
        refresh: {
            timeInterval:  20,
            timeOffset: 10,
            maxAttempts: 3,
        },
    },
};

export default config;
