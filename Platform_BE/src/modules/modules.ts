import { forwardRef, Module } from '@nestjs/common';
import { ApiModule } from 'src/controllers/controller.module';

@Module({
  imports: [forwardRef(() => ApiModule)],
})
export class Modules {}
