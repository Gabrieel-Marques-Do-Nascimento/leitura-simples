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
        # if var=username for encontrado na column=username:
        return jsonify({'error': 'Usuário já existe'}), 400

    # Criação de usuário
    # senha criptografada
    hashed_password = generate_password_hash(password)
    # cria um novo usuario
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    # responde com um sucesso
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
    # user = dados.linha(nome==nome)
    user = User.query.filter_by(username=username).first()
    # busca a linha do banco com o mesmo nome que o usuario esta tentando fazer login
    
    # verifica se o user esiste e se a senha esta correta
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
            

# Rota para Deletar Usuário
@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)  # Busca o usuário pelo ID
    if not user:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': f'Usuário com ID {user_id} deletado com sucesso!'}), 200



# Executa o servidor
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Criação do banco de dados
    app.run(host='0.0.0.0', port=5000, debug=True)