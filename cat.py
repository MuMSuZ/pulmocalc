from flask import Flask, render_template, request
from waitress import serve
import os

app = Flask(__name__)

def cat_score(answers):
    score = sum(answers)
    return score

@app.route('/')
def index():
    return render_template('cat.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    answers = [
        int(request.form['q1']),
        int(request.form['q2']),
        int(request.form['q3']),
        int(request.form['q4']),
        int(request.form['q5']),
        int(request.form['q6']),
        int(request.form['q7']),
        int(request.form['q8'])
    ]
    score = cat_score(answers)
    return render_template('cat.html', score=score)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    serve(app, host='0.0.0.0', port=port)