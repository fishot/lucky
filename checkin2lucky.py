# coding: utf-8

def mklucky(exportfile):
    lucky_data = []
    datas = open(exportfile,"r")
    lines = datas.readlines()[1:]
    for line in lines:
        line = line.strip("\r\n")
        name = line.split(",")[0]
        email = line.split(",")[1]
        at = email.find("@")
        print at
        if at != -1:
          if at <= 4:
              hidden = email[0] + "***" + email[at-1:at] + email[at:]
          else:
              hidden = email[0:2] + "***" + email[at-3:at] + email[at:]
        else:
          length = len(email)              
          hidden = email[0:3] + "***" + email[length-4:length]
        line = "%s,%s" % (name, hidden)
        lucky_data.append(line)
    datas.close()
    f = open("./js/luckydata.js","w")
    db = "var data = ['%s']" % "','".join(lucky_data)
    f.write(db)
    f.close()

if __name__ == "__main__":
    import sys
    if len(sys.argv) <= 1:
       print "               *********************************************"
       print "               * checkin2lucky.py                          *"
       print "               *                                           *"
       print "               *     -- PyCon China 2014 lucky data maker  *"
       print "               *                                           *"
       print "               * Usage: python checkin2lucky.py checked.txt*"
       print "               *                                           *"
       print "               *                   By: chen_coyote@qq.com  *"
       print "               *********************************************"
    else:
       mklucky(sys.argv[1])