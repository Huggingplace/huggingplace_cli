import { Command } from 'commander';

export const makeDocumentsCommand = () => {
  const documents = new Command('documents')
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
