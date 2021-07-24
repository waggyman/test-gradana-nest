import { Controller, Get, Post, Body, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { NextFunction, Request, Response } from 'express';
import { AddBalanceDTO } from './user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/test')
  test(): string {
    return this.userService.getTest();
  }

  @Post('/add-balance')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addBalance(
    @Res() res: Response,
    @Body() body: AddBalanceDTO,
    @Req() req: Request,
  ) {
    const reqUser = JSON.parse(req.headers["x-userinfo"].toString());
    // find from user
    const user = await this.userService.findUser(reqUser._id);

    const addBalance = await this.userService.addUserBalance(user, +body.value);
    // add the balance
    
    return res.status(200).json({success: true, currentBalance: addBalance.currentBalance, message: "Balance added"})
  }
}
