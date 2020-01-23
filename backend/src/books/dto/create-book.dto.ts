import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
}
