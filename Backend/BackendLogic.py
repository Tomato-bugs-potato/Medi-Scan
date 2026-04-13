from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import cv2
import numpy as np

from ultralytics import YOLO
import base64

app = FastAPI(title="YOLO v12 Object Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development; restrict in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

location = 'best.pt'
# Load your YOLO model (do this once at startup)
model = YOLO(location)  # Adjust path to your model

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Read image file
        image_data = await file.read()
        
        # Convert to numpy array (OpenCV format)
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Run YOLO inference
        results = model(image)
        
        # Extract predictions
        result = results[0]  # First image results
        
        # Get annotated image
        annotated_image = result.plot()
        
        # Convert annotated image to bytes
        _, encoded_image = cv2.imencode('.jpg', annotated_image)
        annotated_image_bytes = encoded_image.tobytes()
        
        # Extract predictions data
        predictions = []
        if result.boxes:
            for box in result.boxes:
                predictions.append({
                    "class": model.names[int(box.cls)],
                    "confidence": float(box.conf),
                    "bbox": box.xywh.tolist()[0]  # [x_center, y_center, width, height]
                })
        
        # Return response
        return {
            "annotated_image": base64.b64encode(annotated_image_bytes).decode('utf-8'),
            "predictions": predictions,
            "original_size": result.orig_shape
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.get("/")
async def root():
    return {"message": "YOLO v12 Object Detection API"}