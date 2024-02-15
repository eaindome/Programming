# Image Structure Analysis with Python (Pillow Library)

This assignment involves analyzing the structure of digital images using Python, specifically utilizing the Pillow library. The steps involved in this analysis are outline below:

## Assignment Steps:
1. **Print the dimensions of the image. Check image mode if it RGB or RGBA or something else. Based on the image mode calculate the uncompressed size and thereby calculating the compression rate.**

2. *** Convert the image into the YCbCr color model, increase the value of the Y component for a brighter image, and then convert the image back to RGB. ***

3. **Select areas in the image with shades of red, change the Cr values of these pixels to zero, and then put the image back in RGB color space.**

4. **Apply the JPEG compression method to down-sample the Cb and Cr components, and then up-sample both components to reconstruct the image. Evaluate any quality changes observed.**

5. **Repeat the down-sampling and up-sampling process from step 4, but this time, down-sample all three components (Y, Cb, and Cr). Assess the quality changes compared to step 4.**


## Implementation:
- The code for implementing these steps is provided in the Python script `image_analysis.py`.
- Ensure you have Python installed on your system along with the Pillow library (`pip install Pillow`).
- Replace `"Lena.jpg"` with the path to your actual image file in the script.
- Run the script and observe the results for each step.


## Files:
- `image_analysis.py`: Python script containing the implementation of the assignment steps.
- `image_analysis.ipynb`: Jupyter notebook with same script containing the implementation of the assignment steps but with results being displayed after each step; choose your preferrance.
- `Lena.jpg`: Sample image for analysis. Replace with your own image file.
- `README.md`: This file providing an overview of the assignment and instructions for execution.


## Usage:
1. Ensure Python (or Anaconda for the jupyter notebook) and Pillow library are installed.
2. Run the Python script using the command `python image_analysis.py`.
3. View the results of each step and observe any quality changes in the reconstructed images.