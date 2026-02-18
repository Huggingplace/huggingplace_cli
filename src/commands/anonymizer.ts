import { Command } from 'commander';

export const makeAnonymizerCommand = () => {
  const anonymizer = new Command('anonymizer')
    .description('Anonymize collections or text.');

  anonymizer
    .command('submit-collection-job')
    .description('Start a batch anonymization job on a collection.')
    .argument('<collection_id>', 'ID of the collection')
    .option('-m, --mode <mode>', 'Anonymization mode (moderate or aggressive)')
    .action((collection_id, options) => console.log(`Submitting anonymization job for collection ${collection_id}`));

  anonymizer
    .command('check-job-status')
    .description('Check the status of a batch job.')
    .argument('<job_id>', 'ID of the job')
    .action((job_id) => console.log(`Checking status for job: ${job_id}`));

  anonymizer
    .command('anonymize-text')
    .description('Anonymize a single block of text.')
    .option('-t, --text <text>', 'The text to anonymize')
    .action((options) => console.log('Anonymizing text...'));

  return anonymizer;
};
