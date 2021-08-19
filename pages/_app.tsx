import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import Layout from '../components/Layout';
import { ApolloProvider } from '@apollo/client';
import client from '../graphql/uri';

const MyApp = ({ Component, pageProps }) => {
	return (
		<Layout>
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
		</Layout>
	);
};

export default MyApp;
