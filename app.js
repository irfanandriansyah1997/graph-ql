const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(
    '/graph',
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen(3000, () => {
    console.log('now listing in port 3000');
});
