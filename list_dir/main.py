import os






class List_Dir_Module:
    def __init__(self):
        self.dark_list = ['.git', '.vscode', 'list_dir', '.mypy_cache','exmplos', '.netlify', '.info']

    def start(self):
        print(self.dark_list)
        return self
    

    def __dark_list_modules(self, List: list):
        temp = List
        for i in temp:
            for j in self.dark_list:
                if i == j:
                    List.remove(i)
                    break
            # if i in self.dark_list or i.startswith('.') or i == '.git':
            #     print('iginored', i)
            #     List.remove(i)
        return List
    
    def list_modules(self, dir_base, List: list = [], direc: str = None):
        temp_directory = dir_base
        temp: list = self.__dark_list_modules(os.listdir(temp_directory))
        
        temp2: list = List
        for i in temp:
            if os.path.isdir(os.path.join(temp_directory, i)):
                self.list_modules(os.path.join(temp_directory,i), temp2, os.path.join(direc, i) if direc else i)
            else:
                temp2.append(os.path.join(direc, i) if direc else i)
        return temp2