import React from 'react';
import {gql} from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}
`

const AddBook = () => {
    const { loading, error, data,...props } = useQuery(getAuthorsQuery);
    if (loading) return <option disabled>Loading...</option>;
    if (error) return <option>Error :(</option>;
    console.log(data.authors)
    console.log(props)
  return (
    <form id="add-book">
        <div className="field">
            <label>Book name:</label>
            <input type="text" />
        </div>
        <div className="field">
            <label>Genre</label>
            <input type="text" />
        </div>
        <div className="field">
            <label>Author</label>
            <select>
                {data.authors?data.authors.map((el)=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                }):null}
            </select>
        </div>
        <button>+</button>
    </form>
  );
}

export default AddBook
