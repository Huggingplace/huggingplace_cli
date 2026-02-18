import { Command } from 'commander';

export const makeCollectionsCommand = () => {
  const collections = new Command('collections')
    .description('Manage data collections.');

  collections
    .command('list')
    .description('List all collections.')
    .action(() => console.log('Listing all collections...'));

  collections
    .command('create')
    .description('Create a new collection.')
    .option('-n, --name <name>', 'Name of the collection')
    .option('-d, --description <desc>', 'Description of the collection')
    .action((options) => console.log(`Creating collection: ${options.name}`));

  collections
    .command('delete')
    .description('Delete a collection.')
    .argument('<collection_id>', 'ID of the collection to delete')
    .action((collection_id) => console.log(`Deleting collection: ${collection_id}`));

  collections
    .command('add-item')
    .description('Add an item to a collection.')
    .argument('<collection_id>', 'ID of the collection')
    .option('--item-id <item_id>', 'ID of the item to add')
    .option('--type <type>', 'Type of the item (document or prompt_log)')
    .option('--anonymize', 'Anonymize the item before adding')
    .action((collection_id, options) => console.log(`Adding item ${options.itemId} to collection ${collection_id}`));

  collections
    .command('query')
    .description('Ask a question to a collection (core RAG).')
    .argument('<collection_id>', 'ID of the collection')
    .option('-q, --question <question>', 'The question to ask')
    .action((collection_id, options) => console.log(`Querying collection ${collection_id} with: "${options.question}"`));

  return collections;
};
