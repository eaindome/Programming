# Video Compression using Cosine Transform

## Introduction
This project investigates the effect of cosine transform on data compression in video media type. The assignment involves implementing motion estimation, computing the discrete cosine transform (DCT) coefficients, and comparing the compression results.

## Assignment Description
- **Objective**: Investigate the effect of cosine transform in data compression using sample images provided (Picture1 and Picture2).
- **Tools**: Python (with Pillow and numpy libraries).
- **Steps**:
  1. Select random areas of size 16x16 in frame2.
  2. Find the most similar area to the selected block in frame1 using motion estimation with Sum of Absolute Differences (SAD).
  3. Find the difference between the selected block and the most similar area in frame1.
  4. Compute DCT coefficients of the difference and round them to the nearest integer.
  5. Compute DCT coefficients of the selected area and round them to the nearest integer.
  6. Compare the coefficients obtained in steps 4 and 5.
  7. Repeat the above steps on a few areas.

## Implementation
- **Language**: Python
- **Libraries Used**: Pillow, numpy, scipy.fft, matplotlib
- **Steps Implemented**:
  1. Load Picture1 and Picture2 images.
  2. Select random blocks of size 16x16 in frame2.
  3. Perform motion estimation using SAD to find the most similar area in frame1.
  4. Calculate the difference between the selected block and the best match.
  5. Compute DCT coefficients of the difference and round them.
  6. Compute DCT coefficients of the selected area and round them.
  7. Compare the coefficients obtained in steps 5 and 6.
  8. Analyze the results including MSE, coefficient distributions, and compression ratio.

## Usage
1. Install Python (if not already installed).
2. Install required libraries:
   ```
   pip install pillow numpy scipy matplotlib
   ```
3. Clone or download the repository.
4. Run the Python script `video_compression.ipynb`.
5. View the results and analysis.

## Results
- Mean Squared Error (MSE)
- DCT Coefficients Distribution
- Compression Ratio

## Conclusion
The assignment demonstrates the impact of cosine transform on data compression in video media type. Motion estimation helps in finding similar areas between frames, and cosine transform efficiently represents the differences between blocks. Analysis of results provides insights into the compression performance and the trade-offs involved.
