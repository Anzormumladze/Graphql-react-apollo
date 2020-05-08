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

const BookList = () => {
    const { loading, error, data,...props } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data.books)
    console.log(props)
  return (
    <div>
        <ul id="book-list">
            {
                data.books.map((el)=>{
                    return <li key={el.id}>{el.name}</li>
                })
            }
        </ul>
    </div>
  );
}

export default BookList
