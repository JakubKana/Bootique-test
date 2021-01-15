import { setContext } from '@apollo/client/link/context';
import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getToken } from '../storage/auth';

const httpLink = createHttpLink({
    uri: 'https://hiring-backend-2048.herokuapp.com/admin/api',
  });
  
  const authLink = setContext((_, { headers }) => {
     const token = getToken();
     return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  

  export { client as apolloClient }