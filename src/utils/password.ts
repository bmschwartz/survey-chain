import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Adjust the number of salt rounds as needed

/**
 * Salts and hashes a plain text password using bcrypt.
 *
 * @param password - The plain text password to be hashed.
 * @returns The salted and hashed password.
 */
export async function saltAndHashPassword(password: string): Promise<string> {
  // Generate a salt
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
