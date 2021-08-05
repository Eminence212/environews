/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import heroStyles from '../styles/Hero.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import BreakingNews from '../components/BreakingNews';
import Articles, { TopArticle } from '../components/Articles';
import Opportunities from '../components/Opportunities';
import Categories from '../components/Categories';
import client from '../graphql/uri';
import {
	GET_OPPORTUNITIES,
	GET_NEWS,
	GET_PUBS,
	GET_BREAKING_NEWS,
	GET_POSTS_HOME,
} from '../graphql/queries';
import AdSense from 'react-adsense';
import AliceCaroussel from '../components/AliceCaroussel';
import Videos from '../components/Videos';
export interface IState {
	breakingNews: {
		title: string;
		node: any;
	}[];
}

export interface IArticles {
	articles: {
		node: any;
	}[];
}

export interface IOpportunities {
	opportunities: {
		node: any;
	}[];
}

export default function Home({
	opportunities,
	news,
	pubs,
	breakingNews,
	artcleByCategorySante,
	artcleByCategoryBiodiversite,
	artcleByCategoryEnvironnement,
}) {
	const [breakingNews_, setBreakingNews] =
		useState<IState['breakingNews']>(breakingNews);

	const [articles, setArticles] = useState<IArticles['articles']>(news);
	const filteredArticles = articles.filter((item, key) => key < 4);
	const topArcticles = articles.slice(5, 10);

	let randomId = Math.floor(Math.random() * 20);
	const Toparticle = articles.filter((value, key, array) => key == 19);

	const [opportunities_, setOpportunities] =
		useState<IOpportunities['opportunities']>(opportunities);

	const handleDragStart = (e) => e.preventDefault();

	const items = [
		<Image
			key={1}
			src='/assets/image.webp'
			width={800}
			height={150}
			onDragStart={handleDragStart}
			alt='ad'
		/>,
		<Image
			key={2}
			src='/assets/image2.webp'
			width={800}
			height={150}
			onDragStart={handleDragStart}
			alt='ad'
		/>,
		<Image
			key={3}
			src='/assets/image3.webp'
			width={800}
			height={150}
			onDragStart={handleDragStart}
			alt='ad'
		/>,
	];

	return (
		<div>
			<Head>
				<title>Environews RDC</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
				<script
					data-ad-client='ca-pub-2034102263729175'
					async
					src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
			</Head>

			<div className='container'>
				<div className={`row ${heroStyles.hero}`}>
					<div className='col-md-8 col-sm-12'>
						<div className={heroStyles.topNews}>
							<AliceCaroussel />
							<br />
							<br />
							<Link
								href='/[annee]/[mois]/[jour]/[slug]'
								as={`${Toparticle[0].node.uri}`}>
								<a style={{ color: 'inherit' }}>
									<h5
										className={`border-start px-3 border-success border-5 ${heroStyles.title}`}>
										{Toparticle[0].node.title.split(':').length == 2
											? Toparticle[0].node.title.split(':')[0]
											: 'Environews'}
									</h5>
									<img
										src={`${Toparticle[0].node.featuredImage.node.sourceUrl}`}
										alt={Toparticle[0].node.title}
										className='w-100'
										style={{ objectFit: 'cover' }}
									/>

									<h4>
										{Toparticle[0].node.title.split(':').length == 2
											? Toparticle[0].node.title.split(':')[1]
											: Toparticle[0].node.title.split(':')[0] + '.'}
									</h4>
								</a>
							</Link>
						</div>
						<br />
						<br />
						<Articles articles={filteredArticles} />
					</div>
					<div className='col-md-4 col-sm-12'>
						<BreakingNews breakingNews={breakingNews_} />
						<div className={heroStyles.pub}>
							<iframe
								title='OTFF 2021'
								width='100%'
								height='250'
								src='https://www.youtube.com/embed/wuhqkNhZQ78?autoplay=1&amp;mute=0'
								frameBorder='0'></iframe>
						</div>
						<Opportunities opportunities={opportunities_} />
					</div>
				</div>

				<Categories
					articles={artcleByCategoryEnvironnement}
					title='environement'
				/>
				<Categories
					articles={artcleByCategoryBiodiversite}
					title='biodiversite'
				/>
				<Categories articles={artcleByCategorySante} title='sante' />
			</div>
			<Videos title='Environews TV' />
			<div className='container'>
				<div className='row py-5'>
					<div className={`col-md-6 col-sm-12 px-3 ${heroStyles.editorChoice}`}>
						<h5 className='border-start px-2 mb-4 border-success border-5'>
							CHOIX DE L’EDITEUR
						</h5>
						<div className={heroStyles.editorChoiceContainer}>
							<Articles articles={filteredArticles} />
						</div>
					</div>
					<div
						className={`col-md-5 col-sm-12 px-3 ${heroStyles.similarContainer}`}>
						<h5 className='border-start px-2 border-success border-5'>
							TOP ARTICLES
						</h5>
						<div>
							{topArcticles.map((article, index) => (
								<TopArticle
									key={article.node.id}
									article={article}
									index={index}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className={`mt-4 ${heroStyles.newsLetter}`}>
				<h3>NEWSLETTER</h3>
				<form>
					<input
						className='form-control form-control-lg'
						type='email'
						placeholder='Adresse Email'></input>
					<p>
						Inscrivez-vous à notre newsletter pour vous tenir au courant de nos
						activités.
					</p>
					<button>S'INSCRIRE</button>
				</form>
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const opportunities = await client.query({ query: GET_OPPORTUNITIES });
	const news = await client.query({ query: GET_NEWS });
	const pubs = await client.query({ query: GET_PUBS });
	const breakingNews = await client.query({ query: GET_BREAKING_NEWS });
	const artcleByCategorySante = await client.query({
		query: GET_POSTS_HOME('sante'),
	});
	const artcleByCategoryEnvironnement = await client.query({
		query: GET_POSTS_HOME('environnement'),
	});
	const artcleByCategoryBiodiversite = await client.query({
		query: GET_POSTS_HOME('biodiversite'),
	});

	return {
		props: {
			news: news.data.posts.edges,
			pubs: pubs.data.publicites.edges,
			opportunities: opportunities.data.posts.edges,
			breakingNews: breakingNews.data.breakingNews.edges,
			artcleByCategoryBiodiversite:
				artcleByCategoryBiodiversite.data.posts.edges,
			artcleByCategoryEnvironnement:
				artcleByCategoryEnvironnement.data.posts.edges,
			artcleByCategorySante: artcleByCategorySante.data.posts.edges,
		},
	};
}
