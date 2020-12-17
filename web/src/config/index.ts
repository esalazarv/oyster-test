const config = {
    app: {
        name: 'Oyster',
    },
    api: {
        host: process.env.REACT_APP_API_HOST || 'http://localhost:3000',
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
