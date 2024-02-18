from PIL import Image
import os

# Part 1: Opening the image and calculating the compression rate
print("Part 1: Opening the image and calculating the compression rate")

# 1.1: Opening the image
# opening the image
image_path = "Lena.jpg"
image = Image.open(image_path)


# get the dimensions of the image
width, height = image.size
print("Dimensions of the image: ")
print(f"width: {width}\nheight: {height}")

"""
Compression rate = Uncompressed size of image / File sizee uncompressed size: the theoretical size of the image stored without compression, calculated based on the dimensions of the image and the number of bits per pixel.

file size: the acutal size of the image on the disk, measured in bytes
"""

# finding the actual number of bits of the image
# not assuming 24 bits, check the image mode
image_mode = image.mode
print(f"image mode: {image_mode}")

# calculate the size of uncompressed image in bits based on the image mode
if image_mode == 'RGB':
    bits_per_channel = 8
    num_channels = 3
elif image_mode == 'RGBA':
    bits_per_channel = 8
    num_channels = 4
else:
    # for other modes (grayscale), assume 8 bits per channel
    bits_per_channel = 8
    num_channels = 1

# calculate the uncompressed size of the image in bits
uncompressed_size = width * height * bits_per_channel * num_channels
print(f"uncompressed size: {uncompressed_size}")

# get the file size of the image
file_size = os.path.getsize(image_path) * 8  # covert bytes to bits
print(f"file size: {file_size}")

# calculate the compression rate
compression_rate = uncompressed_size / file_size

# display results
print(f"Dimensions of the image: {width} x {height}")
print(f"Compression rate: {compression_rate}")


# Part 2: Convert the image to YCbCr, increase Y component, and convert back to RGB
print("\nPart 2: Convert the image to YCbCr, increase Y component, and convert back to RGB")

# convert the image to YCbCr
image_ycbcr = image.convert('YCbCr')

# increase the value of the Y component
Y, Cb, Cr = image_ycbcr.split()
Y = Y.point(lambda i: i * 1.2)  # increasing the value of Y by 20% that is

# convert back to RGB
image_brighter = Image.merge('YCbCr', (Y, Cb, Cr)).convert('RGB')

# checking to see if the image is brighter
import matplotlib.pyplot as plt

# display original image
plt.subplot(1, 2, 1)
plt.imshow(image)
plt.title('Original Image')

# display the brightened image
plt.subplot(1, 2, 2)
plt.imshow(image_brighter)
plt.title('Brightened Image')


# Part 3: Select areas with shades of red and set Cr values to zero
print("\nPart 3: Select areas with shades of red and set Cr values to zero")

# convert image to YCbCr again
image_ycbcr = image.convert('YCbCr')

# set threshold for selecting red areas
red_lower = (100, 0, 0)
red_upper = (255, 100, 100)

# Create a mask for red areas
mask = Image.new('L', image.size)  # Create a new grayscale image for the mask
for x in range(image.width):
    for y in range(image.height):
        pixel = image_ycbcr.getpixel((x, y))
        if red_lower[0] < pixel[0] < red_upper[0] and red_lower[1] < pixel[1] < red_upper[1] and red_lower[2] < pixel[2] < red_upper[2]:
            mask.putpixel((x, y), 255)  # Set white (255) for red areas in the mask
        else:
            mask.putpixel((x, y), 0)    # Set black (0) for non-red areas in the mask

# Convert mask to binary image (black and white)
mask = mask.point(lambda p: 255 if p > 0 else 0)

# set Cr values to zero for selected areas
Y, Cb, Cr = image_ycbcr.split()
Cr = Cr.point(lambda i: 0 if mask.getpixel((x, y)) else i)

# convert back to RGB
image_red_filtered = Image.merge('YCbCr', (Y, Cb, Cr)).convert('RGB')

# display the filtered image
#plt.subplot(1, 2, 1)
plt.imshow(image_red_filtered)
plt.title('Image Red filtered')


# Part 4: down-sample and up-sample Cb and Cr components
print("\nPart 4: down-sample and up-sample Cb and Cr components")

# down-sample Cb and Cr components
Cb_downsampled = Cb.resize((width//2, height//2), Image.BOX)
Cr_downsampled = Cr.resize((width//2, height//2), Image.BOX)

# up-sample Cb and Cr components
Cb_upsampled = Cb_downsampled.resize((width, height), Image.BOX)
Cr_upsampled = Cr_downsampled.resize((width, height), Image.BOX)

# reconstruct the image
image_reconstructed = Image.merge('YCbCr', (Y, Cb_upsampled, Cr_upsampled)).convert('RGB')

# display the reconstructed image
#plt.subplot(1, 2, 1)
plt.imshow(image_reconstructed)
plt.title('Reconstructed Image')


# Part 5: down-sample and up-sample all three components
print("\nPart 5: down-sample and up-sample all three components")

# down-sample all three components
Y_downsampled = Y.resize((width//2, height//2), Image.BOX)
Cb_downsampled = Cb.resize((width//2, height//2), Image.BOX)
Cr_downsampled = Cr.resize((width//2, height//2), Image.BOX)

# up-sample all three components
Y_upsampled = Y_downsampled.resize((width, height), Image.BOX)
Cb_upsampled = Cb_downsampled.resize((width, height), Image.BOX)
Cr_upsampled = Cr_downsampled.resize((width, height), Image.BOX)

# reconstruct the image
image_reconstructed_all = Image.merge('YCbCr', (Y_upsampled, Cb_upsampled, Cr_upsampled)).convert('RGB')

# display the re-reconstructed image
#plt.subplot(1, 2, 1)
plt.imshow(image_reconstructed_all)
plt.title('Image Re-reconstructed')

# It becomes blur or the quality drops