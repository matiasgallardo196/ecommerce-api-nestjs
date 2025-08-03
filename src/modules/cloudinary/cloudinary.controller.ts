import { Controller, FileTypeValidator, HttpCode, Param, ParseFilePipe, ParseUUIDPipe, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ValidateImagePipe } from 'src/pipes/validateImage.pipe';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cloudinary')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @ApiOperation({ summary: 'Upload or update a user image (JPEG, PNG or WebP)(requires authentication)' })
  @ApiParam({ name: 'id', description: 'User ID', example: 'valid-uuid' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Image uploaded successfully (URL returned)' })
  @ApiResponse({ status: 400, description: 'File required' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 413, description: 'File must be less than 200 KB' })
  @ApiResponse({ status: 415, description: 'File is not a valid image or its format is not allowed (jpg, png, webp)' })
  @HttpCode(200)
  @Put('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateImg(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(new ParseFilePipe({ validators: [new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ })] }), ValidateImagePipe)
    file: Express.Multer.File,
  ): Promise<string> {
    return await this.cloudinaryService.updateImg(id, file);
  }
}
