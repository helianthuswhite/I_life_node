# coding:utf-8
import urllib2
import sys


# str：要转成语音的文字
# spd:语速
# pit:音调
# vol：音量
# 以上三个参数默认为5

# 注意token的有效期为一个月
def getVoice(spd, pit, vol):
    token = "24.6d0e94546aa7f990ffabe728bb600cd9.2592000.1478318950.282335-8681692"
    f = urllib2.urlopen("http://tsn.baidu.com/text2audio?tex=" + sys.argv[1] + "&lan=zh&cuid=8681692&ctp=1&tok=" + token + "&spd=" + spd + "&pit=" + pit + "&vol=" + vol)
    file = open("output.wav", "wb")
    file.write(f.read())
    file.close()
    return "output.wav"

getVoice("5", "5", "5")

