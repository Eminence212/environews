import React from 'react';
import { IState as IProps } from '../pages';

import heroStyles from '../styles/Hero.module.css';

const BreakingNews: React.FC<IProps> = ({ breakingNews }) => {
	const renderBreakingNews = (): JSX.Element[] => {
		return breakingNews.map((news) => {
			return (
				<div key={news.id}>
					<div className={heroStyles.breaking_news}>
						<h6 className='text-success'>{news.title}</h6>
						<p>{news.description}</p>
					</div>
				</div>
			);
		});
	};

	return <div>{renderBreakingNews()}</div>;
};

export default BreakingNews;
