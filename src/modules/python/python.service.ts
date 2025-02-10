import { TransformDataDto } from '@dto/python/transform-data.dto';
import { Injectable, Logger } from '@nestjs/common';
import { PythonShell } from 'python-shell';
import { config } from 'src/config/python.config';

@Injectable()
export class PythonService {
  private readonly logger = new Logger(PythonService.name, {
    timestamp: true,
  });
  private shell: PythonShell;

  constructor() {
    this.shell = new PythonShell('test.py', config);
    this.startup();
  }

  private startup() {
    this.logger.log('🐍 Python Shell Started');
  }

  public process({ data }: TransformDataDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.shell.send(data);

      // ✅ Listen for Python's response
      this.shell.on('message', (message) => {
        this.logger.log(`📩 Received from Python: ${JSON.stringify(message)}`);
        resolve(message);
      });

      // ✅ Handle errors
      this.shell.on('error', (err) => {
        this.logger.error(`❌ Python Error: ${err.message}`);
        reject(err);
      });

      // ✅ Handle script closing
      this.shell.on('close', (code) => {
        this.logger.log(`🚪 Python process closed with exit code ${code}`);
      });
    });
  }
}
