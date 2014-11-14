# PyCon Lucky

PyCon China 2014 活动抽奖工具

## 写在最前
最好在使用之前提前根据现场环境进行调试

Lucky受到现场:

- 屏幕
- NoteBook
- Browser
- etc..不固定因素影响

建议:

- 4:3分辨率
- Mac OS or Win7/8
- Chrome

## 目录

```
lucky
|____19wu_data.csv      //19wu导出数据
|____19wu2lucky.py      //生成数据工具,针对19wu数据
|____js
| |____application.js   // 主要功能js
| |____luckydata.js     // 主要数据js来自19wu2lucky.py
| |____lib
| | |____jquery-1.8.0.min.js
| | |____rand.js        // 主要随机算法
| | |____unslider.min.js
|____stylesheets
| |____style.css        //主要样式文件
|____images             // 二次处理过得logos
| |____....png
|____README.md
```


## 抽奖工具说明

### 导入数据

- 使用`19wu2lucky.py`用19wu导出数据生成抽奖数据

  + 如果没有经过签到处理,需要人工处理为csv格式`签到码,门票,姓名,Email`
  + 人工将赞助商信息填写到`export.csv` `签到码,门票`留空 且 `姓名=来源` & `Email=手机号`
  + 人工将蟒人赞助信息填写到`export.csv` `签到码,门票`留空 且 `姓名`&`Email`保持一致
  + ```python 19wu2lucky.py /path/.../export.csv```

- 使用`checkin2lucky.py`用checkin数据生成抽奖数据

  + 签到后点击导出保存`checked.txt`
  + `checkin2lucky.py /path/.../checked.txt`

### 开始抽奖

- 使用 chrom 浏览器打开 index.html
- 点击按钮或按空格键来滚动抽奖者和抽奖
- 如果中奖人不在现场，单击展示的名字区别标记

## 注意事项
- 通过签到导入数据,然后进行签到,签到完成后导出结果,整合结果,再进行一步导入到抽奖工具中
- 不通过签到,直接导入报名参会的信息到lucky,直接使用19wu2lucky.py导入即可
- 两种方法选取一种即可


## 签到工具说明
`注意!` **还未可用!**

- demo: [PyCon 2014 Lucky](http://pyconchina.github.io/lucky/checkin.html)

## 面板功能

面板功能完成签到数据导入和导出

### 导入数据

>签到工具使用前需要分别导入部分数据，
对应的数据文件会由组委会提供给会场志愿者。

>签到工具处理的数据文件都是按照一定规则约定的csv文件，
如果会场志愿者拿到的数据文件（可能是xls文件）不符合下面的规则，
可以使用Excel或WPS简单处理之后另存为csv文件。

**通用规则**

 - 使用UTF-8编码，CLRF作为行分隔符
 - 保留头行(header row)，导入文件时程序会判断该行

**数据格式**

各文件的数据格式（也是header row的内容）如下

 - 普通购票：`签到码,门票,姓名,Email`
 - 赞助商赠票：`手机号,来源,计划参会城市`
 - 个人捐赠：`姓名,邮件,昵称`

### 导出数据

导出文件遵从导入文件的通用规则，
其数据格式为`签到码,门票,姓名,Email`，
其中`签到码`和`门票`为了格式统一而填充的伪数据。

----

## 折腾过程
![141114-lucky-mobile-coding.jpg（JPEG 图像，480x854 像素） - 缩放 (88%)](http://pyconcn.qiniudn.com/zoomquiet/res/141114-lucky-mobile-coding.jpg?imageView2/2/h/360)

有非常髙大上的移动开发情景出没!

### 鸣谢

首先要感谢Beijing的志愿者[@xch](https://github.com/xch89820)&[@imbugs](https://github.com/imbugs)

以及同为技术组的[@Todd Gao](https://github.com/7c00)同学

随机算法依旧继承[@lxneng](https://github.com/lxneng)前辈的

### 优化

在逻辑上优化了几点：

- 抽中的在界面明显位置进行展示

- 抽中的在之后的抽奖中不再中奖
    + 不在场的区别并标记，按照中奖处理

- 根据`Name/Email`进行展示
    + Email 进行了 hidden 保护个人隐私很重要

为了省去大部分时间调整人名单，添加`19wu2lucky.py`

- 根据19wu提供的报名表，直接生成./js/luckdata.js无需其他操作。

### 折腾

最头痛的时赞助商logo

- 赞助商分级别
- 不同级别赞助商多少不同
- logo大小不比例统一

占据将近50%来po赞助商logo

使用[unslider.js](http://www.bootcss.com/p/unslider/)轮播组件来展示logo最好不过!

^.^ thx 致谢

为了统一logo大小,进行人肉PS! 统一 200 x 100

### 遗憾

由于任务接到时已经接近大会举行,所以准备比较仓促,很多细节优化不能够做到更好
签到任务又是迫在眉睫,技术组应急反应迅速完成签到功能,也有部分功能不够完善.

## Ending

个人水平比较挫,各路支援/如此折腾的机会也是难得,感谢PyCon China!

使用过程中任何问题CallMe!
