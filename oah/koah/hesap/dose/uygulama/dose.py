from flask import Flask, render_template, request, jsonify
from waitress import serve
import os

app = Flask(__name__)

# DOSE İndeksi Hesaplama
def dose_index(dyspnea, obstruction, smoking_status, exacerbations):
    return dyspnea + obstruction + smoking_status + exacerbations

@app.route('/')
def index():
    return render_template('dose.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    dyspnea = int(request.form['dyspnea'])
    obstruction = int(request.form['obstruction'])
    smoking_status = int(request.form['smoking_status'])
    exacerbations = int(request.form['exacerbations'])

    score = dose_index(dyspnea, obstruction, smoking_status, exacerbations)

    return render_template('dose.html', score=score)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    serve(app, host='0.0.0.0', port=port)