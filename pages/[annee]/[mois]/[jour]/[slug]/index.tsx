/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import articleStyles from '../../../../../styles/Article.module.css';
import Image from 'next/image';
import Comments from '../../../../../components/Comment';
import { GetServerSideProps } from 'next';
import {
	FaFacebookSquare,
	FaInstagramSquare,
	FaLinkedinIn,
	FaTwitter,
	FaYoutubeSquare,
	FaCalendar,
	FaEye,
	FaRegUser,
	FaWhatsappSquare,
} from 'react-icons/fa';

import {
	FacebookShareButton,
	FacebookIcon,
	LinkedinIcon,
	LinkedinShareButton,
	TwitterIcon,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from 'react-share';
import Link from 'next/link';
import client from '../../../../../graphql/uri';
import {
	GET_NEWS,
	GET_POSTS_SLUG,
	INSERT_COMMENT,
} from '../../../../../graphql/queries';
import { IArticles } from '../../../../categories/[name]/index';
import { SimilarArticle } from '../../../../../components/Articles';
import { useMutation } from '@apollo/client';

export interface IComments {
	comments: {
		id: string;
		pseudo: string;
		description: string;
		date: string;
	}[];
}

const Article = ({ article, news }) => {
	const [coudlAppear, setCouldAppear] = useState(false);
	const [pseudoComment, setPseudo] = useState('');
	const [comment, setComment] = useState('');
	const idPost = article.databaseId;

	const handleChange = (event) => {
		setPseudo(event.target.value);
	};
	const handleChangeComment = (event) => {
		setComment(event.target.value);
	};

	const [insertMutation] = useMutation(
		INSERT_COMMENT(idPost, pseudoComment, comment)
	);

	const handleSubmit = (e) => {
		insertMutation();
		setComment('');
		setPseudo('');
		setCouldAppear(true);
		e.preventDefault();
	};

	if (coudlAppear) {
		setTimeout(() => {
			setCouldAppear(false);
		}, 2000);
	}

	let deleteFig = article.content.replace(
		/(figure|img)/,
		'$1 style="display:none"'
	);
	const content = deleteFig.replace(
		/(style='width:44px;left: -10px;top: 100px;-webkit-box-shadow:none;box-shadow:none;')/,
		`style='display:none'`
	);

	const findSrc = article.content.indexOf('src');
	const findJpg = article.content.lastIndexOf('jpg');
	const img = article.content.slice(findSrc, findJpg);
	const alt = img.indexOf('alt');
	const src = img.slice(5, alt - 2);
	const srcReplaced = src.replace(
		/http:\/\/environews-rdc.test:82/,
		'https://a1-environews.kinshasadigital.academy/'
	);

	let image = '/assets/not_found.jpg';

	if (
		srcReplaced.startsWith('https://a1-environews.kinshasadigital.academy/')
	) {
		image = srcReplaced;
	}

	const [comments, setComments] = useState<IComments['comments']>([
		{
			id: '34',
			pseudo: ' Beni Mampunina',
			description: 'This is what you want I guess',
			date: '24th july 2012',
		},
		{
			id: '35',
			pseudo: ' Beni Mampunina',
			description: 'This is what you want I guess',
			date: '24th july 2012',
		},
		{
			id: '36',
			pseudo: ' Beni Mampunina',
			description: 'This is what you want I guess',
			date: '24th july 2012',
		},
	]);

	const [articles, setArticles] = useState<IArticles['articles']>(news);
	const filteredArticlesSix = articles.filter((item, key) => key < 4);
	//console.log('les commentaires ', article.databaseId);

	return (
		<div className={`container ${articleStyles.articleContent}`}>
			<h4 className='border-start px-3 border-success border-5'>
				{article.title.split(':').length === 2
					? article.title.split(':')[0].toUpperCase()
					: 'Environews'}
			</h4>
			<h5 className={articleStyles.articleTitle}>
				{article.title.split(':').length === 2
					? article.title.split(':')[1]
					: article.title.split(':')[0]}
			</h5>
			<div className='row'>
				<div className='col-md-9 col-sm-12'>
					<img
						src={
							article.featuredImage === null
								? `${image}`
								: article.featuredImage.node.mediaItemUrl
						}
						alt={article.title}
						className='w-100'
						height={500}
						style={{ objectFit: 'cover' }}
					/>
					<div className={articleStyles.tags}>
						<li>
							<FaRegUser /> {article.author.node.name}
						</li>
						<li>
							<FaCalendar /> {new Date(article.date).toLocaleString()}
						</li>
						<li>
							<FaEye /> {article.commentCount}
						</li>
					</div>

					<div className={articleStyles.socialContainer}>
						<FacebookShareButton
							className={articleStyles.social}
							url={`http://localhost:3000/${article.uri}`}
							quote={article.title + ' A lire sur notre site'}>
							<FacebookIcon size={30} />
						</FacebookShareButton>

						<TwitterShareButton
							url={`http://localhost:3000/${article.uri}`}
							className={articleStyles.social}
							title={article.title}
							via='environews_rdc'>
							<TwitterIcon size={30} />
						</TwitterShareButton>

						<WhatsappShareButton
							url={`http://localhost:3000/${article.uri}`}
							className={articleStyles.social}
							title={'' + article.title}
							separator=': '>
							<WhatsappIcon size={30} />
						</WhatsappShareButton>
					</div>
					<br />

					<article dangerouslySetInnerHTML={{ __html: content }}></article>

					<div className={`row ${articleStyles.footer}`}>
						<div className='col-md-5 col-sm-12'>
							<h4 className='border-start px-2 border-success border-5'>
								LAISSER UN COMMENTAIRE
							</h4>
							<form
								className={articleStyles.form}
								onSubmit={(event) => {
									handleSubmit(event);
								}}>
								<input
									className='form-control form-control-lg'
									type='text'
									placeholder='Pseudo'
									value={pseudoComment}
									onChange={(event) => {
										handleChange(event);
									}}
								/>
								<textarea
									className='form-control'
									placeholder='Commentaire'
									value={comment}
									onChange={(event) => {
										handleChangeComment(event);
									}}></textarea>
								<button className='btn btn-success' type='submit'>
									Envoyer
								</button>

								{coudlAppear && (
									<h6 className='alert alert-success mt-4'>
										Votre commentaire à été envoyé avec success
									</h6>
								)}
							</form>
						</div>
						<div className='col-md-1 col-sm-12'></div>
						<div className='col-md-6 col-sm-12'>
							<h4 className='border-start px-2 border-success border-5'>
								DERNIERS COMMENTAIRES
							</h4>
							{article.comments.edges.length == 0 ? (
								<h4 className='text-success mt-5'>Aucun commentaire</h4>
							) : (
								<Comments comments={article.comments.edges} />
							)}
						</div>
					</div>
				</div>
				<div className='col-md-3 col-sm-12'>
					<div className={`${articleStyles.similarContainer}`}>
						<h6 className='border-start px-2 border-success border-5'>
							A LIRE AUSSI
						</h6>
						{filteredArticlesSix.map((article) => (
							<SimilarArticle key={article.node.id} article={article} />
						))}
					</div>
					<div className={articleStyles.newsLetter}>
						<h3>NEWSLETTER</h3>
						<form>
							<input
								className='form-control form-control-lg'
								type='email'
								placeholder='Adresse Email'></input>
							<p>
								Inscrivez-vous à notre newsletter pour vous tenir au courant de
								nos activités.
							</p>
							<button>S'INSCRIRE</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Article;

export const getServerSideProps = async (context) => {
	const article = await client.query({
		query: GET_POSTS_SLUG(context.params.slug),
	});
	const news = await client.query({ query: GET_NEWS });

	return {
		props: {
			article: article.data.post,
			news: news.data.posts.edges,
		},
	};
};
