import React from 'react';
import { IState as IProps } from '../pages';

import heroStyles from '../styles/Hero.module.css';

const BreakingNews: React.FC<IProps> = ({ breakingNews }) => {
	const renderBreakingNews = (): JSX.Element[] => {
		const filteredBreakingNews = breakingNews.filter((item, key) => key < 5);
		return filteredBreakingNews.map((news) => {
			return (
				<div key={news.id} className={heroStyles.dashed_border_breaking}>
					<div className={heroStyles.breaking_news}>
						<h6 data-testid='title' className={heroStyles.breaking_news__title}>
							{news.node.title.split(':').length == 2
								? news.node.title.split(':')[0]
								: null}
						</h6>
						<p className={heroStyles.breaking_news__paragraph}>
							{news.node.title.split(':').length == 2
								? news.node.title.split(':')[1]
								: news.node.title.split(':')[0]}
						</p>
					</div>
				</div>
			);
		});
	};

	return (
		<div>
			<h5
				data-testid='title-breaking-news'
				className={`border-start px-3 border-success border-5 ${heroStyles.title}`}>
				BREAKING NEWS
			</h5>
			<div className={`border-start px-3 border-success border-2 `}>
				{renderBreakingNews()}
			</div>
		</div>
	);
};

export default BreakingNews;
