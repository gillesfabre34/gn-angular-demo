import { Module } from '@nestjs/common';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.service';
import { BookCustomController } from './book-custom.controller';
@Module({
  controllers: [BookController, BookCustomController],
  providers: [BookService]
})
export class BookModule {}
