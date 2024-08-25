from flask import Flask, render_template, request, send_from_directory, redirect, url_for, session
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import os
import time
ASTERISK_FOLDER="asterisk"


app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with your actual secret key

# Setup Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Dummy user data
users = {'admin': 'Nurmuhammad25'}  # username: password

class User(UserMixin):
    def __init__(self, username):
        self.id = username

@login_manager.user_loader
def load_user(username):
    return User(username) if username in users else None

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if users.get(username) == password:
            user = User(username)
            login_user(user)
            return redirect(url_for('index'))
        else:
            return render_template('login.html', error=True)
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/')
@login_required
def index():
    # Get list of years (folders) in the Asterisk directory
    years = [folder for folder in os.listdir(ASTERISK_FOLDER) if os.path.isdir(os.path.join(ASTERISK_FOLDER, folder))]
    
    # Get the selected year, month, day, and call type from the query parameters
    selected_year = request.args.get('year')
    selected_month = request.args.get('month')
    selected_day = request.args.get('day')
    selected_type = request.args.get('type')

    months = []
    days = []
    files = []

    # If a year is selected, list the months in that year's folder
    if selected_year and selected_year in years:
        year_folder = os.path.join(ASTERISK_FOLDER, selected_year)
        months = [folder for folder in os.listdir(year_folder) if os.path.isdir(os.path.join(year_folder, folder))]
        
        # If a month is also selected, list days in that month's folder
        if selected_month and selected_month in months:
            month_folder = os.path.join(year_folder, selected_month)
            days = [folder for folder in os.listdir(month_folder) if os.path.isdir(os.path.join(month_folder, folder))]

            # If a day is also selected, list files in that day's folder
            if selected_day and selected_day in days:
                day_folder = os.path.join(month_folder, selected_day)
                all_files = os.listdir(day_folder)
                
                for file in all_files:
                    file_path = os.path.join(day_folder, file)
                    if os.path.getsize(file_path) > 44:
                        caller_id = file.split('-')[2 if file.startswith('external') else 1]
                        call_type = 'Incoming' if file.startswith('external') else 'Outgoing'
                        
                        # Filter by call type
                        if not selected_type or selected_type == call_type.lower():
                            files.append({
                                'callerid': caller_id,
                                'type': call_type,
                                'time': time.ctime(os.path.getctime(file_path)),
                                'filename': file
                            })

    return render_template('index.html', years=years, months=months, days=days, files=files, selected_year=selected_year, selected_month=selected_month, selected_day=selected_day, selected_type=selected_type)

@app.route('/files/<year>/<month>/<day>/<path:filename>')
@login_required
def serve_file(year, month, day, filename):
    return send_from_directory(os.path.join(ASTERISK_FOLDER, year, month, day), filename)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
