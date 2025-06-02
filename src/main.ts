import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    const config = new DocumentBuilder()
        .setTitle('Shopping Cart Backend')
        .setDescription('Documentação automática das rotas de usuários')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
    await app.listen(3000);
    console.log('🚀 Servidor rodando em http://localhost:3000');
    console.log('📄 Documentação Swagger em http://localhost:3000/api-docs');
}
bootstrap();
