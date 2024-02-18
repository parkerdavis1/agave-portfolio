const dateEl = document.querySelector(".current-date");
const date = new Date();
dateEl.innerText = new Intl.DateTimeFormat("en-US", {
	dateStyle: "full",
}).format(date);
