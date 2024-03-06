import { Module } from '@nestjs/common';
import { ModelsModule } from 'modules/models/models.module';
import { CommonModule } from 'modules/common/common.module';

@Module({
  imports: [ModelsModule, CommonModule],
})
export class ModulesModule {
}
