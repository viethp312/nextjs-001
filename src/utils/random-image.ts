type RandomImageOptions = {
  width?: number;
  height?: number;
  bgColor?: string;
  textColor?: string;
  text?: string;
  format?: "png" | "jpg" | "svg" | "webp" | "gif" | "avif";
};

function randomHexColor() {
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
}

export function getRandomImageUrl({
  width = Math.floor(Math.random() * 600) + 200,
  height = Math.floor(Math.random() * 600) + 200,
  bgColor = randomHexColor(),
  textColor = randomHexColor(),
  text,
  format = "png",
}: RandomImageOptions = {}) {
  const size = `${width}x${height}`;
  const url = new URL(`https://placehold.co/${size}/${bgColor}/${textColor}.${format}`);

  if (text) {
    url.searchParams.set("text", text);
  }

  return url.toString();
}
