import React from 'react';
import BookList from './components/Booklist'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import AddBook from './components/AddBook'

//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList/>
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;