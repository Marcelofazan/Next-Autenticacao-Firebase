## 🌐 Next-Autenticacao-Firebase
Exemplo de Dashboard com autenticação Google Firebase em Next.

#### 📋 O que voçê vai ver nesse Projeto
| Tecnologia | Descrição |
|-----------|-----------|
| **Firebase** | Plataforma de desenvolvimento de aplicativos móveis e web criada pelo Google. |
| **js-cookie**  | Biblioteca JavaScript simples e leve para criar, ler e apagar cookies no navegador |

#### 💬 Requisitos do Projeto
- Necessário configurar arquivo .env

#### 🔄 Executar a aplicação
```bash
npm install
npm run dev
```
- Endpoint API **http://localhost:3000/api/hello**
- Abrir a aplicação em **http://localhost:3000**.

#### ⚙️ Configuração Autenticação Firebase Console
- Acesse https://console.firebase.google.com/, selecione a opção Criar um novo projeto do Firebase.
- No menu esquerdo selecione Configurações e clique em Geral. Em configurações de SDK, pegue os valores de chaves na opção NPM

```bash
apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
projectId: "admintemplate-XXXXXX",
authDomain: "admintemplate-XXXXXX.firebaseapp.com",
```

1 - Ativar o Firebase Auth no Painel
- 1.1 - Acesse o Firebase Console.Clique no seu projeto.
- 1.2 - No menu lateral esquerdo, seleciona a opção Segurança e clique em Authentication. Clique no botão Get Started (Começar)

2 - Criar o usuário direto no Firebase
- 2.1 - Clique no seu projeto e vá em Authentication no menu lateral esquerdo.
- 2.2 - Na aba Users (Usuários), clique no botão Add user (Adicionar usuário).
- 2.3 - Digite o e-mail e a senha que você deseja usar para testar.
- 2.4 - Volte na tela do seu sistema, use exatamente essas credenciais e tente logar.

3 - Ativar o **Provedor Google no Firebase**
- 3.1 - Abra o seu projeto e vá em Authentication no menu lateral esquerdo.
- 3.2 - Clique na aba Sign-in method (Método de login).
- 3.3 - Clique no botão Add new provider (Adicionar novo provedor) e selecione Google e Altere a chave seletora para Enabled (Ativado).
- 3.4 - No campo Project support email (E-mail de suporte do projeto), selecione o seu e-mail de desenvolvedor na lista suspensa (este campo é obrigatório). Clique em Salvar.
