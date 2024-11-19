Para listar todos os usuários cadastrados, podemos criar uma nova rota na API que retorne os dados armazenados no banco. Essa rota será implementada como um método GET para exibir os usuários.

Código Atualizado

Adicione a seguinte rota ao seu código:

# Rota para Listar Todos os Usuários
@app.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()  # Consulta todos os usuários no banco de dados
    users_list = [{'id': user.id, 'username': user.username} for user in users]
    return jsonify(users_list), 200


---

Código Completo com a Nova Rota

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# Inicialização do Flask e Configuração do Banco de Dados
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Banco SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelo para Usuários
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Rota para Registro de Usuário
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Faltam dados no registro'}), 400

    # Verifica se usuário já existe
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Usuário já existe'}), 400

    # Criação de usuário
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuário registrado com sucesso!'}), 201

# Rota para Login de Usuário
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Faltam dados no login'}), 400

    # Busca usuário no banco
    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        return jsonify({'message': 'Login realizado com sucesso!'}), 200
    else:
        return jsonify({'error': 'Credenciais inválidas'}), 401

# Rota para Listar Todos os Usuários
@app.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()  # Consulta todos os usuários no banco de dados
    users_list = [{'id': user.id, 'username': user.username} for user in users]
    return jsonify(users_list), 200

# Executa o servidor
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Criação do banco de dados
    app.run(host='0.0.0.0', port=5000)


---

Como Testar a Nova Rota

1. Inicie o servidor novamente:

python app.py


2. Use curl ou uma ferramenta como Postman para acessar a rota /users:

curl -X GET http://127.0.0.1:5000/users


3. Se houver usuários cadastrados, você verá uma resposta JSON como esta:

[
    {"id": 1, "username": "usuario1"},
    {"id": 2, "username": "usuario2"}
]



Se precisar de algo mais, é só perguntar!






Para adicionar a funcionalidade de deletar um usuário, você pode criar uma nova rota que use o método HTTP DELETE. Essa rota irá buscar um usuário pelo id e removê-lo do banco de dados.

Aqui está como você pode implementar a função de deletar um usuário:

Função para Deletar Usuário

Adicione a seguinte rota ao seu código:

# Rota para Deletar um Usuário
@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)  # Busca o usuário pelo ID

    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    db.session.delete(user)  # Deleta o usuário
    db.session.commit()

    return jsonify({'message': 'Usuário deletado com sucesso'}), 200

Explicação do Código

/user/<int:id>: A URL agora recebe um parâmetro id, que representa o ID do usuário a ser deletado.

User.query.get(id): Consulta o banco de dados para encontrar o usuário com o id fornecido.

db.session.delete(user): Remove o usuário da sessão do banco de dados.

db.session.commit(): Aplica a alteração no banco de dados.



---

Código Completo com a Rota de Deletar

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# Inicialização do Flask e Configuração do Banco de Dados
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Banco SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelo para Usuários
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Rota para Registro de Usuário
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Faltam dados no registro'}), 400

    # Verifica se usuário já existe
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Usuário já existe'}), 400

    # Criação de usuário
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuário registrado com sucesso!'}), 201

# Rota para Login de Usuário
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Faltam dados no login'}), 400

    # Busca usuário no banco
    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        return jsonify({'message': 'Login realizado com sucesso!'}), 200
    else:
        return jsonify({'error': 'Credenciais inválidas'}), 401

# Rota para Listar Todos os Usuários
@app.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()  # Consulta todos os usuários no banco de dados
    users_list = [{'id': user.id, 'username': user.username} for user in users]
    return jsonify(users_list), 200

# Rota para Deletar um Usuário
@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)  # Busca o usuário pelo ID

    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    db.session.delete(user)  # Deleta o usuário
    db.session.commit()

    return jsonify({'message': 'Usuário deletado com sucesso'}), 200

# Executa o servidor
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Criação do banco de dados
    app.run(host='0.0.0.0', port=5000)


---

Como Testar a Rota de Deletar

1. Inicie o servidor:

python app.py


2. Use o curl ou o Postman para testar a rota /user/<id>:

Exemplo de comando para deletar um usuário com ID 1:

curl -X DELETE http://127.0.0.1:5000/user/1

Se o usuário for encontrado e deletado, você verá a seguinte resposta:

{
    "message": "Usuário deletado com sucesso"
}

Caso o usuário não exista, a resposta será:

{
    "error": "Usuário não encontrado"
}



Se tiver mais dúvidas ou precisar de ajustes, é só avisar!


