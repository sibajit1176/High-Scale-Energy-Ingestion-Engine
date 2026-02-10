import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',

  // ✅ NEVER fallback to localhost in Docker
  host: process.env.DB_HOST as string,

  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,

  autoLoadEntities: true,
  synchronize: true, // false in production later

  retryAttempts: 10,
  retryDelay: 3000,
};
