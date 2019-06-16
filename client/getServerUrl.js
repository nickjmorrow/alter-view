const getServerUrl = () => {
	switch (process.env.NODE_ENV) {
		// testing comment
		case 'production':
			return 'https://young-temple-83505.herokuapp.com/graphql';
		case 'development':
			return 'http://localhost:9000/graphql';
		default:
			throw new Error(`Unexpected environment: ${process.env.NODE_ENV}`);
	}
};

module.exports = getServerUrl;
