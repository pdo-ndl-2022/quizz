import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateQcmDto } from "../../application/dto/create-qcm.dto";
import { QcmService } from "../services/qcm.service";

@Controller("qcms")
@UseGuards(AuthGuard("jwt"))
export class QcmController {
  constructor(private readonly qcmService: QcmService) {}

  @Get()
  find() {
    return this.qcmService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.qcmService.findOne(id);
  }

  @Post()
  create(@Body() createQcmDto: CreateQcmDto) {
    return this.qcmService.create(createQcmDto);
  }

  @Delete(":id")
  deleteOne(@Param("id") id: string) {
    return this.qcmService.delete(id);
  }
}
