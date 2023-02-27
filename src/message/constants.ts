const constants ={
    DATABASE_URI: process.env.DATABASE_URL,

    DATABASES:{
        APP: 'room',
    },

    MESSAGES:{
        FETCHED: 'Resource fetched successfully',
        UPDATED: 'Resource updated successfully',
        ERROR:   'Resource error',
        CREATED: 'Resource created successfully',
        DELETED: 'Resource deleted successfully',
        WELCOME: 'Hotel Management api',
        DUPLICATE: 'Email already used',
        REGISTERED: 'User registered successfully',
        LOGIN: 'User logged in successfully',
        REGISTER: 'Please Register',
        UNAUTHORIZED:'Unauthorized information'
    }
}

export default constants