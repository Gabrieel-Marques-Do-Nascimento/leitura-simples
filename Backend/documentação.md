Vou criar uma API de login e registro de usuários utilizando Flask, ideal para rodar no Termux. O código será simples e explicativo, focando nos conceitos básicos necessários para que você entenda como funciona.


---

Passos para Instalar e Rodar no Termux

1. Instale o Flask no Termux:

pip install flask flask-sqlalchemy


2. Crie o arquivo do projeto, por exemplo, app.py.


3. Copie o seguinte código para o arquivo:




---

Código da API

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

# Inicializa o Banco de Dados
@app.before_first_request
def create_tables():
    db.create_all()

# Executa o servidor
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


---

Como Testar

1. Inicie o servidor:

python app.py


2. Use o curl ou ferramentas como Postman para testar as rotas.

Registro de usuário:

curl -X POST http://127.0.0.1:5000/register -H "Content-Type: application/json" -d '{"username": "usuario", "password": "senha"}'

Login de usuário:

curl -X POST http://127.0.0.1:5000/login -H "Content-Type: application/json" -d '{"username": "usuario", "password": "senha"}'





---

Explicação do Código

1. Banco de Dados SQLite:

Simples e leve, ideal para pequenos projetos.

SQLAlchemy é usado para interagir com o banco.



2. Hash de Senhas:

werkzeug.security protege senhas, gerando e verificando hashes.



3. Estrutura do Código:

@app.route define endpoints de API.

request.get_json() lê dados JSON enviados no corpo da requisição.



4. Execução no Termux:

Configuração do host para 0.0.0.0 permite acessar a API de outros dispositivos na mesma rede.




Se precisar de mais ajuda, avise!


O erro ocorre porque a função @app.before_first_request pode não estar disponível ou está sendo usada incorretamente na versão do Flask instalada.

Aqui está como corrigir o problema:

Solução 1: Substituir @app.before_first_request

Troque a função @app.before_first_request por um bloco de inicialização executado antes do servidor ser iniciado. Isso evita o erro.

Substitua esta parte do código:

@app.before_first_request
def create_tables():
    db.create_all()

Por:

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000)


---

Código Atualizado

O código completo atualizado ficará assim:

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

# Executa o servidor
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Criação do banco de dados
    app.run(host='0.0.0.0', port=5000)


---

Explicação do Ajuste

with app.app_context(): Garante que a aplicação Flask tenha um contexto ativo para inicializar o banco de dados.

db.create_all(): Agora é executado antes do servidor ser iniciado, criando a tabela necessária para os usuários.



---

Como Verificar

1. Teste novamente o código no Termux.

python app.py


2. Certifique-se de que o banco users.db seja criado no diretório do script.



Se tiver mais problemas, estou aqui para ajudar!

