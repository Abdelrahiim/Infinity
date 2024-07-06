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
   * Sets a value in the cache for a given user, model, and parameter.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} modelName - The name of the model.
   * @param {S} parameter - The parameter used to identify the value.
   * @param {T} value - The value to cache.
   * @return {Promise<void>} A Promise that resolves when the value is successfully cached.
   */
  async get<T extends Record<string, unknown>>(
    userId: string,
    modelName: string,
    parameter: T
  ) {
    const key = encryptKey(`${modelName}${stringify(parameter)}`);
    const cachedResult = await this.redisService.hget(userId, key);
    return cachedResult ? parse(cachedResult) : undefined;
  }
  /**
   * Sets a value in the cache for a given user, model, and parameter.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} modelName - The name of the model.
   * @param {S} parameter - The parameter used to identify the value.
   * @param {T} value - The value to cache.
   * @return {Promise<void>} A Promise that resolves when the value is successfully cached.
   */
  async set<T, S extends Record<string, unknown>>(
    userId: string,
    modelName: string,
    parameter: S,
    value: T
  ): Promise<void> {
    const key = encryptKey(`${modelName}${stringify(parameter)}`);
    const jsonValue = stringify(value);
    await this.redisService.hset(userId, key, jsonValue, 'EX', 60 * 5);
  }
}
