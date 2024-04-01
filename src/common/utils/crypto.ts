import * as crypto from 'crypto';

type BinaryToTextEncoding = 'base64' | 'base64url' | 'hex' | 'binary';

export const md5Hash = (value, encoding: BinaryToTextEncoding = 'hex') =>
  crypto.createHash('md5').update(value).digest(encoding);