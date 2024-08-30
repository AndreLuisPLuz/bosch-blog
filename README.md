# Nome do Projeto: BlogBosch - Plataforma de Blog
O BlogBosch é uma plataforma de blog onde os usuários podem criar e publicar seus próprios artigos. O sistema permite que os usuários se registrem,
façam login, escrevam artigos, visualizem e comentem em artigos de outros usuários.
# Requisitos Funcionais:
- Autenticação de Usuário:
    - Os usuários devem poder se registrar com um nome de usuário, endereço de e-mail e senha.
    - Os usuários devem poder fazer login usando suas credenciais registradas.
    - A autenticação deve ser implementada usando tokens JWT (JSON Web Tokens) para proteger as rotas e verificar a identidade do usuário.
- Criação de Artigos:
    - Os usuários autenticados devem poder criar, editar e excluir seus próprios artigos.
    - Cada artigo deve ter um título, conteúdo, categoria e tags associadas.
    - Os artigos devem ser armazenados no MongoDB, com referências ao autor (usuário) correspondente.
- Visualização de Artigos:
    - Os usuários devem poder visualizar todos os artigos disponíveis, listados em ordem cronológica inversa (do mais recente ao mais antigo).
    - Os usuários devem poder filtrar os artigos por categoria ou tags.
    - Cada artigo deve mostrar o título, conteúdo, autor, data de publicação e comentários associados.
- Requisitos Técnicos:
    - O back-end do sistema deve ser desenvolvido usando Node.js e Express.js.
    - O banco de dados MongoDB deve ser utilizado para armazenar os usuários e artigos.
    - O front-end do sistema deve ser desenvolvido usando React para a criação das interfaces de usuário.
    - A comunicação entre o front-end e o back-end deve ser feita através de uma API RESTful.