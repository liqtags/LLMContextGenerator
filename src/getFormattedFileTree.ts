function getFormattedFileTree(node, prefix = '') {
    let result = `${prefix}${node.name}\n`;
    if (node.type === 'directory' && node.children) {
        node.children.forEach((child, index) => {
            const isLast = index === node.children.length - 1;
            result += getFormattedFileTree(
                child,
                `${prefix}${isLast ? '└── ' : '├── '}`
            );
        });
    }
    return result;
}

export default getFormattedFileTree;