import os
import re

files = os.listdir("./")
patt = r"(\w+)_(\w+)_(\w+).(\w+)"
for f in files:
    res = re.match(patt, f)
    if res:
        print '<li><img src="./images/sponsors/%s" class="%s"></li>' % (res.group(0), res.group(3))