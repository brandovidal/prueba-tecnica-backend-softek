import { UseInterceptors } from '@nestjs/common';

import {
  ClassContrustor,
  SerializeInterceptor,
} from './serialize.intercerptor';

export function Serialize(dto: ClassContrustor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
