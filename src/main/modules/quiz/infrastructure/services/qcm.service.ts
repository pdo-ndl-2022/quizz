import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateQcmDto } from "../../application/dto/create-qcm.dto";
import { Qcm } from "../../domain/entities/qcm.entity";
import { PsqlQcmRepository } from "../adapters/repositories/psql-qcm.repository";

@Injectable()
export class QcmService {
  constructor(private readonly qcmRepository: PsqlQcmRepository) {}

  async findOne(id: string): Promise<Qcm> {
    const qcm = await this.qcmRepository.findOne(id);
    if (!qcm) throw new NotFoundException();
    return qcm;
  }

  async findAll(): Promise<Qcm[]> {
    return await this.qcmRepository.findAll();
  }

  async create(createQcmDto: CreateQcmDto): Promise<Qcm> {
    const qcm = Qcm.create(createQcmDto);
    return await this.qcmRepository.save(qcm);
  }

  async delete(id: string): Promise<void> {
    const qcm = await this.qcmRepository.findOne(id);
    if (!qcm) throw new NotFoundException();
    return await this.qcmRepository.remove(id);
  }
}
