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

## 使用说明

- 使用`19wu2lucky.py`生成抽奖数据,一定要在第一步进行!否则没有数据,界面不能工作.

```python 19wu2lucky.py 19wu导出报名表```

- 使用 chrom 浏览器打开 index.html

- 开始抽奖

  + 点击按钮或按空格键来滚动抽奖者和抽奖

  + 如果中奖人不在现场，单击展示的名字区别标记

## 折腾过程

### 鸣谢

首先要感谢Beijing的志愿者[@xch](https://github.com/xch89820)&[@imbugs](https://github.com/imbugs)

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

^.^ thx 作者!

为了统一logo大小,进行人肉PS! 统一 200 x 100！舒畅！

## Ending

个人水平比较挫,各路支援/如此折腾的机会也是难得,感谢PyCon China!

使用过程中任何问题CallMe!
