import { Module } from '@nestjs/common';
import { ReviewsController } from 'src/modules/reviews/reviews.controller';
import { ReviewsModule } from 'src/modules/reviews/reviews.module';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [UsersModule, ReviewsModule],
  controllers: [UsersController, ReviewsController],
})
export class ApiModule {}
