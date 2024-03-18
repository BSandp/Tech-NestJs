import { Injectable} from "@nestjs/common";
import {ValidatorConstraint, ValidatorConstraintInterface, } from "class-validator";
import { UsersService } from "../users.service";


@ValidatorConstraint({name:'uniqueEmail', async:true})
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
    constructor(private readonly usersService: UsersService){}
    async validate (email: string){
        try{
            await this.usersService.findByEmail(email);
            return true;
        }catch(e){
            return false;
        }
    }
    defaultMessage(){
        return 'Email already exists';
    }

}