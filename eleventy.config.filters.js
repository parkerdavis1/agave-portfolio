const { DateTime } = require("luxon");

const filteredTags = ["all", "nav", "post", "posts", "projects"];
function filterTagList(tags) {
	return (tags || []).filter((tag) => filteredTags.indexOf(tag) === -1);
}

module.exports = (eleventyConfig) => {
	// Filters
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
			format || "DDD"
		);
	});

	eleventyConfig.addFilter("readableISODate", (dateObj, format, zone) => {
		return DateTime.fromISO(dateObj, { zone: zone || "utc" }).toFormat(
			format || "DDD"
		);
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", (collection) => {
		let tagSet = new Set();
		for (let item of collection) {
			(item.data.tags || []).forEach((tag) => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("getAllTagsWithCount", (collection) => {
		let tags = {};
		for (let item of collection) {
			(item.data.tags || []).forEach((tag) => {
				if (Object.keys(tags).includes(tag)) {
					tags[tag] = tags[tag] + 1;
				} else {
					tags[tag] = 1;
				}
			});
		}
		const sortedFilteredEntries = Object.entries(tags)
			.filter((tagEntry) => filteredTags.indexOf(tagEntry[0]) === -1)
			.sort(new Intl.Collator("en-US", { sensitivity: "base" }).compare)
			.sort((a, b) => b[1] - a[1]);
		return sortedFilteredEntries;
	});

	eleventyConfig.addFilter("filterTagList", filterTagList);

	eleventyConfig.addFilter("featured", (collection) => {
		return collection.filter((x) => x.data.featured);
	});
};
