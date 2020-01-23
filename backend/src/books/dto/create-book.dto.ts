import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDTO {
    @ApiProperty({
        description: 'The id of the book',
        default: 1,
    })
    readonly id: number;
    @ApiProperty({
        description: 'The title of the book',
        minLength: 1
    })
    readonly title: string;
    @ApiPropertyOptional()
    readonly description: string;
    @ApiProperty()
    readonly author: string;
}
