import articleStyles from '../styles/Article.module.css';

export interface IComments {
	comments: {
		id: string;
		pseudo: string;
		description: string;
		date: string;
	}[];
}
const Comments = ({ comments }) => {
	const renderComment = () => {
		return (
			<div className={`${articleStyles.comment} ${articleStyles.scroll}`}>
				{comments.map((comment) => (
					<div key={comment.id} className={`mt-3`}>
						<h6 data-testid='pseudo'>{comment.node.author.node.name}</h6>
						<article
							data-testid='description'
							dangerouslySetInnerHTML={{ __html: comment.node.content }}
						/>
						<h6 className='text-muted'>{comment.node.date}</h6>
					</div>
				))}
			</div>
		);
	};

	return <div className={articleStyles.divider}>{renderComment()}</div>;
};

export default Comments;
