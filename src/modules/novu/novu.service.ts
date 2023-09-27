import { Injectable } from '@nestjs/common';
import { InjectNovu } from './providers/novu.provider';
import {
  Novu,
  ISubscriberPayload,
  ITriggerPayloadOptions,
  ITopicPayload,
  ITopicSubscribersPayload,
} from '@novu/node';

@Injectable()
export class NovuService {
  constructor(
    @InjectNovu()
    private readonly novu: Novu,
  ) {}

  async createSubscriber(subscriberId: string, payload: ISubscriberPayload) {
    const { data } = await this.novu.subscribers.identify(
      subscriberId,
      payload,
    );
    return data;
  }

  async updateSubscriber(subscriberId: string, payload: ISubscriberPayload) {
    const { data } = await this.novu.subscribers.update(subscriberId, payload);
    return data;
  }

  async sendNotification(templateId: string, payload: ITriggerPayloadOptions) {
    const { data } = await this.novu.trigger(templateId, payload);

    return data;
  }

  async createTopic(payload: ITopicPayload) {
    const { data } = await this.novu.topics.create(payload);
    return data;
  }

  async addTopicSub(topicKey: string, payload: ITopicSubscribersPayload) {
    const { data } = await this.novu.topics.addSubscribers(topicKey, payload);
    return data;
  }
}
