"""
Generate a QR code that links to the website.
Styled in the site's deep navy on a transparent background so it
sits cleanly on the cream paper background.

If you change the website URL later, edit URL below and re-run.
"""
import qrcode
from qrcode.constants import ERROR_CORRECT_M
from PIL import Image

# Default — update to match the actual final URL after deployment.
URL = "https://dennis-guenzel.github.io"

NAVY = (14, 27, 44)  # matches --ink in styles.css

qr = qrcode.QRCode(
    version=None,                # auto-pick smallest fitting version
    error_correction=ERROR_CORRECT_M,
    box_size=12,                 # pixels per module
    border=2,                    # quiet zone in modules
)
qr.add_data(URL)
qr.make(fit=True)

img = qr.make_image(fill_color=NAVY, back_color=(255, 255, 255)).convert("RGB")
img.save("/home/claude/site/assets/qrcode.png", "PNG", optimize=True)

# Also a transparent-background version for layering on paper backgrounds
img_rgba = qr.make_image(fill_color=NAVY, back_color=(0, 0, 0, 0)).convert("RGBA")
img_rgba.save("/home/claude/site/assets/qrcode-transparent.png", "PNG", optimize=True)

print(f"QR code generated for: {URL}")
print(f"  Standard:    /home/claude/site/assets/qrcode.png    ({img.size})")
print(f"  Transparent: /home/claude/site/assets/qrcode-transparent.png")
