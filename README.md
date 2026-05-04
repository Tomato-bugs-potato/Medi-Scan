# MediScan

## Overview
MediScan is a breast cancer detection system leveraging the power of **YOLO v12** for accurate object detection. The project consists of a Python-based FastAPI backend for inference and a modern Next.js frontend for user interaction.

## Features
- **High-Performance Detection:** Uses YOLO v12 trained on medical imaging datasets.
- **Interactive UI:** User-friendly interface built with Next.js, Tailwind CSS, and Shadcn/UI.
- **Fast Inference:** Accelerated backend processing with FastAPI and OpenCV.
- **Visual Feedback:** Displays annotated images with detected regions and confidence scores.

## Technology Stack

### Backend
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
- **Language:** Python
- **ML Model:** YOLO v12 (Ultralytics)
- **Image Processing:** OpenCV, IPv6

### Frontend
- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI / Shadcn

## Project Structure
```
MediScan/
├── Backend/
│   ├── BackendLogic.py   # Main API entry point
│   └── best.pt           # Trained YOLO model weights
├── Frontend/
│   └── image-upload-api(1)/  # Next.js frontend application
└── README.md
```

## Getting Started

### Prerequisites
- **Python 3.8+**
- **Node.js 18+** & **npm**

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd Backend
```

Recommended: Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

Install the required dependencies:
```bash
pip install fastapi uvicorn opencv-python numpy ultralytics python-multipart
```

Start the backend server:
```bash
uvicorn BackendLogic:app --reload
```
The API will be available at `http://localhost:8000`.

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd Frontend/image-upload-api(1)
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to use the application.

## Usage
1. Ensure both the backend and frontend servers are running.
2. Open the frontend URL (`http://localhost:3000`).
3. Upload a medical scan image using the interface.
4. The system will process the image and display the detected results with bounding boxes and confidence scores.

## License
[MIT](LICENSE)
