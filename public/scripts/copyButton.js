const copyButtonLabel = "Copy";

let blocks = document.querySelectorAll("pre");

blocks.forEach((block) => {
	console.log("doung something");
	if (navigator.clipboard) {
		let parentNode = block.parentNode;
		let button = document.createElement("button");
		// let container = document.createElement("div");
		// container.classList.add("code-container");

		button.innerText = copyButtonLabel;
		parentNode.appendChild(button);
		// parentNode.appendChild(container);
		// container.appendChild(button);

		// block.appendChild(container);
		// container.appendChild(button);

		button.addEventListener("click", async () => {
			await copyCode(block);
			button.innerText = "Copied!";
			setTimeout(() => {
				button.innerText = copyButtonLabel;
			}, 2000);
		});
	}
});

async function copyCode(block) {
	let code = block.querySelector("code");
	let text = code.innerText;
	await navigator.clipboard.writeText(text);
}
