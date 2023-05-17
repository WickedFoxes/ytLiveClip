module.exports = (() => {
    return{
        real : {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'password',
            database: 'ytlive'
        },
        local : {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'password',
            database: 'ytlive'
        },
        dev: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        }
    }
})();