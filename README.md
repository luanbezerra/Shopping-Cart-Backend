# Shopping Cart Backend

Um sistema de backend para um carrinho de compras online, desenvolvido com NestJS, TypeScript, Prisma e SQLite. Permite gerenciar usuários, produtos, carrinhos e pedidos, oferecendo endpoints REST documentados via Swagger.

---

## 🚀 Tecnologias Utilizadas

- **Framework**: [NestJS](https://nestjs.com/)  
- **Linguagem**: TypeScript  
- **ORM**: [Prisma](https://www.prisma.io/)  
- **Banco de Dados**: SQLite (arquivo local)  
- **Documentação de API**: Swagger (via `@nestjs/swagger`)  
- **Validação de DTOs**: `class-validator` e `class-transformer`  
- **Gerenciador de Pacotes**: pnpm  
- **Seed de dados iniciais**: script TypeScript em `prisma/seed.ts`

---

## Como Rodar o Projeto

1. **Clonar o repositório**  
   ```bash
   git clone <URL_DO_REPOSITORIO> Shopping-Cart-Backend
   cd Shopping-Cart-Backend
   ```

2. **Criar arquivo de ambiente**  
   - Copie o arquivo de exemplo e ajuste se necessário:
     ```bash
     cp .env.example .env
     ```
   - No `.env`, defina a variável de conexão.
     ```
     DATABASE_URL="file:./dev.db"
     ```

3. **Executar o setup do projeto**  
   ```bash
   pnpm run setup
   ```
   
   ou então executar manualmente o setup do projeto
   ```bash
   pnpm install
   npx prisma generate
   npx prisma db seed
   ```
   Isso irá rodar `ts-node prisma/seed.ts` e popular o banco com usuários, produtos, carrinhos e pedidos de exemplo.

7. **Iniciar a aplicação**  
   ```bash
   pnpm run start:dev
   ```
   O servidor ficará disponível em `http://localhost:3000`.

8. **Acessar a documentação no Swagger**  
   Abra no navegador:
   ```
   http://localhost:3000/api-docs
   ```
   A partir daí, você pode testar todos os endpoints de usuários, produtos, carrinho e pedidos.
