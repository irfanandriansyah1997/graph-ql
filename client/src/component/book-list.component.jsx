import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../query/queries";
import BookDetailComponent from "./book-detail.component";

const BookListComponent = () => {
    const [selected, setSelected] = useState(null);
    const { loading, data } = useQuery(getBooksQuery);

    if (loading) {
        return <div>Loading Books....</div>;
    }

    return (
        <>
            <ul>
                {data.books.map(({ id, name }) => (
                    <li key={id} onClick={() => setSelected(id)}>
                        {name}
                    </li>
                ))}
            </ul>
            <BookDetailComponent id={selected} />
        </>
    );
};

export default BookListComponent;
