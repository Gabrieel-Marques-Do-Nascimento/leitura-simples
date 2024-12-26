from PIL import Image, ImageDraw, ImageFont, ImageEnhance
from random import randint
import imageio


def create_image(porcentages):
    image = Image.new('RGB', (500, 280), 'Gray')
    draw = ImageDraw.Draw(image)
    fonte = ImageFont.truetype("font/ARIAL.TTF", 20)
    draw.rounded_rectangle([(40, 240), (460, 270)],
                           radius=20, outline="black", width=3, fill="Gray")
   # nao intendi
    # porcentagem_texto_image = max(0, min(porcentages, 100))
    # porcentagem_de_preenchimento = 44 + (455 * (porcentagem_texto_image / 100))

    # porcentagem+10 da erro no gif  subst: porcent = 44+(455 * (porcentages/100))
    porcent = 44+(455 * (porcentages/100))
    draw.rounded_rectangle([(44, 242), (int(porcent), 268)],
                           radius=20, outline="red", width=3, fill="red")
    draw.text((250, 243), f"{ str(porcentages)}%", font=fonte, fill="black")
    return image


lista = []
randomi = randint(1, 101)
for frame in range(1, randomi):
    lista.append(create_image(frame))
imageio.mimsave('gif/de_0_a_100.gif', lista, duration=0.1)
print(randomi)


from PIL import Image
import numpy as np

def resize_images(images, target_size):
    resized_images = []
    for img in images:
        resized_img = img.resize(target_size, Image.ANTIALIAS)
        resized_images.append(np.array(resized_img))
    return resized_images
