from flask import Flask, render_template
import requests, dotenv, os

dotenv.load_dotenv()
APPLE_MUSIC_API_ENDPOINT = os.getenv("APPLE_MUSIC_API_ENDPOINT")

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/search/<query>')
def search(query):
    url = f"{APPLE_MUSIC_API_ENDPOINT}/api/search/v2/{query}?limit=5"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return "Error", 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5504)