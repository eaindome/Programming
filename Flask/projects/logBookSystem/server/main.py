import signal
import sys
from app.app import app

def signal_handler(signal, frame):
    print('Server stopped due to a system signal.')
    sys.exit(0)

if __name__ == '__main__':
    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGINT, signal_handler)
    try:
        app.run(debug=True)
    except KeyboardInterrupt:
        print("Server stoped by developer.")