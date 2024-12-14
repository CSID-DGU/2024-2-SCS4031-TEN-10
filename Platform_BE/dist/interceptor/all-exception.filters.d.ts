import { ExceptionFilter, ArgumentsHost, BadRequestException } from '@nestjs/common';
export declare class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
    catch(exception: any, host: ArgumentsHost): void;
}
export declare class NotFoundFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
export declare class AllExceptionsFilter implements ExceptionFilter {
    private logger;
    catch(exception: unknown, host: ArgumentsHost): void;
}
