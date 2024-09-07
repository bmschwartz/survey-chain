import fs from 'fs';
import path from 'path';

// Helper function to load all .graphql files in a directory
const loadGraphQLFiles = (directory: string) => {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.graphql'))
    .map((file) => fs.readFileSync(path.join(directory, file), 'utf8'))
    .join('\n'); // Combine all files into a single string
};

// Load all .graphql files in the mutations directory
const mutationsDirectory = path.join(__dirname);
const mutations = loadGraphQLFiles(mutationsDirectory);

export default mutations;
