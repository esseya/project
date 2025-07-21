
const imageContext = import.meta.glob('./trafik/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  as: 'url'
});

const signImages: Record<string, string> = {};

for (const path in imageContext) {
  // Extract filename without extension: e.g. "warning-cross.jpg" → "warning-cross"
  const fileNameWithExt = path.split('/').pop();
  if (!fileNameWithExt) continue;

  const key = fileNameWithExt.replace(/\.[^/.]+$/, ""); // remove extension
  signImages[key] = imageContext[path] as string;
}

export default signImages;
