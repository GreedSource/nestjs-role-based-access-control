import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from '@dto/users/create-user.dto';
import { UpdateUserDto } from '@dto/users/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { CloudinaryFolder } from '@enum/cloudinary-folder.enum';
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(
    createUserDto: CreateUserDto,
    profilePic: Express.Multer.File,
  ): Promise<User> {
    const entity = await this.repository.create({
      ...createUserDto,
      ...(await this.handleFile(profilePic)),
    });
    return this.repository
      .save(entity)
      .then((result) => result)
      .catch((e) => {
        if (e.errno || e.sqlState === '23000') {
          throw new ConflictException('Email is already in use.');
        }
        throw new InternalServerErrorException();
      });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  private async handleFile(file: Express.Multer.File) {
    const cloudinaryFile = file
      ? await this.cloudinaryService.uploadFile(file, CloudinaryFolder.Profile)
      : undefined;
    return {
      profilePic: cloudinaryFile?.secure_url,
      profilePic_format: cloudinaryFile?.format,
      profilePic_size: cloudinaryFile?.bytes,
      profilePic_publicId: cloudinaryFile?.public_id,
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    profilePic: Express.Multer.File,
  ): Promise<User> {
    const entity = await this.repository.create({
      id,
      ...updateUserDto,
      ...(await this.handleFile(profilePic)),
    });
    return this.repository
      .save(entity)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        if (e.errno || e.sqlState === '23000') {
          throw new ConflictException('Email is already in use.');
        }
        throw new InternalServerErrorException();
      });
  }

  async remove(id: string) {
    return await this.repository.softDelete({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({ email: email });
  }
}
