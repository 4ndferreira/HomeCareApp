import { IocContainer, Newable } from '@tsoa/runtime';
import { container } from 'tsyringe';

type ServiceIdentifier<T> = string | symbol | Newable<T>;

export const iocContainer: IocContainer = {
  get: <T>(controller: ServiceIdentifier<T>): T => {
    return container.resolve<T>(controller);
  },
};