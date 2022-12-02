import {
  Controller,
  Get,
  Post,
  UnprocessableEntityException,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Me, User as MeUser } from "src/main/modules/decorator/me.decorator";
import { User } from "../../domain/entities/user.entity";
import { UserService } from "../services/user.service";

@Controller("users")
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/")
  async getAll() {
    return await this.userService.findAll();
  }

  @Post("/score")
  async incrementScore(@Me() meUser: MeUser) {
    if (!meUser) return new UnprocessableEntityException();
    let user: User;
    try {
      user = await this.userService.findOne(meUser.email);
    } catch (e) {
      if (!user) user = await this.userService.create(meUser);
    }
    return await this.userService.incrementScore(user.email);
  }
}
