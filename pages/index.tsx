/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import heroStyles from '../styles/Hero.module.css';
import articleStyles from '../styles/Article.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import BreakingNews from '../components/BreakingNews';
import Articles, { TopArticle } from '../components/Articles';
import Opportunities from '../components/Opportunities';
import Categories from '../components/Categories';
import client from '../graphql/uri';
import AdSense from 'react-adsense';
import {
	GET_OPPORTUNITIES,
	GET_NEWS,
	GET_PUBS,
	GET_BREAKING_NEWS,
	GET_POSTS,
} from '../graphql/queries';
import AliceCarousel from 'react-alice-carousel';

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
	const filteredArticlesSix = articles.filter((item, key) => key < 4);
	const filteredArticlesEnvironments = artcleByCategoryEnvironnement.filter(
		(item, key) => key < 4
	);
	const filteredArticlesSante = artcleByCategorySante.filter(
		(item, key) => key < 4
	);
	const filteredArticlesBiodiversite = artcleByCategoryBiodiversite.filter(
		(item, key) => key < 4
	);
	let randomId = Math.floor(Math.random() * 20);
	const article = articles.filter((value, key) => key == randomId);

	const pointsPos = article[0].node.title.indexOf(':');

	const getCat = article[0].node.title.slice(0, pointsPos).toUpperCase();

	const deleteCat = article[0].node.title.slice(pointsPos + 1);

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
			</Head>

			<div className='container'>
				<div className={`row ${heroStyles.hero}`}>
					<div className='col-md-8 col-sm-12'>
						<div className={heroStyles.topNews}>
							<AliceCarousel
								mouseTracking
								items={items}
								infinite
								disableDotsControls
								disableButtonsControls
								autoPlay
								animationDuration={10000}
							/>
							<br />
							<br />
							<Link
								href='/[annee]/[mois]/[jour]/[slug]'
								as={`${article[0].node.uri}`}>
								<a style={{ color: 'inherit' }}>
									<h5
										className={`border-start px-3 border-success border-5 ${heroStyles.title}`}>
										{getCat}
									</h5>
									<img
										src={`${article[0].node.featuredImage.node.sourceUrl}`}
										alt={article[0].node.title}
										className='w-100'
										style={{ objectFit: 'cover' }}
									/>

									<h4>{deleteCat}</h4>
								</a>
							</Link>
						</div>
						<br />
						<br />
						<Articles articles={filteredArticlesSix} />
					</div>
					<div className='col-md-4 col-sm-12'>
						<BreakingNews breakingNews={breakingNews_} />
						<br />
						<Opportunities opportunities={opportunities_} />
						<br />
						<div className={heroStyles.pub}></div>
					</div>
				</div>

				<Categories
					articles={filteredArticlesEnvironments}
					title='environement'
				/>
				<Categories
					articles={filteredArticlesBiodiversite}
					title='biodiversite'
				/>
				<Categories articles={filteredArticlesSante} title='sante' />
			</div>
			<div className={`col-md-12 p-5 ${heroStyles.environews_tv}`}>
				<div className='container'>
					<h5
						className={`border-start px-2 mb-5 border-success border-5 ${heroStyles.tv_title}`}>
						ENVIRONEWS TV
					</h5>
					<div className='row'>
						<div className='col-md-7 col-sm-12'>
							<div className={heroStyles.video_responsive}>
								<iframe
									width='853'
									height='480'
									src={`https://www.youtube.com/embed/YkmSQZP7bn8`}
									frameBorder='1'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
									title='Embedded youtube'
								/>
							</div>
						</div>
						<div className='col-md-4 col-sm-12'>
							<div className='row'>
								<div className='col-md-4'>
									<iframe
										width='120'
										height='90'
										src={`https://www.youtube.com/embed/YkmSQZP7bn8`}
										frameBorder='1'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										allowFullScreen
										title='Embedded youtube'
									/>
								</div>
								<div className='col-md-8'>
									<p>
										Le Parc national de Kahuzi-Biega détient désormais 60% de la
										population mondiale des gorilles de Grauer
									</p>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-4'>
									<iframe
										width='120'
										height='90'
										src={`https://www.youtube.com/embed/YkmSQZP7bn8`}
										frameBorder='1'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										allowFullScreen
										title='Embedded youtube'
									/>
								</div>
								<div className='col-md-8'>
									<p>
										Le Parc national de Kahuzi-Biega détient désormais 60% de la
										population mondiale des gorilles de Grauer
									</p>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-4'>
									<iframe
										width='120'
										height='90'
										src={`https://www.youtube.com/embed/YkmSQZP7bn8`}
										frameBorder='1'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										allowFullScreen
										title='Embedded youtube'
									/>
								</div>
								<div className='col-md-8'>
									<p>
										Le Parc national de Kahuzi-Biega détient désormais 60% de la
										population mondiale des gorilles de Grauer
									</p>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-4'>
									<iframe
										width='120'
										height='90'
										src={`https://www.youtube.com/embed/YkmSQZP7bn8`}
										frameBorder='1'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										allowFullScreen
										title='Embedded youtube'
									/>
								</div>
								<div className='col-md-8'>
									<p>
										Le Parc national de Kahuzi-Biega détient désormais 60% de la
										population mondiale des gorilles de Grauer
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='container'>
				<div className='row py-5'>
					<div className={`col-md-6 col-sm-12 px-3 ${heroStyles.editorChoice}`}>
						<h5 className='border-start px-2 border-success border-5'>
							CHOIX DE L’EDITEUR
						</h5>
						<div className={heroStyles.editorChoiceContainer}>
							<Articles articles={filteredArticlesSix} />
						</div>
					</div>
					<div
						className={`col-md-5 col-sm-12 px-3 ${articleStyles.similarContainer}`}>
						<h5 className='border-start px-2 border-success border-5'>
							TOP ARTICLES
						</h5>
						<div>
							{filteredArticlesSix.map((article, index) => (
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
						placeholder='Email Address'></input>
					<p>
						Inscrivez-vous à notre newsletter pour vous tenir au courant de nos
						activités.
					</p>
					<button className='btn btn-success'>S'INSCRIRE</button>
				</form>
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	const opportunities = await client.query({ query: GET_OPPORTUNITIES });
	const news = await client.query({ query: GET_NEWS });
	const pubs = await client.query({ query: GET_PUBS });
	const breakingNews = await client.query({ query: GET_BREAKING_NEWS });
	const artcleByCategorySante = await client.query({
		query: GET_POSTS('sante'),
	});
	const artcleByCategoryEnvironnement = await client.query({
		query: GET_POSTS('environnement'),
	});
	const artcleByCategoryBiodiversite = await client.query({
		query: GET_POSTS('biodiversite'),
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
