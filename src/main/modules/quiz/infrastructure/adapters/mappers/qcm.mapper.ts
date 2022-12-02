import { AbstractMapper } from "../../../../../core/helpers/abstract.mapper";
import { QcmProps, Qcm } from "../../../domain/entities/qcm.entity";
import { QcmEntity } from "../repositories/entities/qcm.entity";

export class QcmMapper extends AbstractMapper<QcmEntity, Qcm> {
  apiToEntity(apiModel: Qcm): QcmEntity {
    const entity: QcmEntity = {
      ...apiModel
    };

    return Object.assign(new QcmEntity(), entity);
  }

  entityToApi(entity: QcmEntity): Qcm {
    const qcmProps: QcmProps = {
      ...entity
    };

    return Qcm.create(qcmProps);
  }
}
