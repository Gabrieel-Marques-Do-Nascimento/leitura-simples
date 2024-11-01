from PIL import Image, ImageDraw, ImageFont, ImageEnhance
from random import randint
import imageio
import os
import os
import numpy as np


path = os.path.dirname(__file__)
path = os.path.join(path, "")
print(path)
items = os.listdir(path+"img2")
items.sort()
print(items)


class Images_From_GIF:
    def __init__(self, name: str, size: tuple, dest: str) -> None:
        """
        Inicializa a classe com o nome do GIF, o tamanho desejado para redimensionamento das imagens e o destino.
        """
        self.name = name
        self.dest = dest
        self.size = size

    def resize(self, images: list) -> list:
        """
        Redimensiona uma lista de imagens para o tamanho especificado.
        """
        resized_images = []
        for img in images:
            resized_img = img.resize(self.size, Image.LANCZOS)
            resized_images.append(np.array(resized_img))
        print(f"Imagens redimensionadas: {len(resized_images)}")  # Depuração
        return resized_images

    def imgs_from_gif(self, images: list, duration: float, repeat_frames: int = 3) -> None:
        """
        Salva uma lista de imagens como um GIF no destino especificado com o nome dado e a duração.
        e permite repetir os frames um sertã quotidade de vesse
        """
        if not images:
            print("Erro: A lista de imagens está vazia.")
            return

        # repetindo cada frame uma serta quantidade `repeat_frames` de vesse
        extended_images = []
        for img in images:
            extended_images.extend([np.array(img)] * repeat_frames)

        # Convertendo todas as imagens para arrays NumPy
        images_array = [np.array(img) for img in images]
        path = os.path.join(self.dest, self.name)

        try:
            imageio.mimsave(path, extended_images,loop=0, duration=duration, )
            print(f"GIF salvo em: {path}")
        except Exception as e:
            print(f"Erro ao salvar o GIF: {e}")

    def img_list(self, path: str, sort=False) -> list:
        """
        Carrega uma lista de imagens em um diretório especificado.
        """
        lista = os.listdir(path)
        if sort:
            lista.sort()
        imgs = []
        for item in lista:
            print(os.path.join(path, item))
            if item.endswith(("png", "jpg", "jpeg")):
                img = Image.open(os.path.join(path, item))
                imgs.append(img)
        print(f"Imagens carregadas: {len(imgs)}")  # Depuração
        return imgs


if __name__ == "__main__":
    size = (850, 436)

    gif = Images_From_GIF("font_size.gif", size, path)
    imgs = gif.img_list(path+"img2", sort=True)

    imgs = gif.resize(imgs)
    gif.imgs_from_gif(imgs, 13.0, repeat_frames=50)
