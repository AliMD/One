import type {DurationString} from '@alwatr/math';

export type DigestAlgorithm = 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512';

export type TokenStatus = 'valid' | 'invalid' | 'expired';

export interface TokenGeneratorConfig {
  /**
   * Secret string data to generate token.
   */
  secret: string;

  /**
   * Token expiration time.
   *
   * `null` mean without expiration time
   */
  duration: DurationString | null;

  /**
   * OpenSSl digest algorithm.
   */
  algorithm: DigestAlgorithm;

  /**
   * Encoding of token.
   */
  encoding: 'base64' | 'base64url' | 'hex' | 'binary';
};

export interface UserFactoryConfig extends TokenGeneratorConfig {}
