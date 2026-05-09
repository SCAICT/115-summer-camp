#!/usr/bin/env python3
"""
圖片壓縮腳本 - 遞歸壓縮所有大圖片
"""

import os
import sys
from pathlib import Path
from PIL import Image

# 設定
SIZE_THRESHOLD = 1_000_000  # 1MB - 大於這個大小的圖片會被壓縮
QUALITY = 85  # JPG 質量 (1-100)
MAX_WIDTH = 2560  # 最大寬度像素
RESIZE_QUALITY = 90  # PNG 轉存品質

def get_file_size_mb(filepath):
    """獲取檔案大小（MB）"""
    return os.path.getsize(filepath) / (1024 * 1024)

def compress_image(filepath, quality=QUALITY, max_width=MAX_WIDTH):
    """壓縮單個圖片"""
    try:
        file_size_before = get_file_size_mb(filepath)
        
        # 開啟圖片
        img = Image.open(filepath)
        original_format = img.format
        
        # 調整寬度如果超過 max_width
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            print(f"  📐 調整大小: {img.width}x{img.height}")
        
        # 轉換 RGBA 到 RGB (JPG 不支援透明)
        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img
        
        # 保存壓縮版本
        save_kwargs = {'optimize': True}
        
        if filepath.lower().endswith('.jpg') or filepath.lower().endswith('.jpeg'):
            save_kwargs['quality'] = quality
            img.save(filepath, 'JPEG', **save_kwargs)
        elif filepath.lower().endswith('.png'):
            # PNG 轉 JPG 以獲得更好的壓縮
            jpg_path = filepath.replace('.png', '.jpg')
            img.save(jpg_path, 'JPEG', quality=quality, **{'optimize': True})
            os.remove(filepath)
            filepath = jpg_path
            print(f"  🔄 轉換: PNG → JPG")
        else:
            img.save(filepath, **save_kwargs)
        
        file_size_after = get_file_size_mb(filepath)
        reduction = (1 - file_size_after / file_size_before) * 100
        
        print(f"  ✅ 壓縮完成: {file_size_before:.2f}MB → {file_size_after:.2f}MB (-{reduction:.1f}%)")
        return True
    
    except Exception as e:
        print(f"  ❌ 錯誤: {e}")
        return False

def main():
    """主函數"""
    root_dir = Path('.')
    image_extensions = {'.jpg', '.jpeg', '.png', '.webp', '.bmp'}
    
    # 搜尋所有圖片
    images = []
    for ext in image_extensions:
        images.extend(root_dir.rglob(f'*{ext}'))
        images.extend(root_dir.rglob(f'*{ext.upper()}'))
    
    # 過濾大圖片
    large_images = [(img, get_file_size_mb(img)) for img in images 
                    if get_file_size_mb(img) > SIZE_THRESHOLD / (1024 * 1024)]
    
    if not large_images:
        print("✨ 沒有超過 1MB 的圖片需要壓縮！")
        return
    
    # 排序（最大的優先）
    large_images.sort(key=lambda x: x[1], reverse=True)
    
    print(f"\n🖼️  找到 {len(large_images)} 個需要壓縮的圖片\n")
    print("=" * 60)
    
    total_before = 0
    total_after = 0
    
    for img_path, size_mb in large_images:
        print(f"\n📦 {img_path.name} ({size_mb:.2f}MB)")
        
        total_before += size_mb
        compress_image(str(img_path))
        total_after += get_file_size_mb(img_path)
    
    print("\n" + "=" * 60)
    print(f"\n📊 總結:")
    print(f"  原始大小: {total_before:.2f}MB")
    print(f"  壓縮後: {total_after:.2f}MB")
    print(f"  節省空間: {(1 - total_after / total_before) * 100:.1f}%")
    print(f"  總節省: {total_before - total_after:.2f}MB\n")

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n中斷壓縮.")
        sys.exit(1)
