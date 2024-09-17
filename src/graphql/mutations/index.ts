import fs from 'fs';
import path from 'path';

const loadGraphQLFiles = (directory: string) => {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.graphql'))
    .map((file) => fs.readFileSync(path.join(directory, file), 'utf8'))
    .join('\n');
};

const mutationsDirectory = path.join(__dirname);
const mutations = loadGraphQLFiles(mutationsDirectory);

export default mutations;
