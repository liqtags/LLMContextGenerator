// src/index.ts
var import_fs2 = require("fs");
var import_path3 = require("path");

// src/buildRepoTree.ts
var import_fs = require("fs");
var import_path2 = require("path");

// src/scanFileTypes.ts
var import_path = require("path");
var scanFileTypes = (file) => {
  return (0, import_path.extname)(file) === ".ts" || (0, import_path.extname)(file) === ".sol" || (0, import_path.extname)(file) === ".js" || (0, import_path.extname)(file) === ".json" || (0, import_path.extname)(file) === ".md" || (0, import_path.extname)(file) === ".html" || (0, import_path.extname)(file) === ".css" || (0, import_path.extname)(file) === ".scss" || (0, import_path.extname)(file) === ".less" || (0, import_path.extname)(file) === ".graphql" || (0, import_path.extname)(file) === ".yml" || (0, import_path.extname)(file) === ".yaml" || (0, import_path.extname)(file) === ".xml" || (0, import_path.extname)(file) === ".java" || (0, import_path.extname)(file) === ".py" || (0, import_path.extname)(file) === ".go" || (0, import_path.extname)(file) === ".rb" || (0, import_path.extname)(file) === ".php" || (0, import_path.extname)(file) === ".sh" || (0, import_path.extname)(file) === ".bat" || (0, import_path.extname)(file) === ".cmd" || (0, import_path.extname)(file) === ".ps1" || (0, import_path.extname)(file) === ".pl" || (0, import_path.extname)(file) === ".pm";
};
var scanFileTypes_default = scanFileTypes;

// src/buildRepoTree.ts
var ignoreNames = ["node_modules", "dist", ".git"];
function buildRepoTree(dir, baseDir) {
  const name = (0, import_path2.basename)(dir);
  const directoryStats = (0, import_fs.statSync)(dir);
  const node = { name, type: "directory", children: [] };
  let fileContents = "";
  if (directoryStats.isDirectory()) {
    (0, import_fs.readdirSync)(dir).forEach((file) => {
      const filePath = (0, import_path2.join)(dir, file);
      if ((0, import_fs.statSync)(filePath).isDirectory()) {
        if (ignoreNames.indexOf(file) != -1) return;
        const result = buildRepoTree(filePath, baseDir);
        node.children.push(result.node);
        fileContents += result.fileContents;
      } else if (scanFileTypes_default(file)) {
        node.children.push({ name: file, type: "file" });
        const relativePath = (0, import_path2.relative)(baseDir, filePath);
        const content = (0, import_fs.readFileSync)(filePath, "utf8");
        const prefix = baseDir.split("/").pop();
        fileContents += `--- ${prefix}/${relativePath} ---
${content}
`;
      }
    });
  }
  return { node, fileContents };
}
var buildRepoTree_default = buildRepoTree;

// src/getFormattedFileTree.ts
function getFormattedFileTree(node, prefix = "") {
  let result = `${prefix}${node.name}
`;
  if (node.type === "directory" && node.children) {
    node.children.forEach((child, index) => {
      const isLast = index === node.children.length - 1;
      result += getFormattedFileTree(
        child,
        `${prefix}${isLast ? "\u2514\u2500\u2500 " : "\u251C\u2500\u2500 "}`
      );
    });
  }
  return result;
}
var getFormattedFileTree_default = getFormattedFileTree;

// src/index.ts
function run(obj) {
  const { srcPath, outPath, shouldOutput } = obj;
  const { node: fileTree, fileContents } = buildRepoTree_default(srcPath, srcPath);
  const treeOutput = getFormattedFileTree_default(fileTree);
  let together = `${treeOutput}
${fileContents}`;
  if (!(0, import_fs2.existsSync)("./out")) {
    (0, import_fs2.mkdirSync)("./out");
  }
  if (shouldOutput) {
    (0, import_fs2.writeFileSync)(`${outPath}/context.txt`, together);
  }
}
run({
  srcPath: (0, import_path3.resolve)(__dirname, "src"),
  outPath: (0, import_path3.resolve)(__dirname, "out"),
  shouldOutput: true
});
