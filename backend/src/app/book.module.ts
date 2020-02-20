import { Module } from '@nestjs/common';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.service';
import { BookCustomController } from './book-custom.controller';
import { ArrayResponseController } from './controllers/array-response.controller';

@Module({
  controllers: [BookController, BookCustomController, ArrayResponseController],
  providers: [BookService]
})
export class BookModule {}
