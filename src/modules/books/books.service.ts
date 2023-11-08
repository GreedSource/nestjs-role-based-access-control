import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '@dto/books/create-book.dto';
import { UpdateBookDto } from '@dto/books/update-book.dto';
import { Book } from '@entities/book.entity';
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service';
import { CloudinaryFolder } from '@enum/cloudinary-folder.enum';
import { File } from '@entities/file.entity';
import { BookRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(
    private readonly repository: BookRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(createBookDto: CreateBookDto) {
    const entity = await this.repository.create({
      ...createBookDto,
      cover: await this.cloudinaryService
        .uploadFile(createBookDto.image, CloudinaryFolder.Book)
        .then((result) => {
          return <File>{
            path: result?.secure_url,
            format: result?.format,
            filesize: result?.bytes,
            publicId: result?.public_id,
          };
        })
        .catch((e) => {
          return undefined;
        }),
    });
    return await this.repository.save(entity);
  }

  async findAll(): Promise<Book[]> {
    return await this.repository.find({
      loadEagerRelations: true,
    });
  }

  async findOne(id: string): Promise<Book> {
    return await this.repository.findOne({
      where: { id },
      loadEagerRelations: true,
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const entity = await this.repository.create({
      id,
      ...updateBookDto,
      cover: await this.cloudinaryService
        .uploadFile(updateBookDto.image, CloudinaryFolder.Book)
        .then((result) => {
          return <File>{
            path: result?.secure_url,
            format: result?.format,
            filesize: result?.bytes,
            publicId: result?.public_id,
          };
        })
        .catch((e) => {
          return undefined;
        }),
    });
    return await this.repository.save(entity);
  }

  async remove(id: string) {
    return await this.repository.softDelete({ id });
  }
}
