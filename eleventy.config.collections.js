module.exports = (eleventyConfig) => {
	eleventyConfig.addCollection("sortedPosts", function (collectionApi) {
		return collectionApi
            .getFilteredByTag('posts')
            .sort((a,b) => b.data.publishedDate - a.data.publishedDate)
	});
};
