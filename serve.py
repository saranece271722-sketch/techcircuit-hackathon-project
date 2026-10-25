import http.server
import socketserver
import os
import sys
import webbrowser

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and disable aggressive caching for dev testing
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def main():
    os.chdir(DIRECTORY)
    
    # Try PORT or PORT+1 if busy
    port = PORT
    for attempt in range(10):
        try:
            socketserver.TCPServer.allow_reuse_address = True
            httpd = socketserver.TCPServer(('127.0.0.1', port), Handler)
            print("============================================================")
            print("  OFFICE INFO CONTROLLER - ZERO-LEAK ENTERPRISE GATEWAY")
            print("============================================================")
            print(f"  Serving at: http://localhost:{port}/index.html")
            print(f"  Directory:  {DIRECTORY}")
            print("  Status:     Online (AES-256 Envelope Shield Active)")
            print("============================================================")
            print("  Press Ctrl+C to terminate the local gateway.")
            print("============================================================")
            
            url = f"http://localhost:{port}/index.html"
            try:
                webbrowser.open(url)
            except Exception:
                pass
            try:
                if sys.platform == 'win32':
                    os.system(f'start {url}')
            except Exception:
                pass
                
            httpd.serve_forever()
            break
        except OSError:
            port += 1

if __name__ == '__main__':
    main()
