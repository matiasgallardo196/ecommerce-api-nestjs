import { fileTypeFromBuffer } from 'file-type';
import { BadRequestException, ImATeapotException, Injectable, Logger, PayloadTooLargeException, PipeTransform, UnsupportedMediaTypeException } from '@nestjs/common';

@Injectable()
export class ValidateImagePipe implements PipeTransform {
  async transform(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File required');

    if (file.size > 204800) throw new PayloadTooLargeException('File must be less than 200 KB');

    const type = await fileTypeFromBuffer(file.buffer);
    Logger.debug(type);
    Logger.debug('MIME:', file.mimetype);

    if (!type || !type.mime.startsWith('image/')) throw new UnsupportedMediaTypeException('File is not a valid image or its format is not allowed (jpg, png, webp)');

    return file;
  }
}
