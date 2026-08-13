import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

await rm("dist", { force: true, recursive: true });
await mkdir("dist", { recursive: true });

for (const entry of ["index.html", "frames", "frames-desktop"]) {
  await cp(entry, `dist/${entry}`, { recursive: true });
}

await mkdir("dist/media", { recursive: true });

async function copyMediaWithoutVideo(source, destination) {
  await mkdir(destination, { recursive: true });
  for (const item of await readdir(source, { withFileTypes: true })) {
    const from = path.join(source, item.name);
    const to = path.join(destination, item.name);
    if (item.isDirectory()) {
      await copyMediaWithoutVideo(from, to);
    } else if (path.extname(item.name).toLowerCase() !== ".mp4") {
      await cp(from, to);
    }
  }
}

await copyMediaWithoutVideo("media", "dist/media");
