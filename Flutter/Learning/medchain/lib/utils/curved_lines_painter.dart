import 'package:flutter/material.dart';

class CurvedLinesPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.white.withOpacity(0.3)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    // Example for a wavy line
    Path createWavyPath(
        double startY, double amplitude, int waves, double inclination) {
      final path = Path();
      path.moveTo(0, startY);
      double segmentWidth = size.width / (waves * 2);
      for (int i = 0; i < waves; i++) {
        double x1 = (2 * i + 1) * segmentWidth;
        double y1 = startY +
            ((i % 2 == 0) ? amplitude : -amplitude) +
            inclination * (2 * i + 1);
        double x2 = (2 * i + 2) * segmentWidth;
        double y2 = startY + inclination * (2 * i + 1);
        path.quadraticBezierTo(x1, y1, x2, y2);
      }
      return path;
    }

    final path1 = createWavyPath(
        size.height * 0.25, 20, 4, 25); // Adjust amplitude and waves as needed
    final path2 = createWavyPath(
        size.height * 0.5, 30, 6, 25); // Adjust amplitude and waves as needed
    final path3 = createWavyPath(
        size.height * 0.75, 25, 5, 25); // Adjust amplitude and waves as needed

    canvas.drawPath(path1, paint);
    canvas.drawPath(path2, paint);
    canvas.drawPath(path3, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}
