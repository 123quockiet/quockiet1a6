import os, shutil
from PIL import Image
from collections import deque

os.makedirs('assets/extracted', exist_ok=True)

def remove_background_player(img, bg_color, tolerance=22):
    img = img.convert('RGBA')
    datas = img.getdata()
    new_data = []
    r_bg, g_bg, b_bg = bg_color[:3]
    for item in datas:
        r, g, b, a = item
        dist = abs(r - r_bg) + abs(g - g_bg) + abs(b - b_bg)
        if dist <= tolerance * 3:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    img.putdata(new_data)
    return img

print("1. Extracting Player Animations...")
im_player = Image.open('assets/player.png')
pW, pH = 275, 307

# Row 0: Idle (6 frames)
for i in range(6):
    box = (i * pW, 0, (i + 1) * pW, pH)
    cropped = im_player.crop(box)
    transparent = remove_background_player(cropped, (137, 137, 137), tolerance=22)
    transparent.save(f'assets/extracted/player_idle_{i}.png')

# Row 1: Run (6 frames)
for i in range(6):
    box = (i * pW, pH, (i + 1) * pW, 2 * pH)
    cropped = im_player.crop(box)
    transparent = remove_background_player(cropped, (137, 137, 137), tolerance=22)
    transparent.save(f'assets/extracted/player_run_{i}.png')

# Row 3: Attack (4 frames: col 2, 3, 4, 5)
for idx, c in enumerate([2, 3, 4, 5]):
    box = (c * pW, 3 * pH, (c + 1) * pW, 4 * pH)
    cropped = im_player.crop(box)
    transparent = remove_background_player(cropped, (137, 137, 137), tolerance=22)
    transparent.save(f'assets/extracted/player_attack_{idx}.png')

# Row 4: Hurt & Dead
cropped_hurt = im_player.crop((6 * pW, 4 * pH, 7 * pW, 5 * pH))
remove_background_player(cropped_hurt, (137, 137, 137), tolerance=22).save('assets/extracted/player_hurt.png')

cropped_dead = im_player.crop((9 * pW, 4 * pH, 10 * pW, 5 * pH))
remove_background_player(cropped_dead, (137, 137, 137), tolerance=22).save('assets/extracted/player_dead.png')

print("2. Extracting Monsters & Boss (Full Unclipped Sprites)...")
im_mon = Image.open('assets/monster_vfx.png')

def extract_sprite_clean(im, crop_box, tolerance=26):
    crop = im.crop(crop_box).convert('RGBA')
    w, h = crop.size
    
    corners = [crop.getpixel((0, 0)), crop.getpixel((w-1, 0)), crop.getpixel((0, h-1)), crop.getpixel((w-1, h-1))]
    valid_corners = [c for c in corners if c[0] < 150]
    if not valid_corners:
        valid_corners = corners
        
    bg_r = sum(c[0] for c in valid_corners) / len(valid_corners)
    bg_g = sum(c[1] for c in valid_corners) / len(valid_corners)
    bg_b = sum(c[2] for c in valid_corners) / len(valid_corners)
    
    visited = bytearray(w * h)
    q = deque()
    pixels = crop.load()
    
    def is_bg(r, g, b):
        dist = abs(r - bg_r) + abs(g - bg_g) + abs(b - bg_b)
        return dist <= tolerance * 3

    for x in range(w):
        for y in [0, h-1]:
            r, g, b, a = pixels[x, y]
            if is_bg(r, g, b):
                q.append((x, y))
                visited[y * w + x] = 1
                
    for y in range(h):
        for x in [0, w-1]:
            if not visited[y * w + x]:
                r, g, b, a = pixels[x, y]
                if is_bg(r, g, b):
                    q.append((x, y))
                    visited[y * w + x] = 1

    while q:
        cx, cy = q.popleft()
        pixels[cx, cy] = (0, 0, 0, 0)
        for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < w and 0 <= ny < h:
                idx = ny * w + nx
                if not visited[idx]:
                    visited[idx] = 1
                    r, g, b, a = pixels[nx, ny]
                    if is_bg(r, g, b):
                        q.append((nx, ny))

    bbox = crop.getbbox()
    if bbox:
        crop = crop.crop(bbox)
    return crop

monsters_coords = {
    'mon_slime': (945, 930, 1140, 1070),
    'mon_mushroom': (32, 285, 175, 410),
    'mon_spider': (695, 275, 885, 400),
    'mon_bat': (1375, 290, 1555, 385),
    'mon_panther': (1105, 435, 1340, 645),
    'mon_orc_axe': (1380, 520, 1580, 715),
    'mon_orc_enrage': (480, 805, 660, 1055),
    'mon_orc_leader': (2470, 425, 2710, 700),
    'mon_boss_malakar': (40, 1265, 225, 1480),
    'mon_boss_malakar_p2': (2190, 1255, 2465, 1480),
    'boss_dark_slash': (220, 1220, 500, 1475),
    'boss_abyssal_spike': (1200, 1220, 1400, 1475),
    'boss_shadow_shield': (2460, 1220, 2700, 1475)
}

for name, box in monsters_coords.items():
    res = extract_sprite_clean(im_mon, box, tolerance=26)
    
    # Specific edge cleans
    if name == 'mon_orc_axe':
        res = res.crop((0, 0, res.width, res.height - 4))
    elif name == 'mon_orc_leader':
        px = res.load()
        for y in range(min(40, res.height)):
            for x in range(res.width):
                r, g, b, a = px[x, y]
                if a > 0 and r < 80 and g < 80 and b < 90:
                    px[x, y] = (0, 0, 0, 0)
        bb = res.getbbox()
        if bb: res = res.crop(bb)
    elif name == 'mon_orc_enrage':
        px = res.load()
        for y in range(min(80, res.height)):
            for x in range(res.width):
                r, g, b, a = px[x, y]
                if a > 0 and r < 100:
                    px[x, y] = (0, 0, 0, 0)
        bb = res.getbbox()
        if bb: res = res.crop(bb)
        
    out_path = f'assets/extracted/{name}.png'
    res.save(out_path)
    print(f'{name}: saved {res.size}')

# Copy aliases for malakar_p1 and malakar_p2
shutil.copyfile('assets/extracted/mon_boss_malakar.png', 'assets/extracted/mon_malakar_p1.png')
shutil.copyfile('assets/extracted/mon_boss_malakar_p2.png', 'assets/extracted/mon_malakar_p2.png')

print("3. Extracting Combat VFX...")
im_combat = Image.open('assets/combat_vfx.png')
combat_bg = (17, 20, 27)

vfx_coords = {
    'vfx_slash': (220, 150, 400, 300),
    'vfx_crit': (1540, 130, 1800, 310),
    'vfx_fire': (100, 480, 320, 660),
    'vfx_lightning': (980, 460, 1350, 660),
    'vfx_poison': (1920, 460, 2250, 660)
}

for name, box in vfx_coords.items():
    cropped = im_combat.crop(box)
    remove_background_player(cropped, combat_bg, tolerance=24).save(f'assets/extracted/{name}.png')

print("Extraction completed successfully!")
