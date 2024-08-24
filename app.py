from flask import Flask, render_template, request, send_from_directory
import os

app = Flask(__name__)

# Set the path to your Asterisk folder
ASTRERISK_FOLDER = 'asterisk'

@app.route('/')
def index():
    # Get list of years (folders) in the Asterisk directory
    years = [folder for folder in os.listdir(ASTRERISK_FOLDER) if os.path.isdir(os.path.join(ASTRERISK_FOLDER, folder))]
    
    # Get the selected year, month, and day from the query parameters
    selected_year = request.args.get('year')
    selected_month = request.args.get('month')
    selected_day = request.args.get('day')
    
    months = []
    days = []
    files = []

    # If a year is selected, list the months in that year's folder
    if selected_year and selected_year in years:
        year_folder = os.path.join(ASTRERISK_FOLDER, selected_year)
        months = [folder for folder in os.listdir(year_folder) if os.path.isdir(os.path.join(year_folder, folder))]
        
        # If a month is also selected, list days in that month's folder
        if selected_month and selected_month in months:
            month_folder = os.path.join(year_folder, selected_month)
            days = [folder for folder in os.listdir(month_folder) if os.path.isdir(os.path.join(month_folder, folder))]

            # If a day is also selected, list files in that day's folder
            if selected_day and selected_day in days:
                day_folder = os.path.join(month_folder, selected_day)
                files = [
                    {
                        'filename': file,
                        'callerid': file.split('-')[1] if len(file.split('-')) > 1 else 'Unknown'  # Extract Caller ID with error handling
                    }
                    for file in os.listdir(day_folder)
                    if os.path.getsize(os.path.join(day_folder, file)) > 44  # Filter out files <= 44 bytes
                ]
            else:
                selected_day = None
        else:
            selected_month = None
    
    return render_template('index.html', years=years, months=months, days=days, files=files, selected_year=selected_year, selected_month=selected_month, selected_day=selected_day)

@app.route('/files/<year>/<month>/<day>/<path:filename>')
def serve_file(year, month, day, filename):
    return send_from_directory(os.path.join(ASTRERISK_FOLDER, year, month, day), filename)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8081)
