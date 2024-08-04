import fs from 'fs'
import * as path from "node:path";
const  { copyFile,readdir, mkdir } = fs.promises

async function copyFileToDirectory(sourceFile, destDir) {
  const destFile = path.join(destDir, path.basename(sourceFile));
  try {
    await copyFile(sourceFile, destFile);
  } catch (err) {
    console.error(`copy file error: ${err}`);
  }
}


async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

const sourceFile = "./manifest.json";
const sourceFile1 = "./service-worker.js";
const destDir = "./dist";
const src = './icons'
const destSrc = './dist/icons';

await copyFileToDirectory(sourceFile, destDir);
await copyFileToDirectory(sourceFile1, destDir);
await copyDir(src, destSrc)
