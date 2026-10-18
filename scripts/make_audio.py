"""Code-generated soundtrack for the Remotion recreation.

A 30-second, 92 BPM lo-fi cue with drums, Rhodes-ish chords, bass,
vinyl crackle, UI clicks, whooshes, stamps, glitch and a closing bell.
No downloaded samples.
"""
import numpy as np, wave, os, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'audio')
os.makedirs(OUT, exist_ok=True)
sr = 48000
dur = 30.0
N = int(sr * dur)
rng = np.random.default_rng(20251019)

def t(seconds): return np.arange(int(sr * seconds)) / sr

def add(buf, at, sig, gain=1.0, pan=0.0):
    i = int(at * sr)
    if i >= N: return
    n = min(len(sig), N - i)
    if n <= 0: return
    s = sig[:n] * gain
    l = np.sqrt(0.5 * (1 - pan))
    r = np.sqrt(0.5 * (1 + pan))
    buf[i:i+n, 0] += s * l * 1.414
    buf[i:i+n, 1] += s * r * 1.414

def lp(sig, cutoff):
    if cutoff >= sr / 2 - 100: return sig
    X = np.fft.rfft(sig)
    f = np.fft.rfftfreq(len(sig), 1 / sr)
    X[f > cutoff] *= np.exp(-(f[f > cutoff] - cutoff) / (cutoff * 0.35))
    return np.fft.irfft(X, len(sig))

def hp(sig, cutoff):
    X = np.fft.rfft(sig)
    f = np.fft.rfftfreq(len(sig), 1 / sr)
    X[f < cutoff] *= np.exp(-(cutoff - f[f < cutoff]) / (cutoff * 0.5))
    return np.fft.irfft(X, len(sig))

def decay_env(n, k):
    return np.exp(-k * np.arange(n) / n)

def kick(dur=0.45):
    tt = t(dur)
    f = 58 * np.exp(-5.0 * tt) + 42
    ph = 2 * np.pi * np.cumsum(f) / sr
    x = np.sin(ph) * np.exp(-7.0 * tt)
    x += 0.35 * np.sin(2 * np.pi * 180 * tt) * np.exp(-32 * tt)
    return x

def snare(dur=0.32):
    tt = t(dur)
    noise = lp(rng.normal(0, 1, len(tt)), 5200)
    noise *= np.exp(-14 * tt)
    tone = np.sin(2 * np.pi * 185 * tt) * np.exp(-24 * tt)
    return 0.8 * noise + 0.25 * tone

def hat(dur=0.09):
    tt = t(dur)
    return hp(rng.normal(0, 1, len(tt)), 6500) * np.exp(-55 * tt)

def rhodes(freq, dur=1.6):
    tt = t(dur)
    env = np.exp(-2.8 * tt)
    mod = np.sin(2 * np.pi * freq * 2.01 * tt) * 0.35
    x = np.sin(2 * np.pi * freq * tt + mod)
    x += 0.35 * np.sin(2 * np.pi * freq * 2 * tt) * np.exp(-5 * tt)
    x += 0.12 * np.sin(2 * np.pi * freq * 3 * tt) * np.exp(-8 * tt)
    return x * env

def bass(freq, dur=1.2):
    tt = t(dur)
    x = np.sin(2 * np.pi * freq * tt) + 0.3 * np.sin(2 * np.pi * freq * 2 * tt)
    return lp(x, 320) * np.exp(-2.4 * tt)

def click(dur=0.035, freq=2800):
    tt = t(dur)
    return (np.sin(2 * np.pi * freq * tt) + 0.5 * rng.normal(0, 1, len(tt))) * np.exp(-120 * tt)

def whoosh(dur=0.65, up=True):
    tt = t(dur)
    noise = rng.normal(0, 1, len(tt))
    band = lp(noise, 4200) - lp(noise, 350)
    env = np.sin(np.pi * np.clip(tt / dur, 0, 1)) ** 2
    if up:
        env *= np.linspace(0.2, 1, len(tt))
    return band * env

def stamp(dur=0.5):
    return 0.85 * kick(dur) + 0.5 * lp(rng.normal(0, 1, int(sr*dur)), 900) * np.exp(-28 * t(dur))

def bonk(dur=0.55):
    tt = t(dur)
    f = 240 * np.exp(-9 * tt) + 80
    x = np.sin(2 * np.pi * np.cumsum(f) / sr) * np.exp(-8 * tt)
    x += 0.4 * lp(rng.normal(0, 1, len(tt)), 1800) * np.exp(-35 * tt)
    return x

def bell(freq, dur=1.6):
    tt = t(dur)
    x = np.sin(2 * np.pi * freq * tt) + 0.45 * np.sin(2 * np.pi * freq * 2.01 * tt) + 0.2 * np.sin(2 * np.pi * freq * 3.02 * tt)
    return x * np.exp(-2.2 * tt)

# ---------------------------------------------------------------- music bed
mix = np.zeros((N, 2), dtype=np.float64)
bpm = 92.0
beat = 60.0 / bpm
bar = 4 * beat

chords = [
    (174.61, [349.23, 440.00, 523.25, 659.25]),  # Fmaj7
    (220.00, [261.63, 329.63, 392.00, 493.88]),  # Am7
    (146.83, [293.66, 349.23, 440.00, 523.25]),  # Dm7
    (196.00, [246.94, 293.66, 349.23, 415.30]),  # G7
]
# footstep / vinyl bed
vinyl = np.zeros(N)
for _ in range(2600):
    i = rng.integers(0, N)
    vinyl[i] += rng.normal(0, 0.5)
vinyl = lp(np.convolve(vinyl, np.exp(-0.004 * np.arange(20)), mode='same'), 4200)
add(mix, 0, vinyl, 0.045, -0.15)
# soft tape hiss
hiss = lp(rng.normal(0, 1, N), 5000) * 0.012
mix[:, 0] += hiss
mix[:, 1] += np.roll(hiss, 37)

for b in range(12):
    start = b * bar
    if start > dur: break
    root, notes = chords[b % 4]
    # chords on beat 1 and 3 (slightly strummed)
    for j, f in enumerate(notes):
        add(mix, start + 0.012 * j, rhodes(f), 0.085 if j else 0.10, -0.25 + 0.16 * j)
    for j, f in enumerate(notes[:3]):
        add(mix, start + 2 * beat + 0.012 * j, rhodes(f, 1.2), 0.052, -0.1 + 0.15 * j)
    # bass
    add(mix, start, bass(root), 0.24, 0)
    add(mix, start + 2.6 * beat, bass(root * 1.498), 0.10, 0)
    # drums
    for k in range(2):
        add(mix, start + k * 2 * beat, kick(), 0.42, 0)
        add(mix, start + k * 2 * beat + 2 * beat, snare(), 0.20, 0.06)
        add(mix, start + k * 2 * beat + 2 * beat, kick(), 0.13, 0)
    for h in range(8):
        add(mix, start + h * beat / 2 + (0.024 if h % 2 else 0), hat(), 0.11 if h % 2 == 0 else 0.07, 0.25)
    # sparse bell melody on selected bars
    if b % 4 in (1, 3):
        add(mix, start + 2.5 * beat, bell(root * 4), 0.055, -0.2)
        add(mix, start + 3.5 * beat, bell(root * 6), 0.035, 0.25)

# ---------------------------------------------------------------- sound effects
# typing
for i in range(26):
    add(mix, 0.18 + i * 0.043, click(0.025, 1800 + (i % 5) * 220), 0.10, -0.35 if i % 2 else 0.35)
# editor build / whooshes
for at, g in [(1.42, 0.22), (2.3, 0.13), (3.95, 0.14), (6.0, 0.10), (8.0, 0.13), (10.0, 0.12), (12.0, 0.12), (14.6, 0.11), (18.35, 0.15), (24.0, 0.12), (25.55, 0.12)]:
    add(mix, at, whoosh(0.7), g, -0.1)
# UI pops
for at in [2.35, 4.0, 4.2, 5.0, 8.15, 10.15, 12.1, 14.8, 15.5, 19.0, 21.0, 24.0]:
    add(mix, at, np.sin(2 * np.pi * 760 * t(0.09)) * np.exp(-35 * t(0.09)), 0.07, 0.2)
# stamps
for at in [12.05, 13.55, 24.15]:
    add(mix, at, stamp(), 0.22, 0.0)
# glitch burst / riser into saturation
tt = t(1.1)
glitch = hp(rng.normal(0, 1, len(tt)), 1200) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 23 * tt)))
glitch *= np.linspace(0.0, 1.0, len(tt)) ** 2
add(mix, 15.9, glitch, 0.10, 0.0)
riser = hp(rng.normal(0, 1, int(sr*1.2)), 1800) * np.linspace(0, 1, int(sr*1.2)) ** 2
add(mix, 17.1, riser, 0.12, 0.0)
# bonk / card
add(mix, 21.8, bonk(), 0.24, 0.0)
add(mix, 25.55, bonk(0.8), 0.30, 0.0)
add(mix, 26.1, whoosh(0.8), 0.18, -0.1)
# closing bells
for at, f, g in [(27.0, 523.25, 0.10), (27.35, 659.25, 0.09), (27.7, 783.99, 0.08), (28.8, 1046.5, 0.06)]:
    add(mix, at, bell(f, 2.2), g, 0.1)

# gentle bus compression / soft clip
mix = np.tanh(mix * 1.15) * 0.92
# fade in/out
n_fade = int(sr * 0.25)
mix[:n_fade] *= np.linspace(0, 1, n_fade)[:, None]
mix[-int(sr*0.6):] *= np.linspace(1, 0, int(sr*0.6))[:, None]
peak = np.max(np.abs(mix))
mix = mix / peak * 0.89
pcm = (mix * 32767).astype('<i2')
with wave.open(os.path.join(OUT, 'soundtrack.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes(pcm.tobytes())
print('soundtrack.wav', len(pcm) / sr, 's', os.path.getsize(os.path.join(OUT, 'soundtrack.wav')), 'bytes')

# cue sheet for documentation / visual alignment
cues = [
    {'t': 0.0, 'name': 'terminal boot', 'type': 'typing'},
    {'t': 1.45, 'name': 'editor builds in', 'type': 'whoosh'},
    {'t': 2.35, 'name': 'crab arrives', 'type': 'pop'},
    {'t': 4.0, 'name': 'clips added', 'type': 'pop'},
    {'t': 6.0, 'name': 'focus / ramen', 'type': 'whoosh'},
    {'t': 8.0, 'name': 'trash hit', 'type': 'whoosh'},
    {'t': 10.0, 'name': 'transition panel', 'type': 'whoosh'},
    {'t': 12.0, 'name': 'cat / stamp', 'type': 'stamp'},
    {'t': 14.6, 'name': 'Ctrl+Z', 'type': 'pop'},
    {'t': 15.9, 'name': 'saturation glitch', 'type': 'glitch'},
    {'t': 18.35, 'name': 'back to normal', 'type': 'whoosh'},
    {'t': 21.8, 'name': '卡点', 'type': 'bonk'},
    {'t': 24.0, 'name': 'export', 'type': 'whoosh'},
    {'t': 25.55, 'name': 'BONK', 'type': 'bonk'},
    {'t': 26.1, 'name': 'fade to endcard', 'type': 'whoosh'},
    {'t': 27.0, 'name': 'endcard bells', 'type': 'bell'},
]
with open(os.path.join(ROOT, 'src', 'audio-cues.json'), 'w', encoding='utf-8') as f:
    json.dump({'bpm': bpm, 'duration': dur, 'cues': cues}, f, ensure_ascii=False, indent=1)
