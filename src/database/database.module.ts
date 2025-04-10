import { Global, Module } from '@nestjs/common';
import { dbProviders } from './database.providers';

@Global()
@Module({
  providers: [...dbProviders],
  exports: [...dbProviders],
})
export class DatabaseModule {}
