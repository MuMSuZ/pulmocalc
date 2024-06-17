from flask import Flask, render_template, request
from waitress import serve
import os

app = Flask(__name__)

def bode_index(bmi, fev1_percent, mrc_dyspnea, walk_distance):
    if bmi < 21:
        bmi_score = 1
    else:
        bmi_score = 0

    if fev1_percent >= 65:
        fev1_score = 0
    elif 50 <= fev1_percent < 65:
        fev1_score = 1
    elif 36 <= fev1_percent < 50:
        fev1_score = 2
    else:
        fev1_score = 3

    if mrc_dyspnea == 0 or mrc_dyspnea == 1:
        mrc_score = 0
    elif mrc_dyspnea == 2:
        mrc_score = 1
    elif mrc_dyspnea == 3:
        mrc_score = 2
    else:
        mrc_score = 3

    if walk_distance >= 350:
        walk_score = 0
    elif 250 <= walk_distance < 350:
        walk_score = 1
    elif 150 <= walk_distance < 250:
        walk_score = 2
    else:
        walk_score = 3

    return bmi_score + fev1_score + mrc_score + walk_score

@app.route('/')
def index():
    return render_template('bode.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    bmi = float(request.form['bmi'])
    fev1_percent = float(request.form['fev1_percent'])
    mrc_dyspnea = int(request.form['mrc_dyspnea'])
    walk_distance = float(request.form['walk_distance'])
    
    score = bode_index(bmi, fev1_percent, mrc_dyspnea, walk_distance)
    
    return render_template('bode.html', score=score)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    serve(app, host='0.0.0.0', port=port)
