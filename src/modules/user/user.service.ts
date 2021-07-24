import { Injectable, HttpService } from '@nestjs/common';
import { ObjectId, Model } from 'mongoose';
import { UserProps, UserModel, UserDocument, TopUpHistoriesProp, StatusOption } from './user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel.name)
        private readonly userModel: Model<UserDocument>,
    ) {}
    getTest(): string {
        return "AAAA";
    }

    async findUser(id: ObjectId): Promise<UserDocument> {
        console.log(id);
        const user = await this.userModel.findOne({_id: id});
        return user;
    }

    async addUserBalance(user: UserDocument, value: number): Promise<UserDocument> {
        const newHistory: TopUpHistoriesProp = {
            date: new Date,
            value,
            historyType: StatusOption.INCOME
        }

        const nextBalance = (user.currentBalance || 0) + value
        
        await user.updateOne({
            currentBalance: nextBalance,
            $push: { histories: { $each: [newHistory] }
        }})

        const newUser = await this.findUser(user._id);
        return newUser;
    }
}