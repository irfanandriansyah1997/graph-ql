import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
    addBookMutation,
    getAuthorsQuery,
    getBooksQuery,
} from "../query/queries";

const FormBookComponent = () => {
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [addTodo] = useMutation(addBookMutation);
    const { loading, data } = useQuery(getAuthorsQuery);

    const onSubmitForm = (e) => {
        e.preventDefault();

        addTodo({
            variables: {
                name,
                genre,
                authorId,
            },
            refetchQueries: [
                {
                    query: getBooksQuery,
                },
            ],
        });
    };

    const displayAuthors = () => {
        if (loading) {
            return <option disabled>Loading authors</option>;
        } else if (data) {
            return data.authors.map((author) => {
                return (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                );
            });
        }
    };

    return (
        <form id="add-book" onSubmit={onSubmitForm}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    );
};

export default FormBookComponent;
