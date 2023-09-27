import { randomBytes, createCipheriv, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';

const secretKeyBuffer = async (): Promise<Buffer> => {
  return (await promisify(scrypt)(
    process.env.SECRET_KEY,
    'salt',
    32,
  )) as Buffer;
};

export const encrypt = async (text: string): Promise<string> => {
  const iv = randomBytes(16);
  const secret = await secretKeyBuffer();
  const cipher = await createCipheriv('aes-256-cbc', secret, iv);
  const encrypted = await Buffer.concat([cipher.update(text), cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decrypt = async (encryptedText: string): Promise<string> => {
  const [iv, encrypted] = encryptedText.split(':');
  const secret = await secretKeyBuffer();
  const decipher = await createDecipheriv(
    'aes-256-cbc',
    secret,
    Buffer.from(iv, 'hex'),
  );
  let decrypted = await decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += await decipher.final('utf-8');
  return decrypted;
};
