# Rede Social Interativa

Esse projeto tem como objetivo a construção de um aplicativo mobile de uma rede social interativa, onde os usuários podem se cadastrar, interagir com postagens e visualizar conteúdos personalizados de acordo com seus interesses.

---

## Objetivo 

Criar um frontend mobile em **React Native** para uma rede social, permitindo que os usuários:
- Cadastrem-se na plataforma;
- Realizem login;
- Visualizem postagens de outros usuários;
- Curtam e comentem postagens;
- Criem novas postagens com texto e imagem;
- Excluam suas próprias postagens;
- Possam seguir outros usuários e receber conteúdos relevantes no feed;
- Possam visualizar um perfil com suas postagens e interações.

---

## Requisitos do Sistema

- [ ] O sistema deve permitir que o usuário se cadastre (Nome completo, login e senha).
- [ ]  O usuário deve conseguir realizar login (Apenas login e senha, sem autenticação real por enquanto).
- [ ]  O usuário deve visualizar postagens no feed (por enquanto, os dados podem ser mockados).
- [ ]  O usuário pode curtir e comentar nas postagens.
- [ ]  O usuário pode criar novas postagens com texto e imagem.
- [ ]   O usuário pode excluir suas próprias postagens.
- [ ]   O usuário pode seguir outros usuários e receber postagens no feed com base nisso.
- [ ]   O usuário pode visualizar seu perfil, incluindo postagens e interações.

---

## Requisitos de Projeto

- **Interface totalmente visual**: O aplicativo deve ser funcional e intuitivo, mas não precisa estar conectado a um servidor no momento.
- **Código bem estruturado**: O código deve seguir boas práticas de programação, organização de arquivos e nomenclatura clara.
- **Modelagem de dados simples**:
  - Um **usuário** deve ter:
    - Nome completo;
    - Identificador único (por exemplo, e-mail ou CPF);
    - Login e senha.
  - Uma **postagem** deve conter:
    - Texto;
    - Imagem (opcional);
    - Autor;
    - Data de publicação.
  - Uma **interação** (curtida ou comentário) deve conter:
    - Usuário que interagiu;
    - Tipo da interação (curtida/comentário);
    - Conteúdo do comentário (se aplicável);
    - Data da interação.

---

## 📌 Observações

- **Por enquanto, todas as funcionalidades são fictícias** e não há necessidade de conexão com um backend real.
- A única forma de interação com postagens é através de curtidas e comentários.
- O projeto pode evoluir posteriormente para incluir autenticação real, banco de dados e integração com API.

---

##  Tecnologias Utilizadas

- **React Native** para a construção do aplicativo;
- **Styled Components** ou **Tailwind CSS** para estilização;
- **Context API** ou Redux para gerenciamento de estado (opcional);
- **React Navigation** para navegação entre telas;
- **Mock de dados** para simular postagens e interações.

---

## Próximos Passos

- Implementação da autenticação real.
- Conexão com um backend para persistência de dados.
- Melhorias na interface do usuário.
- Adição de novas funcionalidades, como compartilhamento de postagens e notificações.
