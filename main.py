from list_dir import  os, List_Dir_Module


ld = List_Dir_Module()
ld.start()



print(ld.list_modules(os.path.dirname(__file__)))