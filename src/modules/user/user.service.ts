import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '@dto/users/create-user.dto';
import { UpdateUserDto } from '@dto/users/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { CloudinaryFolder } from '@enum/cloudinary-folder.enum';
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service';
import { File } from '@entities/file.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
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
        .catch((e) => {
          return undefined;
        }),
    });
    return await this.repository.save(entity).catch((e) => {
      if (e.errno || e.sqlState === '23000') {
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
        .catch((e) => {
          return undefined;
        }),
    });

    if(updateUserDto.image){
      const previousImage = await this.findOne(id);
      await this.handleImageChange(previousImage);
    }

    return await this.repository.save(entity).catch((e) => {
      if (e.errno || e.sqlState === '23000') {
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
    return await this.repository.findOneBy({ email });
  }
}
