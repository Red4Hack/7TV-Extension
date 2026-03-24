const EMOJI_CACHE_KEY = "seventv-emoji-vectors";
const EMOJI_CACHE_VERSION = "v1";

async function getCachedEmojiContainer(): Promise<HTMLElement | null> {
	try {
		const cache = await caches.open(`seventv-emoji-${EMOJI_CACHE_VERSION}`);
		const cached = await cache.match(EMOJI_CACHE_KEY);
		if (cached) {
			const html = await cached.text();
			const container = document.createElement("div");
			container.innerHTML = html;
			return container;
		}
	} catch {
		return null;
	}
	return null;
}

async function saveEmojiToCache(container: HTMLElement): Promise<void> {
	try {
		const cache = await caches.open(`seventv-emoji-${EMOJI_CACHE_VERSION}`);
		const response = new Response(container.innerHTML, {
			headers: { "Content-Type": "text/html" },
		});
		await cache.put(EMOJI_CACHE_KEY, response);
	} catch {}
}

export async function insertEmojiVectors(): Promise<void> {
	if (document.getElementById("seventv-emoji-container")) {
		return;
	}

	const cached = await getCachedEmojiContainer();
	if (cached) {
		document.head.appendChild(cached);
		return;
	}

	const container = document.createElement("div");
	container.id = "seventv-emoji-container";
	container.style.display = "none";
	container.style.position = "fixed";
	container.style.top = "-1px";
	container.style.left = "-1px";

	const base = chrome.runtime.getURL("assets/emoji");
	const blocks = 11;

	for (let i = 0; i < blocks; i++) {
		const data = await (await fetch(base + "/emojis" + i + ".svg")).text();

		const element = document.createElement("div");
		element.id = "emojis" + i;
		element.innerHTML = data;

		container.appendChild(element);
	}

	document.head.appendChild(container);

	await saveEmojiToCache(container);
}
