import qrcode

# data to encode in the qr code
data = "https://github.com/eaindome"

# generate qr code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(data)
qr.make(fit=True)

# create an image from the qr code
img = qr.make_image(fill_color="black", back_color="white")

# save the qr code
img.save("qr_code_2.png")
