#!/bin/bash

# 1. Install a specific, compatible version of the Flutter SDK
git clone https://github.com/flutter/flutter.git --branch 3.22.3 --depth 1
export PATH="$PATH:`pwd`/flutter/bin"

# 2. Change into the frontend directory
cd frontend

# 3. Run flutter doctor and build
flutter doctor
flutter pub get
flutter build web --release
