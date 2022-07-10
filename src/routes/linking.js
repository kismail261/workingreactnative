const config = {
    screens: {
        mainRoutes: {
            path: 'home',
            screens: {
                bottomTab: {
                    path: 'listing',
                },
            },
        },
    },
}


const linking = {
    prefixes: ['https://dev.sporforya.com'],
    config: config,
};

export default linking;