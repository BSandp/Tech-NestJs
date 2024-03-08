import {IsEmail,Matches,IsNotEmpty, MinLength,IsString } from "class-validator";

export class createUSerDto{
    @IsNotEmpty()
    readonly id: string;
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    readonly name: string;
    readonly lastname: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    @Matches( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, {
    message : "la contraseña no cumple los requisitos"
   })
    readonly password: string;
}