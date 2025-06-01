import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    HttpCode,
    HttpStatus,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { LoginUserDto } from './dto/login-user.dto';
  import { User } from './entities/user.entity';
  
  import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
  
  @ApiTags('users')
  @Controller('users')
  export class UserController {
    constructor(private readonly usersService: UserService) {}
  
    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: User })
    @ApiBadRequestResponse({ description: 'Dados inválidos no payload' })
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.usersService.create(createUserDto);
    }
  
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login simplificado de usuário' })
    @ApiResponse({ status: 200, description: 'Login bem-sucedido, retorna dados do usuário', type: User })
    @ApiBadRequestResponse({ description: 'Credenciais inválidas' })
    @UsePipes(new ValidationPipe({ whitelist: true }))
    login(@Body() loginDto: LoginUserDto): Promise<User> {
      return this.usersService.login(loginDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Lista todos os usuários' })
    @ApiResponse({ status: 200, description: 'Array de usuários', type: [User] })
    findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Busca um usuário pelo ID' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado', type: User })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    findOne(@Param('id') id: string): Promise<User> {
      return this.usersService.findOne(+id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza um usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado', type: User })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @UsePipes(new ValidationPipe({ whitelist: true }))
    update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
      return this.usersService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Remove um usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário removido', type: User })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    remove(@Param('id') id: string): Promise<User> {
      return this.usersService.remove(+id);
    }
  }