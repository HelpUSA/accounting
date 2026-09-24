from PIL import Image, ImageDraw, ImageFont
import os

base_dir = r"d:\AntiG\accounting\public"
logo_path = os.path.join(base_dir, "helpus-logo.jpg")

def build_perfect_banner_1(img_path):
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    draw = ImageDraw.Draw(img)

    # Patch old logo
    draw.rectangle([0, 0, 275, 235], fill=(13, 21, 38, 255))

    # Official circular logo
    logo = Image.open(logo_path).convert("RGBA")
    badge_size = (140, 140)
    logo_resized = logo.resize(badge_size, Image.Resampling.LANCZOS)
    
    mask = Image.new("L", badge_size, 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.ellipse((0, 0, badge_size[0], badge_size[1]), fill=255)
    
    badge = Image.new("RGBA", badge_size, (0, 0, 0, 0))
    badge.paste(logo_resized, (0, 0), mask)
    
    ring_size = (148, 148)
    ring = Image.new("RGBA", ring_size, (0, 0, 0, 0))
    draw_ring = ImageDraw.Draw(ring)
    draw_ring.ellipse((0, 0, ring_size[0], ring_size[1]), fill=(245, 158, 11, 255))
    ring.paste(badge, (4, 4), badge)
    
    img.paste(ring, (45, 45), ring)

    # Patch footer
    footer_rect = [0, height - 100, width, height]
    draw.rectangle(footer_rect, fill=(10, 17, 32, 255))
    draw.line([(0, height - 100), (width, height - 100)], fill=(245, 158, 11, 255), width=4)

    try:
        font_domain = ImageFont.truetype("arialbd.ttf", 30)
        font_sub = ImageFont.truetype("arial.ttf", 17)
    except:
        font_domain = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    domain_str = "https://accounting.helpusbr.com"
    sub_str = "SUÍTE CONTÁBIL 100% GRATUITA PARA EMPRESAS E CONTADORES"

    bbox1 = draw.textbbox((0, 0), domain_str, font=font_domain)
    w1 = bbox1[2] - bbox1[0]
    draw.text(((width - w1) // 2, height - 78), domain_str, fill=(255, 255, 255, 255), font=font_domain)

    bbox2 = draw.textbbox((0, 0), sub_str, font=font_sub)
    w2 = bbox2[2] - bbox2[0]
    draw.text(((width - w2) // 2, height - 35), sub_str, fill=(245, 158, 11, 255), font=font_sub)

    final_img = img.convert("RGB")
    final_img.save(img_path, quality=95)
    print(f"Banner 1 generated: {img_path}")

def build_perfect_banner_2(img_path):
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    draw = ImageDraw.Draw(img)

    # Patch old logo completely
    draw.rectangle([0, 0, 360, 185], fill=(8, 14, 26, 255))

    # Official circular logo
    logo = Image.open(logo_path).convert("RGBA")
    badge_size = (120, 120)
    logo_resized = logo.resize(badge_size, Image.Resampling.LANCZOS)
    
    mask = Image.new("L", badge_size, 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.ellipse((0, 0, badge_size[0], badge_size[1]), fill=255)
    
    badge = Image.new("RGBA", badge_size, (0, 0, 0, 0))
    badge.paste(logo_resized, (0, 0), mask)
    
    ring_size = (128, 128)
    ring = Image.new("RGBA", ring_size, (0, 0, 0, 0))
    draw_ring = ImageDraw.Draw(ring)
    draw_ring.ellipse((0, 0, ring_size[0], ring_size[1]), fill=(245, 158, 11, 255))
    ring.paste(badge, (4, 4), badge)
    
    img.paste(ring, (25, 25), ring)

    # Footer patch height = 150px
    footer_rect = [0, height - 150, width, height]
    draw.rectangle(footer_rect, fill=(8, 14, 26, 255))
    draw.line([(0, height - 150), (width, height - 150)], fill=(245, 158, 11, 255), width=4)

    try:
        font_domain = ImageFont.truetype("arialbd.ttf", 32)
        font_sub = ImageFont.truetype("arial.ttf", 18)
    except:
        font_domain = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    domain_str = "https://accounting.helpusbr.com"
    sub_str = "SUÍTE CONTÁBIL 100% GRATUITA PARA EMPRESAS E CONTADORES"

    bbox1 = draw.textbbox((0, 0), domain_str, font=font_domain)
    w1 = bbox1[2] - bbox1[0]
    draw.text(((width - w1) // 2, height - 105), domain_str, fill=(255, 255, 255, 255), font=font_domain)

    bbox2 = draw.textbbox((0, 0), sub_str, font=font_sub)
    w2 = bbox2[2] - bbox2[0]
    draw.text(((width - w2) // 2, height - 55), sub_str, fill=(245, 158, 11, 255), font=font_sub)

    final_img = img.convert("RGB")
    final_img.save(img_path, quality=95)
    print(f"Banner 2 generated: {img_path}")

build_perfect_banner_1(os.path.join(base_dir, "instagram_post_1.jpg"))
build_perfect_banner_2(os.path.join(base_dir, "instagram_post_2.jpg"))
