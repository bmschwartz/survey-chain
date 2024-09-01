const SALT_ROUNDS = 10; // Adjust the number of salt rounds as needed

/**
 * Salts and hashes a plain text password using bcrypt.
 *
 * @param password - The plain text password to be hashed.
 * @returns The salted and hashed password.
 */
export async function saltAndHashPassword(password: string): Promise<string> {
  const bcrypt = await import('bcrypt');
  // Generate a salt
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

/**
 * Compares a plain text password with a stored hashed password.
 *
 * @param password - The plain text password to check.
 * @param hashedPassword - The hashed password stored in the database.
 * @returns Whether the password matches the hash.
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const bcrypt = await import('bcrypt');
  return bcrypt.compare(password, hashedPassword);
}
