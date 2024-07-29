
import { readdirSync, statSync, readFileSync } from 'fs';
import { basename, join, relative } from 'path';
import scanFileTypes from './scanFileTypes';
let ignoreNames = ['node_modules', 'dist', '.git'];

function buildRepoTree(dir, baseDir) {
    const name = basename(dir);
    const directoryStats = statSync(dir);
    const node = { name, type: 'directory', children: [] };
    let fileContents = '';

    if (directoryStats.isDirectory()) {
        readdirSync(dir).forEach(file => {
            const filePath = join(dir, file);
            if (statSync(filePath).isDirectory()) {
                if (ignoreNames.indexOf(file) != -1) return;
                const result = buildRepoTree(filePath, baseDir);
                node.children.push(result.node);
                fileContents += result.fileContents;
            } else if (scanFileTypes(file)) {
                node.children.push({ name: file, type: 'file' });
                const relativePath = relative(baseDir, filePath);
                const content = readFileSync(filePath, 'utf8');
                const prefix = baseDir.split('/').pop();
                fileContents += `--- ${prefix}/${relativePath} ---\n${content}\n`;
            }
        });
    }
    return { node, fileContents };
}

export default buildRepoTree;