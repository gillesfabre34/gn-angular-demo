import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './app/book.module';

@Module({
    imports: [
        BookModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
