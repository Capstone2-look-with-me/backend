import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.client = createClient({
      username: this.configService.get<string>('REDIS_USERNAME'),
      password: this.configService.get<string>('REDIS_PASSWORD'),
      socket: {
        host: this.configService.get<string>('REDIS_HOST'),
        port: this.configService.get<number>('REDIS_PORT'),
      },
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));

    await this.client.connect();
    console.log('✅ Redis connected');
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.client.set(key, value, { EX: ttlSeconds }); // EX: expire in seconds
    } else {
      await this.client.set(key, value);
    }
  }  

  async get(key: string): Promise<string | null> {
    return this.client.get(key) as Promise<string | null>;
  }
  
  getClient(): RedisClientType {
    return this.client;
  }
}
