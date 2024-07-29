# LLM Context Generator

![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/liqtags/LLMContextGenerator&count_bg=%2379C83D&title_bg=%23555555&icon=mediafire.svg&icon_color=%23E7E7E7&title=HITS&edge_flat=false)

This package scans a repository and generates a unified output of current source files, designed to be used as context for Large Language Models (LLMs).

## Purpose

The primary goal of this script is to create a comprehensive, structured representation of a codebase that can be easily ingested by LLMs. This allows for more accurate and context-aware interactions when using LLMs for code-related tasks such as:

- Code understanding and explanation
- Bug detection and fixing
- Code completion and generation
- Documentation creation
- Code review assistance

## Features

- Scans a specified directory (default: `src` folder in the current directory)
- Ignores specified directories (e.g., `node_modules`, `dist`, `.git`)
- Processes specific file types (`.ts`, `.sol`, `.js`, `.json`, `.md`, `.html`)
- Generates three output files:
  1. A tree structure of the repository
  2. The contents of all scanned files
  3. A combination of both the tree structure and file contents (primary output for LLM context)

## Usage

1. Ensure you have Node.js installed on your system.
2. Place this script in the root directory of your project.
3. Create an `out` directory in the same location as the script.
4. Run the script using Node.js: