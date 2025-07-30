from ppadb.client import Client as AdbClient
from langchain.tools import tool

# --- ADB Connection ---
# We define this once, so all tools in this module can share the connection.
try:
    client = AdbClient(host="127.0.0.1", port=5037)
    devices = client.devices()
    if len(devices) == 0:
        adb_device = None
    else:
        adb_device = devices[0]
except Exception as e:
    print("Error connecting to ADB. Make sure ADB server is running.")
    print(e)
    adb_device = None

# --- Tool Definitions ---

@tool
def turn_on_wifi():
    """Turns on the Wi-Fi on the connected Android device."""
    if adb_device:
        adb_device.shell("svc wifi enable")
        return "Wi-Fi has been enabled."
    return "Could not execute command: No Android device is connected."

@tool
def turn_off_wifi():
    """Turns off the Wi-Fi on the connected Android device."""
    if adb_device:
        adb_device.shell("svc wifi disable")
        return "Wi-Fi has been disabled."
    return "Could not execute command: No Android device is connected."

@tool
def get_device_status():
    """Gets the connection status and serial number of the Android device."""
    if adb_device:
        return f"Device connected: {adb_device.serial}"
    return "No device is currently connected."

@tool
def open_app(package_name: str):
    """
    Opens an application on the device using its package name.
    For example, to open chrome, use 'com.android.chrome'.
    """
    if adb_device:
        # The 'monkey' command is a reliable way to launch a main activity
        adb_device.shell(f"monkey -p {package_name} -c android.intent.category.LAUNCHER 1")
        return f"Opened app: {package_name}"
    return "Could not execute command: No Android device is connected."
