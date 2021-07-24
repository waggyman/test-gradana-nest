import { HttpModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
          name: UserModel.name,
          schema: UserSchema,
        },
    ]),
    HttpModule.register({ timeout: 10000, maxRedirects: 0 })
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
