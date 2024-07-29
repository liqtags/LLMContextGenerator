import { extname } from 'path';

const scanFileTypes = (file) => {
    // probs better way to do this
    return extname(file) === '.ts'
        || extname(file) === '.sol'
        || extname(file) === '.js'
        || extname(file) === '.json'
        || extname(file) === '.md'
        || extname(file) === '.html'
        || extname(file) === '.css'
        || extname(file) === '.scss'
        || extname(file) === '.less'
        || extname(file) === '.graphql'
        || extname(file) === '.yml'
        || extname(file) === '.yaml'
        || extname(file) === '.xml'
        || extname(file) === '.java'
        || extname(file) === '.py'
        || extname(file) === '.go'
        || extname(file) === '.rb'
        || extname(file) === '.php'
        || extname(file) === '.sh'
        || extname(file) === '.bat'
        || extname(file) === '.cmd'
        || extname(file) === '.ps1'
        || extname(file) === '.pl'
        || extname(file) === '.pm'
}

export default scanFileTypes;