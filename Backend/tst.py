from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import configparser

# Carregando o arquivo de configuração
config = configparser.ConfigParser()
config.read('config.ini')

# Inicializando o app Flask
app = Flask(__name__)

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = config['default']['DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = config.getboolean('default', 'MODIFICATIONS')

db = SQLAlchemy(app)

if __name__ == "__main__":
    app.run(debug=True)