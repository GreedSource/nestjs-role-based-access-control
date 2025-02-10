import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PythonService } from './python.service';
import { TransformDataDto } from '@dto/python/transform-data.dto';

@Controller('python')
@ApiTags('Python')
export class PythonController {
  constructor(private readonly pythonService: PythonService) {}
  @Post('execute-code')
  async executeCode(@Body() body: TransformDataDto) {
    return await this.pythonService.process(body);
  }
}
