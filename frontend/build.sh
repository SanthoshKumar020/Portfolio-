#!/bin/bash

# 1. Install Flutter SDK
git clone https://github.com/flutter/flutter.git --depth 1
export PATH="$PATH:`pwd`/flutter/bin"

# 2. Run flutter doctor to confirm installation
flutter doctor

# 3. Build the Flutter web app
flutter build web --release
