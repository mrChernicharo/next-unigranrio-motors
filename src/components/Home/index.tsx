/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

const bannerPath = '/banner-min-min.jpg';

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
			<div className="banner">
				<img src={bannerPath} alt="" height="700" />
			</div>
		</div>
	);
};

export default Home;
