import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username!: string

  @IsEmail()
  email!: string

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0
  }, {
    message: "Password is too week. Must contain 1 uppercase letter, 1 number and minimum 8 symbols."
  })
  password!: string
}

export class LoginUserDto {
  @IsEmail()
  email!: string

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0
  }, {
    message: "Password is too week. Must contain 1 uppercase letter, 1 number and minimum 8 symbols."
  })
  password!: string
}