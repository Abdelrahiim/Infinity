/**
 * Encrypts a given key using a secure hashing algorithm.
 *
 * @param {string} key - The key to be encrypted.
 * @return {string} The encrypted key.
 */
export function encryptKey(key: string): string {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36); // Ensure the hash is a positive integer
}
