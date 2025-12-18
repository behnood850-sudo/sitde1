import JSZip from 'jszip';
import * as fs from 'fs';
import * as path from 'path';

async function extractZip() {
  const zipBuffer = fs.readFileSync('temp/project-k-share-main.zip');
  const zip = await JSZip.loadAsync(zipBuffer);
  
  const files: string[] = [];
  zip.forEach((relativePath, file) => {
    files.push(relativePath);
  });
  
  console.log('Files in zip:');
  files.forEach(f => console.log(f));
}

extractZip();
