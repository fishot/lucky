# coding: utf-8

def mklucky(exportfile):
    lucky_data = []
    datas = open(exportfile,"r")
    lines = datas.readlines()[1:]
    for line in lines:
        line = line.strip("\r\n")
        print line
        lucky_data.append(line)
    print lucky_data
    datas.close()
    f = open("./js/luckydata.js","w")
    db = "var data = ['%s']" % "','".join(lucky_data)
    f.write(db)
    f.close()

if __name__ == "__main__":
    import sys
    if len(sys.argv) <= 1:
       print "               *********************************************"
       print "               * 19wu2lucky.py                             *"
       print "               *                                           *"
       print "               *     -- PyCon China 2014 lucky data maker  *"
       print "               *                                           *"
       print "               * Usage: python 19wu2lucky.py 19wu_data.csv *"
       print "               *                                           *"
       print "               *                   By: chen_coyote@qq.com  *"
       print "               *********************************************"
    else:
       mklucky(sys.argv[1])