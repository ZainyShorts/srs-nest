import * as path from 'path';
import * as fs from 'fs';

export function ensureUploadsFolder() {
  const uploadsPath = path.join(process.cwd(), 'uploads'); // Ensure it's in the project root
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
}

export function countTokens(text: string) {
  return text.split(/\s+/).length; // Approximate token count
}

export function generateUniqueFileName() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000); // Optional for extra uniqueness
  const fileName = `file_${timestamp}_${random}`;
  return fileName;
}
