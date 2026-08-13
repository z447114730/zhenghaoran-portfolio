import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { force: true, recursive: true });
await mkdir("dist", { recursive: true });

for (const entry of ["index.html", "frames", "frames-desktop", "media"]) {
  await cp(entry, `dist/${entry}`, { recursive: true });
}
