import { Options } from 'python-shell';
import { Logger } from '@nestjs/common';

const logger = new Logger('PythonShell', {
  timestamp: true,
});

export const config: Options = {
  mode: 'json',
  pythonPath: process.env.PYTHON_PATH,
  scriptPath: './scripts',
  pythonOptions: ['-u'],
  stderrParser: (log) => logger.verbose(log),
};
