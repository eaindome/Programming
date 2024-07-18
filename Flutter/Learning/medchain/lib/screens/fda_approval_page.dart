import 'package:flutter/material.dart';

class FDAApprovalPage extends StatelessWidget {
  final bool isApproved;

  const FDAApprovalPage({super.key, required this.isApproved});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('FDA Approval'),
      ),
      body: Center(
        child: isApproved
            ? const Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Icon(Icons.check_circle, color: Colors.green, size: 100),
                  Text('This drug has been approved by the FDA'),
                ],
              )
            : const Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Icon(Icons.cancel, color: Colors.red, size: 100),
                  Text('This drug has not been approved by the FDA'),
                ],
              ),
      ),
    );
  }
}
