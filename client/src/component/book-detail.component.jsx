import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../query/queries";

const BookDetailComponent = ({ id }) => {
    const { loading, data } = useQuery(getBookQuery, {
        variables: {
            id,
        },
    });

    if (loading) {
        return <div>Loading Books Detail ....</div>;
    }

    if (data && data.book) {
        const { book } = data;
        const { name, genre, author } = book;
        return (
            <div>
                <h2>{name}</h2>
                <p>{genre}</p>
                <p>{author.name}</p>
                <p>All books by this author:</p>
                <ul className="other-books">
                    {author.books.map((item) => {
                        return <li key={item.id}>{item.name}</li>;
                    })}
                </ul>
            </div>
        );
    }

    return null;
};

export default BookDetailComponent;
