import { randomUUID } from 'crypto';
/**
 * Method for generating a new uuid with the crypto module.
 * @param entropyCache By default, to improve performance, Node.js will pre-emptively generate and persistently cache enough random data to generate up to 128 random UUIDs.
 * @returns UUID.
 */
export const id = (entropyCache?: true) => randomUUID({
    disableEntropyCache: !entropyCache
});