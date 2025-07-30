import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:neura_frontend/bloc/home_screen_bloc.dart';
import 'package:avatar_glow/avatar_glow.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<ChatBubble> _chatHistory = [
    const ChatBubble(text: "Hello! How can I help you today?", sender: "AI"),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Neura'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {},
          ),
        ],
      ),
      body: BlocConsumer<HomeScreenBloc, HomeScreenState>(
        listener: (context, state) {
          if (state is HomeScreenSuccess) {
            setState(() {
              _chatHistory.add(ChatBubble(text: state.response, sender: "AI"));
            });
          } else if (state is HomeScreenError) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(state.error)),
            );
          }
        },
        builder: (context, state) {
          bool isListening = state is HomeScreenListening;
          String statusText = "Tap the mic to start";
          if (state is HomeScreenListening) statusText = "Listening...";
          if (state is HomeScreenProcessing) statusText = "Processing...";
          if (state is HomeScreenError) statusText = "Error! Tap to try again.";

          return Column(
            children: [
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.all(16.0),
                  itemCount: _chatHistory.length,
                  itemBuilder: (context, index) => _chatHistory[index],
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    Text(statusText, style: Theme.of(context).textTheme.bodyMedium),
                    const SizedBox(height: 16),
                    AvatarGlow(
                      animate: isListening,
                      glowColor: Theme.of(context).colorScheme.secondary,
                      duration: const Duration(milliseconds: 2000),
                      repeat: true,
                      child: GestureDetector(
                        onTap: () {
                          if (isListening) {
                            context.read<HomeScreenBloc>().add(StopListeningEvent());
                          } else {
                            context.read<HomeScreenBloc>().add(StartListeningEvent());
                          }
                        },
                        child: CircleAvatar(
                          radius: 40,
                          backgroundColor: isListening ? Colors.redAccent : Theme.of(context).colorScheme.secondary,
                          child: Icon(
                            isListening ? Icons.mic : Icons.mic_none,
                            color: Colors.white,
                            size: 40,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

class ChatBubble extends StatelessWidget {
  final String text;
  final String sender;

  const ChatBubble({super.key, required this.text, required this.sender});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: sender == "User" ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 4.0),
        padding: const EdgeInsets.all(12.0),
        decoration: BoxDecoration(
          color: sender == "User"
              ? Theme.of(context).colorScheme.secondary.withOpacity(0.8)
              : Theme.of(context).cardColor,
          borderRadius: BorderRadius.circular(16.0),
        ),
        child: Text(
          text,
          style: Theme.of(context).textTheme.bodyLarge,
        ),
      ),
    );
  }
}
