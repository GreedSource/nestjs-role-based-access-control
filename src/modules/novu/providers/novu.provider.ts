import { Novu } from '@novu/node';
import { Inject, Provider } from '@nestjs/common';

export const NOVU_PROVIDER_TOKEN = 'NOVU_PROVIDER_TOKEN';

export const NovuProvider: Provider = {
  provide: NOVU_PROVIDER_TOKEN,
  useFactory: () => new Novu(process.env.NOVU_API_KEY),
};

export const InjectNovu = () => Inject(NOVU_PROVIDER_TOKEN);
