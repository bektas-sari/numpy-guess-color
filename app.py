from flask import Flask, render_template, request, jsonify
import numpy as np

app = Flask(__name__)

# Function to generate a random card color
def generate_card():
    return np.random.choice(["blue", "red"])

card_color = generate_card()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/guess", methods=["POST"])
def guess():
    global card_color
    user_guess = request.json.get("guess")
    is_correct = user_guess == card_color  

    if is_correct:
        card_color = generate_card()  

    return jsonify({"correct": is_correct})

if __name__ == "__main__":
    app.run(debug=True)
