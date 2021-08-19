import Banner from '../../components/Banner';
import LayoutArticle from '../../components/LayoutArticle';
import { useState, useEffect } from 'react';
//import { ArticleCard } from '../../../components/Articles';
import { useRouter } from 'next/router';
import client from '../../graphql/uri';
import { GET_POSTS } from '../../graphql/queries';
import AliceCaroussel from '../../components/AliceCaroussel';

export interface IArticles {
	articles: {
		id: string;
		image: string;
		category: string;
		description: string;
		slug: string;
		author?: string;
		node?: any;
	}[];
}
const Recherche = ({ posts }) => {
	const router = useRouter();

	const { name } = router.query;
	const [post, setPosts] = useState(name);
	const [articles, setArticles] = useState<IArticles['articles']>(posts);

	const articlesTwoLines = articles
		.filter((article, key) => key < 9)
		.slice(1, 9);
	const articlesOneLine = articles.filter(
		(article, key) => key >= 6 && key < 10
	);
	const articlesBottom = articles.filter(
		(article, key) => key >= 10 && key < 18
	);

	let findSrc = articles[0].node.content.indexOf('src');
	let findJpg = articles[0].node.content.lastIndexOf('jpg');
	let img = articles[0].node.content.slice(findSrc, findJpg);
	let alt = img.indexOf('alt');
	let src = img.slice(5, alt - 2);
	let srcReplaced = src.replace(
		/http:\/\/environews-rdc.test:82/,
		'https://a1-environews.kinshasadigital.academy/'
	);

	let image = '/assets/not_found.jpg';

	if (
		srcReplaced.startsWith('https://a1-environews.kinshasadigital.academy/')
	) {
		image = srcReplaced;
	}

	let postImgCat =
		(articles[0].node.featuredImage !== null
			? articles[0].node.featuredImage.node.mediaItemUrl
			: `${image}`) || articles[0].node.featuredImage.node.sourceUrl;

	return (
		<div>
			<>
				<Banner
					titre={`${name}`}
					description={articles[0].node.title}
					imageLink={postImgCat}
					link={articles[0].node.uri}
				/>
				<LayoutArticle
					col1={12}
					articleCardSize={3}
					articles={articlesTwoLines}
				/>
				<div className='container my-md-5 my-sm-4 my-3'>
					<AliceCaroussel />
				</div>
				<LayoutArticle
					col1={12}
					articleCardSize={3}
					articles={articlesBottom}
				/>
				)
			</>
		</div>
	);
};

export async function getServerSideProps({ query }) {
	const posts = await client.query({ query: GET_POSTS(query.name) });

	return {
		props: {
			posts: posts.data.posts.edges,
		},
	};
}

export default Recherche;
