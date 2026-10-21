import os, json
from PIL import Image

def pack_atlas(images_dict, output_png, output_json, max_width=2048, padding=4):
    """
    Packs a dictionary of {frame_name: PIL.Image} into a single sprite sheet
    and generates Phaser-compatible JSON Hash metadata.
    Uses shelf bin packing algorithm.
    """
    # Sort items by height descending for efficient shelf packing
    sorted_items = sorted(images_dict.items(), key=lambda item: item[1].height, reverse=True)
    
    # Calculate packing layout
    shelves = [] # list of dicts: {'y': y, 'height': h, 'current_x': x}
    current_y = padding
    
    # Determine needed dimensions
    packed_positions = {}
    canvas_w = max_width
    
    for name, img in sorted_items:
        w, h = img.width, img.height
        placed = False
        
        # Try to place on existing shelf
        for shelf in shelves:
            if shelf['current_x'] + w + padding <= canvas_w and h <= shelf['height']:
                packed_positions[name] = (shelf['current_x'], shelf['y'], w, h)
                shelf['current_x'] += w + padding
                placed = True
                break
                
        # Create new shelf
        if not placed:
            shelf_h = h
            shelf_y = current_y
            packed_positions[name] = (padding, shelf_y, w, h)
            shelves.append({
                'y': shelf_y,
                'height': shelf_h,
                'current_x': padding + w + padding
            })
            current_y += shelf_h + padding
            
    canvas_h = current_y + padding
    # Expand canvas width if any single image is wider than max_width
    max_img_w = max(img.width for img in images_dict.values())
    if max_img_w + 2 * padding > canvas_w:
        canvas_w = max_img_w + 2 * padding
        
    print(f"Packing {len(images_dict)} images into {output_png} (Size: {canvas_w}x{canvas_h})...")
    
    # Create canvas
    atlas_image = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
    frames_json = {}
    
    for name, img in images_dict.items():
        x, y, w, h = packed_positions[name]
        atlas_image.paste(img, (x, y))
        frames_json[name] = {
            "frame": {"x": x, "y": y, "w": w, "h": h},
            "rotated": False,
            "trimmed": False,
            "spriteSourceSize": {"x": 0, "y": 0, "w": w, "h": h},
            "sourceSize": {"w": w, "h": h}
        }
        
    # Save PNG
    atlas_image.save(output_png, 'PNG', optimize=True)
    
    # Save JSON Hash format
    atlas_metadata = {
        "frames": frames_json,
        "meta": {
            "app": "HatGiongTroTan Asset Packer",
            "version": "1.0",
            "image": os.path.basename(output_png),
            "format": "RGBA8888",
            "size": {"w": canvas_w, "h": canvas_h},
            "scale": "1"
        }
    }
    
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(atlas_metadata, f, indent=2)
        
    png_size_mb = os.path.getsize(output_png) / (1024 * 1024)
    print(f"Saved {output_png} ({png_size_mb:.2f} MB) and {output_json}")

if __name__ == '__main__':
    # --- GROUP 1: entities.png (Kael, Monsters & Boss) ---
    entities_names = [
        'player_idle_0', 'player_idle_1', 'player_idle_2', 'player_idle_3', 'player_idle_4', 'player_idle_5',
        'player_run_0', 'player_run_1', 'player_run_2', 'player_run_3', 'player_run_4', 'player_run_5',
        'player_attack_0', 'player_attack_1', 'player_attack_2', 'player_attack_3',
        'player_hurt', 'player_dead',
        'mon_slime', 'mon_mushroom', 'mon_spider', 'mon_bat', 'mon_panther',
        'mon_orc_axe', 'mon_orc_enrage', 'mon_orc_leader',
        'mon_boss_malakar', 'mon_boss_malakar_p2'
    ]

    entities_images = {}
    for name in entities_names:
        path = f'assets/extracted/{name}.png'
        if os.path.exists(path):
            entities_images[name] = Image.open(path).convert('RGBA')
        else:
            print(f"Warning: {path} not found")

    # Add aliases for malakar_p1 and malakar_p2
    if 'mon_boss_malakar' in entities_images:
        entities_images['mon_malakar_p1'] = entities_images['mon_boss_malakar'].copy()
    if 'mon_boss_malakar_p2' in entities_images:
        entities_images['mon_malakar_p2'] = entities_images['mon_boss_malakar_p2'].copy()

    pack_atlas(entities_images, 'assets/entities.png', 'assets/entities.json', max_width=1800)

    # --- GROUP 2: world.png (Map & Environment Props) ---
    world_names = [
        'tile_grass', 'tile_cobble_road', 'tile_dungeon_brick',
        'prop_chest', 'prop_chest_gold', 'prop_chest_jewels',
        'prop_barrel', 'prop_torch', 'prop_torch_wall',
        'prop_sign', 'prop_sign_post', 'prop_cave', 'prop_spikes',
        'prop_bridge_wood', 'prop_ancient_pillar', 'prop_stone_boulder',
        'prop_gate_dark', 'prop_tree_jungle', 'prop_flowers',
        'prop_mushrooms_cluster'
    ]

    world_images = {}
    # Add main backgrounds
    if os.path.exists('assets/title_bg.jpg'):
        world_images['title_bg'] = Image.open('assets/title_bg.jpg').convert('RGBA')
    if os.path.exists('assets/bg_map1.jpg'):
        world_images['bg_map1'] = Image.open('assets/bg_map1.jpg').convert('RGBA')
        world_images['bg_map1_mountains'] = world_images['bg_map1'].copy()
    if os.path.exists('assets/bg_map2.jpg'):
        world_images['bg_map2'] = Image.open('assets/bg_map2.jpg').convert('RGBA')

    for name in world_names:
        path = f'assets/extracted/{name}.png'
        if os.path.exists(path):
            world_images[name] = Image.open(path).convert('RGBA')
        else:
            print(f"Warning: {path} not found")

    pack_atlas(world_images, 'assets/world.png', 'assets/world.json', max_width=2048)

    # --- GROUP 3: ui_vfx.png (UI, Icons, Combat VFX) ---
    ui_vfx_names = [
        'title_logo',
        'boss_dark_slash', 'boss_abyssal_spike', 'boss_shadow_shield',
        'vfx_slash', 'vfx_crit', 'vfx_fire', 'vfx_lightning', 'vfx_poison'
    ]

    ui_vfx_images = {}
    for name in ui_vfx_names:
        path = f'assets/extracted/{name}.png'
        if os.path.exists(path):
            ui_vfx_images[name] = Image.open(path).convert('RGBA')
        else:
            print(f"Warning: {path} not found")

    pack_atlas(ui_vfx_images, 'assets/ui_vfx.png', 'assets/ui_vfx.json', max_width=1200)

    print("\n--- ALL 3 ASSET FILES PACKED SUCCESSFULLY ---")
