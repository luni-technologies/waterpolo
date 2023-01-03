/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		loader: 'imgix',
		path: '/',
	},
}

module.exports = nextConfig
