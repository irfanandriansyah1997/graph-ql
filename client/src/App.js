import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import BookListComponent from "./component/book-list.component";
import FormBookComponent from "./component/form-book.component";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <h1>Book Example</h1>
            <BookListComponent />
            <FormBookComponent />
        </ApolloProvider>
    );
}

export default App;
