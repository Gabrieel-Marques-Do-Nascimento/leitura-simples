### Documentação da API com Flask

Este é um exemplo de API RESTful usando Flask, com funcionalidades para registro, login, listagem e exclusão de usuários. A API utiliza um banco de dados SQLite para persistir informações de usuários e o `SQLAlchemy` como ORM.

#### Dependências

- **Flask**: Framework web utilizado para criar a API.
- **Flask-SQLAlchemy**: Extensão para facilitar a interação com o banco de dados SQLite.
- **Werkzeug**: Utilizado para gerar e verificar senhas de forma segura.

### Configuração do Projeto

1. **Instalação das dependências**:
   Certifique-se de ter as dependências necessárias instaladas no seu ambiente Python:

   ```bash
   pip install flask flask_sqlalchemy werkzeug
   ```

2. **Estrutura do Banco de Dados**:
   A aplicação usa o SQLite, com uma tabela de usuários (`users`) onde são armazenados `id`, `username` e `password` (senhas criptografadas).

### Código e Funcionalidades

#### 1. **Inicialização da Aplicação**

```python
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Banco SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
```

- A aplicação Flask é inicializada.
- Configura-se a URI do banco de dados SQLite como `sqlite:///users.db` e desabilita o rastreamento de modificações.

#### 2. **Modelo de Usuário (User)**

```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
```

- Define o modelo `User`, com três campos:
  - `id`: Identificador único do usuário.
  - `username`: Nome de usuário único.
  - `password`: Senha do usuário (armazenada de forma criptografada).

#### 3. **Rota de Registro de Usuário (`/register`)**

```python
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Faltam dados no registro'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Usuário já existe'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuário registrado com sucesso!'}), 201
```

- Recebe dados em formato JSON (`username` e `password`).
- Verifica se todos os dados necessários foram fornecidos e se o nome de usuário já existe.
- A senha é criptografada utilizando `generate_password_hash` do `werkzeug`.
- Cria o novo usuário no banco de dados e responde com uma mensagem de sucesso.

#### 4. **Rota de Login de Usuário (`/login`)**

```python
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Faltam dados no login'}), 400

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        return jsonify({'message': 'Login realizado com sucesso!'}), 200
    else:
        return jsonify({'error': 'Credenciais inválidas'}), 401
```

- Verifica se o nome de usuário existe e se a senha fornecida corresponde à senha armazenada (verificação usando `check_password_hash`).
- Retorna uma resposta de sucesso ou erro, dependendo do resultado da verificação.

#### 5. **Rota para Listar Todos os Usuários (`/users`)**

```python
@app.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()
    users_list = [{'id': user.id, 'username': user.username} for user in users]
    return jsonify(users_list), 200
```

- Recupera todos os usuários armazenados no banco de dados e os retorna como uma lista em formato JSON.
- Exibe apenas o `id` e `username` de cada usuário.

#### 6. **Rota para Deletar Usuário (`/delete_user/<int:user_id>`)**

```python
@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': f'Usuário com ID {user_id} deletado com sucesso!'}), 200
```

- Permite a exclusão de um usuário baseado no `id` fornecido na URL.
- Caso o usuário não exista, retorna um erro 404.

### Execução da Aplicação

```python
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Criação do banco de dados
    app.run(host='0.0.0.0', port=5000, debug=True)
```

- A aplicação é iniciada na porta `5000`, com o modo de depuração habilitado.
- Se o banco de dados ainda não existir, ele será criado automaticamente.

### Testando a API

Você pode testar a API usando ferramentas como **Postman** ou **cURL** para enviar solicitações HTTP.

1. **Registrar Usuário** (`POST /register`):
   - Body JSON: `{ "username": "usuario1", "password": "senha123" }`

2. **Login de Usuário** (`POST /login`):
   - Body JSON: `{ "username": "usuario1", "password": "senha123" }`

3. **Listar Usuários** (`GET /users`).

4. **Deletar Usuário** (`DELETE /delete_user/<user_id>`).

### Considerações Finais

Este exemplo básico de API com Flask ilustra como criar endpoints para gerenciar usuários em um banco de dados simples usando o SQLAlchemy. A senha é criptografada para garantir a segurança dos dados. A arquitetura é facilmente escalável, permitindo adicionar mais funcionalidades conforme necessário.