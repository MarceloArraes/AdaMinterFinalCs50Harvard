from PIL import Image, ImageDraw
import numpy as np


# read as gray image
im = Image.open(fr"C:\Users\MarceloSSD\Documents\Harvard COURSE\minter\project4\nftminter\static\img\598276.png").convert("L")
width, height = im.size

max_dots = 140
background_colour = [224, 255, 255] #rgb
dots_colour = (0,0,139) #rgb

# down size to number of dots
if height == max(height, width):
    downsized_image = im.resize((int(height * (max_dots / width)), max_dots))
else:
    downsized_image = im.resize((max_dots, int(height * (max_dots / width))))

# image size
downsized_image_width, downsized_image_height = downsized_image.size

# increase target image size
multiplier = 50

# set size for target image
blank_img_height = downsized_image_height * multiplier
blank_img_width = downsized_image_width * multiplier


# set the padding value so the dots start in frame (rather than being off the edge
padding = int(multiplier / 2)


# create canvas containing just the background colour
blank_image = np.full(
    ((blank_img_height), (blank_img_width), 3), background_colour, dtype=np.uint8
)


# prepare for drawing circles on our traget image
pil_image = Image.fromarray(blank_image)
draw = ImageDraw.Draw(pil_image)
downsized_image = np.array(downsized_image)


# run through each pixel and draw the circle on our blank canvas
for y in range(0, downsized_image_height):
    for x in range(0, downsized_image_width):

        k = (x * multiplier) + padding
        m = (y * multiplier) + padding

        r = int((0.6 * multiplier) * ((255 - downsized_image[y][x]) / 255))

        leftUpPoint = (k - r, m - r)
        rightDownPoint = (k + r, m + r)

        twoPointList = [leftUpPoint, rightDownPoint]
        draw.ellipse(twoPointList, fill=dots_colour)


# pil_image = pil_image.resize((width, height), 3)
# pil_image.show()
pil_image.save("retro_art.png")