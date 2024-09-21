from rembg import remove
from PIL import Image
from flask import Flask, render_template, request, send_from_directory
import os
from waitress import serve

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads'
OUTPUT_FOLDER = 'static/output'

# Create upload and output directories if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files.get('file')
        if file:
            input_path = os.path.join(UPLOAD_FOLDER, file.filename)
            output_filename = f"output_{file.filename}"
            output_path = os.path.join(OUTPUT_FOLDER, output_filename)

            file.save(input_path)

            try:
                input_image = Image.open(input_path)
                output_image = remove(input_image)

                # Save output as PNG to support transparency
                output_image.save(output_path, format='PNG')

                return render_template('index.html', result_image=output_filename, original_filename=file.filename)
            except Exception as e:
                return render_template('index.html', error=f"An error occurred: {e}")

    return render_template('index.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use PORT env variable
    serve(app, host='0.0.0.0', port=port)
