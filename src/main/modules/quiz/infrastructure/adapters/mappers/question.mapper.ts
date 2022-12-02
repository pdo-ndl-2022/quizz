import { AbstractMapper } from "../../../../../core/helpers/abstract.mapper";
import {
  QuestionProps,
  Question
} from "../../../domain/entities/question.entity";
import { QuestionEntity } from "../repositories/entities/question.entity";

export class QuestionMapper extends AbstractMapper<QuestionEntity, Question> {
  apiToEntity(apiModel: Question): QuestionEntity {
    const entity: QuestionEntity = {
      id: apiModel.id,
      label: apiModel.label,
      category: apiModel.category,
      options: JSON.stringify(apiModel.options),
      answers: JSON.stringify(apiModel.answers),
      docs: apiModel.docs.join(","),
      avg_score: apiModel.avg_score,
      nb_answers: apiModel.nb_answers
    };

    return Object.assign(new QuestionEntity(), entity);
  }

  entityToApi(entity: QuestionEntity): Question {
    const questionProps: QuestionProps = {
      id: entity.id,
      label: entity.label,
      category: entity.category,
      options: JSON.parse(entity.options),
      answers: JSON.parse(entity.answers),
      docs: entity.docs.split(","),
      avg_score: entity.avg_score,
      nb_answers: entity.nb_answers
    };

    return Question.create(questionProps);
  }
}
