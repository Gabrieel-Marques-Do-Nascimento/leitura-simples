
# List Directory Module

This module provides functionality to recursively list all files from modules and submodules in a directory structure.

## Features

- Lists all files recursively from a root directory
- Filters module and submodule files
- Returns a list containing all found files
- Supports multiple file extensions
- Handles nested directory structures

## Usage

```python
from list_dir import list_modules

# Get list of all module files
files = list_modules(root_dir="./src")

# Process the files
for file in files:
    print(file)
```

## Returns

Returns a list of strings containing the full paths to all found module files.

## Example Output

```
./src/module1.py
./src/submodule/module2.py
./src/submodule/nested/module3.py
```
