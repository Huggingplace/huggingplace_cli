"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDocumentsCommand = void 0;
const commander_1 = require("commander");
const makeDocumentsCommand = () => {
    const documents = new commander_1.Command('documents')
        .description('Upload and manage documents.');
    documents
        .command('list')
        .description('List all uploaded documents.')
        .action(() => console.log('Listing all documents...'));
    documents
        .command('upload')
        .description('Upload a new document.')
        .argument('<file_path>', 'Path to the document file')
        .action((file_path) => console.log(`Uploading document: ${file_path}`));
    return documents;
};
exports.makeDocumentsCommand = makeDocumentsCommand;
