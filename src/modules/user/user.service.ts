import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '@dto/users/create-user.dto';
import { UpdateUserDto } from '@dto/users/update-user.dto';
import { User } from '@entities/user.entity';
import { CloudinaryFolder } from '@enum/cloudinary-folder.enum';
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service';
import { File } from '@entities/file.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const entity = await this.repository.create({
      ...createUserDto,
      avatar: await this.cloudinaryService
        .uploadFile(createUserDto.image, CloudinaryFolder.Profile)
        .then((result) => {
          return <File>{
            path: result?.secure_url,
            format: result?.format,
            filesize: result?.bytes,
            publicId: result?.public_id,
          };
        })
        .catch(() => {
          return undefined;
        }),
    });
    return await this.repository.save(entity).catch((e) => {
      if (e?.code === '23505') {
        throw new ConflictException('Email is already in use.');
      }
      throw new InternalServerErrorException();
    });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find({
      loadEagerRelations: false,
    });
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const entity = await this.repository.create({
      id,
      ...updateUserDto,
      avatar: await this.cloudinaryService
        .uploadFile(updateUserDto.image, CloudinaryFolder.Profile)
        .then((result) => {
          return <File>{
            path: result?.secure_url,
            format: result?.format,
            filesize: result?.bytes,
            publicId: result?.public_id,
          };
        })
        .catch(() => {
          return undefined;
        }),
    });

    if (updateUserDto.image) {
      const previousImage = await this.findOne(id);
      await this.handleImageChange(previousImage);
    }

    return await this.repository.save(entity).catch((e) => {
      if (e?.code === '23505') {
        throw new ConflictException('Email is already in use.');
      }
      throw new InternalServerErrorException();
    });
  }

  private async handleImageChange(user: User): Promise<void> {
    await this.cloudinaryService.deleteFile(user.avatar.publicId);
  }

  async remove(id: string) {
    return await this.repository.softDelete({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findByEmail(email);
  }
}
