import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { InsertReviewDto } from './dto/insert-review.dto';
import { UserAuthGuard } from 'src/jwt/user-auth/user-auth.guard';

@ApiTags('후기')
@Controller('reviews')
@UseGuards(UserAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get(':festival_idx')
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기 목록 조회' })
  async getList(@Param('festival_idx') festival_idx: number): Promise<any> {
    try {
      return await this.reviewsService.getList(festival_idx);
    } catch (err) {
      throw err;
    }
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기 등록' })
  async insert(
    @Request() req,
    @Body() insertReviewDto: InsertReviewDto,
  ): Promise<object> {
    try {
      const reviewResult = await this.reviewsService.insert(
        req.user,
        insertReviewDto,
      );
      return { result: true, data: reviewResult };
    } catch (err) {
      throw err;
    }
  }
}
