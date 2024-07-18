import 'package:flutter/material.dart';
import 'package:medchain/screens/welcome_page.dart';
// import ''

class UserTypePage extends StatelessWidget {
  const UserTypePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Choose User Type'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const WelcomePage()),
                );
              }, 
              child: const Text('Patient')
            )
          ],
        ),
      )
    );
  }
}