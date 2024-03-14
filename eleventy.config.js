const markdownItAnchor = require("markdown-it-anchor");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const {
	EleventyHtmlBasePlugin,
	EleventyRenderPlugin,
} = require("@11ty/eleventy");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const pluginTOC = require("eleventy-plugin-nesting-toc");
const markdownItAttrs = require("markdown-it-attrs");
// const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
// const lightningCss = require("@11tyrocks/eleventy-plugin-lightningcss");
// const pluginCodeClipboard = require("eleventy-plugin-code-clipboard");

const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");
const pluginFilters = require("./eleventy.config.filters.js");
const pluginShortcodes = require("./eleventy.config.shortcodes.js");
const pluginCollections = require("./eleventy.config.collections.js");

module.exports = function (eleventyConfig) {
	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
	});
	eleventyConfig.addPassthroughCopy("content/**/*.m4a");
	eleventyConfig.addPassthroughCopy("content/**/*.wav");

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// App plugins
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(pluginTOC);
	// eleventyConfig.addPlugin(pluginWebc, {
	// 	components: "src/_includes/components/*.webc",
	// });
	// eleventyConfig.addPlugin(emojiReadTime, {
	// 	showEmoji: false,
	// 	label: "min read",
	// });
	// eleventyConfig.addPlugin(lightningCss);
	// eleventyConfig.addPlugin(pluginCodeClipboard);

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 },
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);
	eleventyConfig.addPlugin(pluginFilters);
	eleventyConfig.addPlugin(pluginShortcodes);
	eleventyConfig.addPlugin(pluginCollections);

	eleventyConfig.addShortcode("year", () => new Date().getFullYear());

	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", (mdLib) => {
		mdLib.use(markdownItAttrs);
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.headerLink(),
			level: [1, 2, 3, 4],
			slugify: eleventyConfig.getFilter("slugify"),
		});
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: ["md", "njk", "html", "liquid"],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "content", // default: "."
			includes: "../_includes", // default: "_includes"
			data: "../_data", // default: "_data"
			output: "_site",
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "/",
	};
};
