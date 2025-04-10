import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const dbProviders = [
  {
    provide: DataSource,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      try {
        const dataSource = new DataSource({
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        });

        await dataSource.initialize();
        console.log('Database connected successfully');
        return dataSource;
      } catch (error) {
        console.error('Database connection error', error);
        throw error;
      }
    },
  },
];
