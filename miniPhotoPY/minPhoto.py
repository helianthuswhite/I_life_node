# -*- coding: utf-8 -*-

import PIL.Image as Image
import sys

print(sys.argv[1])
print(sys.argv[2])
print(sys.argv[3])
print(sys.argv[4])

foo = Image.open(sys.argv[1])
foo = foo.resize((int(sys.argv[2]), int(sys.argv[3]), Image.ANTIALIAS)
foo.save(sys.argv[4], quality=95)

