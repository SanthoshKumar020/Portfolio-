import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:neura_frontend/bloc/home_screen_bloc.dart';
import 'package:neura_frontend/home_screen.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;

void main() {
  runApp(const NeuraApp());
}

class NeuraApp extends StatelessWidget {
  const NeuraApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Neura',
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.blueGrey,
        scaffoldBackgroundColor: const Color(0xFF121212),
        cardColor: const Color(0xFF1E1E1E),
        textTheme: const TextTheme(
          bodyLarge: TextStyle(color: Colors.white),
          bodyMedium: TextStyle(color: Colors.white70),
        ),
        colorScheme: ColorScheme.fromSwatch(
          brightness: Brightness.dark,
          primarySwatch: Colors.blueGrey,
        ).copyWith(
          secondary: Colors.tealAccent,
        ),
      ),
      home: BlocProvider(
        create: (context) => HomeScreenBloc(stt.SpeechToText()),
        child: const HomeScreen(),
      ),
    );
  }
}
