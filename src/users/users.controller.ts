import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('products')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @ApiOperation({ summary: 'Registration'})
  @ApiResponse({
    status: 201,
    description: 'A new user was successfully added',
    schema: {
      type: 'object',
      properties: {    
        id: { type: 'string', example: '1' },
        email: { type: 'string', example: 'test1@gmail.com' },
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'This email is already in use',
  })
  @ApiBody ({
    schema: {
      type: 'object',
      properties: {    
        email: { type: 'string', example: 'test1@gmail.com' },
        password: { type: 'string', example: '12345678' },
      }
    }
  })
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.usersService.update(+id, updateUserDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.usersService.remove(+id);
//   }
}
