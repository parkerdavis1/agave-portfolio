const allPictures = document.querySelectorAll("img");

allPictures.forEach((image) => {
	image.style.opacity = 0;
});

allPictures.forEach((image) =>
	image.addEventListener("load", (event) => {
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
