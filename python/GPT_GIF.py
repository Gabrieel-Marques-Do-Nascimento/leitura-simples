from PIL import Image, ImageDraw, ImageFont
from random import randint
import imageio
import os

def create_image(porcentage):
    # Cria uma imagem branca de 500x280 pixels
    image = Image.new('RGB', (500, 280), 'white')
    draw = ImageDraw.Draw(image)

    # Tenta carregar a fonte Arial, senão usa a fonte padrão
    try:
        font = ImageFont.truetype("font/ARIAL.TTF", 20)
    except IOError:
        font = ImageFont.load_default()

    # Desenha o fundo da barra de progresso
    draw.rounded_rectangle([(40, 240), (460, 270)], radius=20, outline="black", width=3, fill="Gray")

    # Calcula o comprimento do preenchimento da barra baseado na porcentagem
    fill_percentage = max(0, min(porcentage, 100))
    fill_length = 44 + (455 * (fill_percentage / 100))
    draw.rounded_rectangle([(44, 242), (int(fill_length), 268)], radius=20, outline="red", width=3, fill="red")

    # Adiciona o texto da porcentagem
    draw.text((250, 243), f"{fill_percentage}%", font=font, fill="black")
    
    return image

def main():
    lista = []
    random_value = randint(1, 101)  # Gera um valor aleatório entre 1 e 100

    # Cria imagens para cada valor de 1 até o valor aleatório gerado
    for frame in range(1, random_value):
        lista.append(create_image(frame))
    
    # Cria o diretório de saída se não existir
    output_dir = 'gif'
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, 'GPT_de_0_a_100.gif')
    
    # Salva a lista de imagens como um GIF
    imageio.mimsave(output_path, lista, duration=0.1)

    print(random_value)

if __name__ == "__main__":
    main()
