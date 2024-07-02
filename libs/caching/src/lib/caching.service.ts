import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';
import * as fastJson from 'fast-json-stringify';
import { parse } from 'simdjson';
import { encryptKey } from '@infinity/utils';

const stringify = fastJson({});

@Injectable()
export class CachingService {
  constructor(private readonly redisService: RedisService) {}

  /**
   * Retrieves a value from the Redis cache for a given user, model, and parameter.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} modelName - The name of the model.
   * @param {Record<string, unknown>} parameter - The parameter used to identify the value.
   * @return {Promise<unknown | undefined>} The cached value if it exists, otherwise undefined.
   */
  async get(
    userId: string,
    modelName: string,
    parameter: Record<string, unknown>
  ) {
    const key = encryptKey(`${modelName}${stringify(parameter)}`);
    const cachedResult = await this.redisService.hget(userId, key);
    return cachedResult ? parse(cachedResult) : undefined;
  }
  /**
   * Sets a value in the Redis cache for a given user, model, and parameter.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} modelName - The name of the model.
   * @param {Record<string, unknown>} parameter - The parameter used to identify the value.
   * @param {unknown} value - The value to be stored.
   * @return {Promise<void>} A promise that resolves when the value is successfully stored.
   */
  async set(
    userId: string,
    modelName: string,
    parameter: Record<string, unknown>,
    value: unknown
  ) {
    const key = encryptKey(`${modelName}${JSON.stringify(parameter)}`);
    const jsonValue = stringify(value);
    await this.redisService.hset(userId, key, jsonValue, 'EX', 60 * 5);
  }
}
