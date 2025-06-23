import { ApiProperty } from '@nestjs/swagger';

export class FeedbackMessage {
  @ApiProperty({
    example: 'Congratulations! Operation successfully failed.',
    description: 'Feedback message',
  })
  message: string;
}
