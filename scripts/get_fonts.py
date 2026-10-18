import os, re, ssl, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'fonts')
os.makedirs(OUT, exist_ok=True)
CTX = ssl._create_unverified_context()
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

ZH = '小克剪辑最终版打死不改素材转场文字调整闪光饱和度缩放冲击速度导出已自动保存终端写代码画出时间轴预览面板钻开工这段在发呆对焦拜拜哐当空心入网已提交已修正撤销前方高能预警好耶霓虹卡点渲染中完成拿捏了秒剪完收工拉面柴犬夜景旋转翻页故障滑动溶解分享片段总时长导入自动保存蹦迪太亮了爆表收起'
ASCII = ''.join(chr(i) for i in range(32, 127))
PUNCT = '，。！？：、（）“”‘’·—…《》【】✨⭐️'
TEXT = ZH + ASCII + PUNCT

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=60, context=CTX) as r:
        return r.read()

def get_css(family, text, prefix):
    q = urllib.parse.quote(text, safe='')
    url = f'https://fonts.googleapis.com/css2?family={family}&display=block&text={q}'
    css = fetch(url).decode('utf-8')
    blocks = re.findall(r'@font-face\s*\{[^}]*\}', css)
    out = []
    for i, block in enumerate(blocks):
        m = re.search(r'url\((https://[^)]+)\)', block)
        if not m:
            continue
        font_url = m.group(1)
        data = fetch(font_url)
        name = f'{prefix}-{i}.woff2'
        with open(os.path.join(OUT, name), 'wb') as f:
            f.write(data)
        block = block.replace(font_url, f'./{name}')
        out.append(block)
        print('font', name, len(data))
    with open(os.path.join(OUT, f'{prefix}.css'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(out))
    return len(out)

n1 = get_css('ZCOOL+KuaiLe', TEXT, 'zcool')
n2 = get_css('Luckiest+Guy', 'BONK!', 'luckiest')
n3 = get_css('Caveat', '30 Opus 5.5 — 小克 收工', 'caveat')
print('faces', n1, n2, n3)

for path, dest in [
    ('ofl/zcoolkuaile/OFL.txt', 'OFL-ZCOOL-KuaiLe.txt'),
    ('ofl/luckiestguy/OFL.txt', 'OFL-Luckiest-Guy.txt'),
    ('ofl/caveat/OFL.txt', 'OFL-Caveat.txt'),
]:
    try:
        data = fetch('https://raw.githubusercontent.com/google/fonts/main/' + path)
        with open(os.path.join(OUT, dest), 'wb') as f:
            f.write(data)
        print('license', dest, len(data))
    except Exception as e:
        print('license failed', dest, e)
