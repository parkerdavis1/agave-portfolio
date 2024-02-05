const allPictures = document.querySelectorAll("img");

allPictures.forEach((image) => {
	image.style.opacity = 0;
	console.log("opacity 0", image.style.opacity);
});
console.log(allPictures);

allPictures.forEach((image) =>
	image.addEventListener("load", (event) => {
		console.log("loaded!");
		event.target.style.transition = "opacity 1s";
		event.target.style.opacity = "1";
	})
);

// Backup if image is loaded from the cache;
allPictures.forEach((image) => {
	if (image.complete) {
		image.style.transition = "opacity 1s";
		image.style.opacity = "1";
	}
});
