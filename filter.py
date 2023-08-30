from zipfile import ZipFile
from xml.dom import minidom
from glob import glob
from PIL import Image
import sys
import io

valid_colors = []

# Blue light filter algorithm
def blue_filter(r, g, b):
    return r, g, int(b * 0.75), 255

# Check the Krita .kpl file
with ZipFile('./www/assets/lospec500.kpl', 'r') as zf:
    with io.TextIOWrapper(zf.open('colorset.xml', 'r'), encoding = 'utf-8') as f:
        tree = minidom.parseString(f.read())
        for entry in tree.documentElement.childNodes:
            for rgb in entry.childNodes if type(entry) == minidom.Element else []:
                if not (type(rgb) == minidom.Element and rgb.tagName == 'RGB'):
                    continue
                r = int(float(rgb.getAttribute('r')) * 255)
                g = int(float(rgb.getAttribute('g')) * 255)
                b = int(float(rgb.getAttribute('b')) * 255)
                valid_colors.append((r, g, b))
                r1, g1, b1, _ = blue_filter(r, g, b)
                rgb.setAttribute('r', str(r1 / 255))
                rgb.setAttribute('g', str(g1 / 255))
                rgb.setAttribute('b', str(b1 / 255))

# Write the updated palette file to memory
with ZipFile('./www/assets/lospec500.kpl', 'w') as zf:
    with io.TextIOWrapper(zf.open('colorset.xml', 'w'), encoding = 'utf-8') as f:
        f.write(tree.toprettyxml())

# Print valid colors
print('Valid colors:')
for color in valid_colors:
    r, g, b = color
    print(f'{r}, {g}, {b}')

# Run this for each requested file
for filepath in glob('./www/assets/*.png'):
    print(filepath)

    # Open the requested image
    img = Image.open(filepath)
    data = img.load()
    w, h = img.size

    # Apply blue light filter
    for y in range(h):
        for x in range(w):
            r, g, b, a = data[x, y]
            if a != 255:
                data[x, y] = r, g, b, 0
                continue
            if (r, g, b) not in valid_colors:
                raise Exception(f'Invalid color ({r}, {g}, {b}) at ({x}, {y})')
            data[x, y] = blue_filter(r, g, b)

    # Write back to file
    img.save(filepath)