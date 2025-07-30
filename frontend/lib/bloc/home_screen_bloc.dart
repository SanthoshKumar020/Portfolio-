import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:speech_to_text/speech_to_text.dart' as stt;

// --- Events ---
abstract class HomeScreenEvent extends Equatable {
  const HomeScreenEvent();
  @override
  List<Object> get props => [];
}

class StartListeningEvent extends HomeScreenEvent {}
class StopListeningEvent extends HomeScreenEvent {}
class SendCommandEvent extends HomeScreenEvent {
  final String command;
  const SendCommandEvent(this.command);
  @override
  List<Object> get props => [command];
}

// --- States ---
abstract class HomeScreenState extends Equatable {
  const HomeScreenState();
  @override
  List<Object> get props => [];
}

class HomeScreenInitial extends HomeScreenState {}
class HomeScreenListening extends HomeScreenState {}
class HomeScreenProcessing extends HomeScreenState {}
class HomeScreenSuccess extends HomeScreenState {
  final String response;
  const HomeScreenSuccess(this.response);
  @override
  List<Object> get props => [response];
}
class HomeScreenError extends HomeScreenState {
  final String error;
  const HomeScreenError(this.error);
  @override
  List<Object> get props => [error];
}

// --- BLoC ---
class HomeScreenBloc extends Bloc<HomeScreenEvent, HomeScreenState> {
  final stt.SpeechToText _speech;

  HomeScreenBloc(this._speech) : super(HomeScreenInitial()) {
    on<StartListeningEvent>(_onStartListening);
    on<StopListeningEvent>(_onStopListening);
    on<SendCommandEvent>(_onSendCommand);
  }

  void _onStartListening(StartListeningEvent event, Emitter<HomeScreenState> emit) async {
    bool available = await _speech.initialize(
      onStatus: (val) => print('onStatus: $val'),
      onError: (val) => emit(HomeScreenError(val.errorMsg)),
    );
    if (available) {
      emit(HomeScreenListening());
      _speech.listen(
        onResult: (val) {
          if (val.hasConfidenceRating && val.confidence > 0) {
            add(SendCommandEvent(val.recognizedWords));
          }
        },
      );
    } else {
      emit(HomeScreenError("Speech recognition not available."));
    }
  }

  void _onStopListening(StopListeningEvent event, Emitter<HomeScreenState> emit) {
    _speech.stop();
    emit(HomeScreenInitial());
  }

  void _onSendCommand(SendCommandEvent event, Emitter<HomeScreenState> emit) async {
    emit(HomeScreenProcessing());
    try {
      final response = await http.post(
        Uri.parse('http://10.0.2.2:8000/execute-command/'), // 10.0.2.2 is for Android emulator
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'command': event.command,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        emit(HomeScreenSuccess(data['response']));
      } else {
        emit(HomeScreenError('Failed to connect to the backend. Status code: ${response.statusCode}'));
      }
    } catch (e) {
      emit(HomeScreenError('An error occurred: $e'));
    }
  }
}
