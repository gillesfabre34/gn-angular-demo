import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '../enums/category';

export class CreateBookDTO {
    @ApiProperty({
        description: 'The title of the book',
        minLength: 1
    })
    readonly title: string;

    @ApiProperty({
        description: 'The author of the book',
        default: 1,
    })
    readonly author: string;

    @ApiPropertyOptional()
    readonly description: string;

    @ApiPropertyOptional({
        description: 'The book\'s category',
        default: '',
    })
    readonly category: Category;
}
