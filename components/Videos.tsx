import heroStyles from '../styles/Hero.module.css';

const Videos = ({ title, videos }) => {
	const recentVideoId = videos[0].node.lien_youtube.lienYoutube.replace(
		/^https:\/\/youtu.be\/([a-z0-9]+)\?(.)+$/i,
		'$1'
	);
	return (
		<div className={`col-md-12 ${heroStyles.environews_tv}`}>
			<div className='container'>
				<h5
					className={`border-start px-2 mb-3 border-success border-5 ${heroStyles.tv_title}`}>
					{title}
				</h5>
				<div className='row'>
					<div className='col-lg-7 col-md-12 col-sm-12'>
						<div className={heroStyles.video_responsive}>
							<iframe
								width='100%'
								height='480'
								src={`https://www.youtube.com/embed/${recentVideoId}`}
								frameBorder='1'
								allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
								title='Embedded youtube'
							/>
						</div>
					</div>
					<div
						className={`col-lg-5 col-md-12 col-sm-12 col-12  ${heroStyles.videoContainer}`}>
						{videos.map((video, index) => (
							<div className='row' key={index}>
								<div
									className={`col-md-4 col-sm-4 col-4 ${heroStyles.smallVideo}`}>
									<iframe
										width='100%'
										height='90'
										src={`https://www.youtube.com/embed/${video.node.lien_youtube.lienYoutube.replace(
											/^https:\/\/youtu.be\/([a-z0-9]+)\?(.)+$/i,
											'$1'
										)}`}
										frameBorder='1'
										allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										allowFullScreen
										title='Embedded youtube'
									/>
								</div>
								<div className='col-md-8 col-sm-8 col-8'>
									<h5 className={`mb-1 ${heroStyles.title}`}>Environews TV</h5>
									<p className={`${heroStyles.videoDescription}`}>
										{video.node.title}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Videos;
