import { AbstractMapper } from "../../../../../core/helpers/abstract.mapper";
import { UserProps, User } from "../../../domain/entities/user.entity";
import { UserEntity } from "../repositories/entities/user.entity";

export class UserMapper extends AbstractMapper<UserEntity, User> {
  apiToEntity(apiModel: User): UserEntity {
    const entity: UserEntity = {
      ...apiModel
    };

    return Object.assign(new UserEntity(), entity);
  }

  entityToApi(entity: UserEntity): User {
    const userProps: UserProps = {
      ...entity
    };

    return User.create(userProps);
  }
}
