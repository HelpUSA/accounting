from PIL import Image, ImageDraw, ImageFont
import os

base_dir = r"d:\AntiG\accounting\public"
output_dir = os.path.join(base_dir, "posts")
os.makedirs(output_dir, exist_ok=True)

logo_path = os.path.join(base_dir, "helpus-logo.jpg")

POSTS = [
    {
        "filename": "post_1.jpg",
        "title": "BAIXE NFS-E GRÁTIS EM LOTE",
        "subtitle": "Prestadas e Tomadas - Sem Cadastro com Certificado A1",
        "badge": "MÓDULO NFS-E",
        "icon_text": "NFS-e",
        "keyword": "NFSE"
    },
    {
        "filename": "post_2.jpg",
        "title": "EFD-REINF R-4010 E R-4020",
        "subtitle": "Gerador de Lotes XML para Retenções Fiscais",
        "badge": "MÓDULO EFD-REINF",
        "icon_text": "REINF",
        "keyword": "REINF"
    },
    {
        "filename": "post_3.jpg",
        "title": "CONVERSOR SPED FISCAL PVA",
        "subtitle": "Formatação Rápida de Registros de ICMS / IPI",
        "badge": "MÓDULO SPED",
        "icon_text": "SPED",
        "keyword": "SPED"
    },
    {
        "filename": "post_4.jpg",
        "title": "CONCILIAÇÃO BANCÁRIA OFX",
        "subtitle": "Importador de Extratos OFX para Fechamento de Caixa",
        "badge": "MÓDULO OFX",
        "icon_text": "OFX",
        "keyword": "OFX"
    },
    {
        "filename": "post_5.jpg",
        "title": "MANIFESTAÇÃO NF-E SEFAZ",
        "subtitle": "Consulta e Download de Compras por CNPJ",
        "badge": "MÓDULO NF-E",
        "icon_text": "NF-e",
        "keyword": "NFE"
    },
    {
        "filename": "post_6.jpg",
        "title": "CONTROLE DE FRETE E CT-E",
        "subtitle": "Visualizador de DACTE e Captura de Conhecimentos",
        "badge": "MÓDULO CT-E",
        "icon_text": "CT-e",
        "keyword": "CTE"
    },
    {
        "filename": "post_7.jpg",
        "title": "CERTIFICADO A1 100% SEGURO",
        "subtitle": "Processamento Local - Zero Retenção de Chave Privada",
        "badge": "SEGURANÇA LGPD",
        "icon_text": "A1 SEGURA",
        "keyword": "SEGURANCA"
    },
    {
        "filename": "post_8.jpg",
        "title": "SUÍTE CONTÁBIL 6 EM 1 GRATUITA",
        "subtitle": "Ferramenta Completa para Empresas e Contadores",
        "badge": "100% GRATUITO",
        "icon_text": "6 EM 1",
        "keyword": "GRATIS"
    },
    {
        "filename": "post_9.jpg",
        "title": "EXPORTAÇÃO ZIP + EXCEL",
        "subtitle": "Organização Mensal e Consolidação de Impostos",
        "badge": "EXPORTADOR",
        "icon_text": "EXCEL",
        "keyword": "EXCEL"
    },
    {
        "filename": "post_10.jpg",
        "title": "ECONOMIZE 20H POR MÊS",
        "subtitle": "Automação Fiscal Rápida e Direta no Navegador",
        "badge": "PRODUTIVIDADE",
        "icon_text": "PRODUTIVIDADE",
        "keyword": "PRODUTIVIDADE"
    }
]

def generate_post_image(post):
    width, height = 1080, 1080
    img = Image.new("RGBA", (width, height), (10, 17, 32, 255))
    draw = ImageDraw.Draw(img)

    # Background accent lines & glow
    draw.rectangle([0, 0, width, height], fill=(10, 17, 32, 255))
    draw.rectangle([30, 30, width - 30, height - 30], outline=(30, 45, 75, 255), width=2)
    draw.rectangle([40, 40, width - 40, height - 40], outline=(245, 158, 11, 100), width=1)

    try:
        font_badge = ImageFont.truetype("arialbd.ttf", 22)
        font_title = ImageFont.truetype("arialbd.ttf", 46)
        font_sub = ImageFont.truetype("arial.ttf", 26)
        font_cta = ImageFont.truetype("arialbd.ttf", 26)
        font_domain = ImageFont.truetype("arialbd.ttf", 32)
        font_footer_sub = ImageFont.truetype("arial.ttf", 18)
    except:
        font_badge = font_title = font_sub = font_cta = font_domain = font_footer_sub = ImageFont.load_default()

    # 1. Draw Badge
    badge_str = post["badge"]
    bbox_b = draw.textbbox((0, 0), badge_str, font=font_badge)
    w_b = bbox_b[2] - bbox_b[0]
    badge_rect = [(width - w_b) // 2 - 20, 70, (width + w_b) // 2 + 20, 115]
    draw.rectangle(badge_rect, fill=(245, 158, 11, 255))
    draw.text(((width - w_b) // 2, 80), badge_str, fill=(10, 17, 32, 255), font=font_badge)

    # 2. Main Title
    title_str = post["title"]
    bbox_t = draw.textbbox((0, 0), title_str, font=font_title)
    w_t = bbox_t[2] - bbox_t[0]
    draw.text(((width - w_t) // 2, 160), title_str, fill=(255, 255, 255, 255), font=font_title)

    # 3. Subtitle
    sub_str = post["subtitle"]
    bbox_s = draw.textbbox((0, 0), sub_str, font=font_sub)
    w_s = bbox_s[2] - bbox_s[0]
    draw.text(((width - w_s) // 2, 230), sub_str, fill=(245, 158, 11, 255), font=font_sub)

    # 4. Central Graphic Box (Tech Container)
    box_rect = [200, 300, 880, 750]
    draw.rectangle(box_rect, fill=(15, 25, 48, 255), outline=(245, 158, 11, 255), width=3)
    
    # Official Circular Logo inside Central Graphic
    logo = Image.open(logo_path).convert("RGBA")
    badge_size = (180, 180)
    logo_resized = logo.resize(badge_size, Image.Resampling.LANCZOS)
    
    mask = Image.new("L", badge_size, 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.ellipse((0, 0, badge_size[0], badge_size[1]), fill=255)
    
    circular_logo = Image.new("RGBA", badge_size, (0, 0, 0, 0))
    circular_logo.paste(logo_resized, (0, 0), mask)
    
    ring_size = (192, 192)
    ring = Image.new("RGBA", ring_size, (0, 0, 0, 0))
    draw_ring = ImageDraw.Draw(ring)
    draw_ring.ellipse((0, 0, ring_size[0], ring_size[1]), fill=(245, 158, 11, 255))
    ring.paste(circular_logo, (6, 6), circular_logo)
    
    img.paste(ring, (540 - 96, 350), ring)

    # Module text in Graphic Box
    mod_str = f"MÓDULO: {post['icon_text']}"
    bbox_m = draw.textbbox((0, 0), mod_str, font=font_title)
    w_m = bbox_m[2] - bbox_m[0]
    draw.text(((width - w_m) // 2, 570), mod_str, fill=(255, 255, 255, 255), font=font_title)

    feature_str = "SISTEMA 100% ONLINE E GRATUITO"
    bbox_f = draw.textbbox((0, 0), feature_str, font=font_sub)
    w_f = bbox_f[2] - bbox_f[0]
    draw.text(((width - w_f) // 2, 640), feature_str, fill=(245, 158, 11, 255), font=font_sub)

    # 5. Call To Action (CTA Bar)
    cta_str = f"COMENTE '{post['keyword']}' PARA RECEBER O LINK NO DIRECT!"
    bbox_c = draw.textbbox((0, 0), cta_str, font=font_cta)
    w_c = bbox_c[2] - bbox_c[0]
    draw.rectangle([50, 800, 1030, 870], fill=(245, 158, 11, 255))
    draw.text(((width - w_c) // 2, 822), cta_str, fill=(10, 17, 32, 255), font=font_cta)

    # 6. Solid Footer Bar
    footer_rect = [0, height - 140, width, height]
    draw.rectangle(footer_rect, fill=(6, 11, 22, 255))
    draw.line([(0, height - 140), (width, height - 140)], fill=(245, 158, 11, 255), width=4)

    domain_str = "https://accounting.helpusbr.com"
    bbox_d = draw.textbbox((0, 0), domain_str, font=font_domain)
    w_d = bbox_d[2] - bbox_d[0]
    draw.text(((width - w_d) // 2, height - 100), domain_str, fill=(255, 255, 255, 255), font=font_domain)

    footer_sub = "HELPUS ACCOUNTING — SUÍTE CONTÁBIL UNIVERSAL"
    bbox_fs = draw.textbbox((0, 0), footer_sub, font=font_footer_sub)
    w_fs = bbox_fs[2] - bbox_fs[0]
    draw.text(((width - w_fs) // 2, height - 50), footer_sub, fill=(245, 158, 11, 255), font=font_footer_sub)

    out_file = os.path.join(output_dir, post["filename"])
    final_img = img.convert("RGB")
    final_img.save(out_file, quality=95)
    print(f"Generated post banner: {out_file}")

    if post["filename"] == "post_1.jpg":
        final_img.save(os.path.join(base_dir, "instagram_post_1.jpg"), quality=95)
    elif post["filename"] == "post_2.jpg":
        final_img.save(os.path.join(base_dir, "instagram_post_2.jpg"), quality=95)

for p in POSTS:
    generate_post_image(p)
