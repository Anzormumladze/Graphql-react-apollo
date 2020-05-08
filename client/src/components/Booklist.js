import React from 'react';
import {gql} from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`

const BookList = (props) => {
    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data)
  return (
    <div>
        <ul id="book-list">
            <li>   
                <li>Book name</li>
            </li>
        </ul>
    </div>
  );
}

export default BookList
