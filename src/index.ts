import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import buildRepoTree from './buildRepoTree';
import getFormattedFileTree from './getFormattedFileTree';

function run(obj) {
  const { srcPath, outPath, shouldOutput } = obj;
  const { node: fileTree, fileContents } = buildRepoTree(srcPath, srcPath);
  const treeOutput = getFormattedFileTree(fileTree);
  let together = `${treeOutput}\n${fileContents}`;

  if (!existsSync('./out')) {
    mkdirSync('./out');
  }

  if (shouldOutput) {
    writeFileSync(`${outPath}/context.txt`, together);
  }
}

run({
  srcPath: resolve(__dirname, 'src'),
  outPath: resolve(__dirname, 'out'),
  shouldOutput: true
})