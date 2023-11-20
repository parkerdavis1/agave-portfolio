const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
	let url =
		"https://raw.githubusercontent.com/parkerdavis1/eBird-compress-bookmarklet/main/mini.js";
	return EleventyFetch(url, {
		duration: "1d",
		type: "text",
	});
};