# AI-Powered Credit Card Fraud Detection & Prevention

## 🚀 Overview

This project is an AI-powered web application designed to detect and prevent credit card fraud in real time. It leverages machine learning models, advanced analytics, and a user-friendly interface to analyze transaction data, flag suspicious activity, and help protect users and businesses from financial threats.

---

## 🛠️ Features

- **Real-Time Fraud Detection:** Instantly analyzes transactions for suspicious patterns.
- **Anomaly Detection:** Identifies unusual spending behavior using AI.
- **Predictive Analytics:** Forecasts fraud trends before they occur.
- **Multi-Layered Authentication:** Supports extra security checks for high-risk transactions.
- **User-Friendly Interface:** Simple web form for entering and checking transaction risk.
- **Transaction History:** View past transaction checks and their fraud status.
- **Dark Mode Support:** Toggle between light and dark themes.

---

## 📊 Dataset

- **Source:** [Kaggle - Credit Card Fraud Detection](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud)
- **Type:** Public, anonymized real-world dataset
- **Size:** 284,807 transactions, 31 features (including PCA components, Amount, Time, and Class)

---

## 🏗️ Project Workflow

1. **Data Collection:** Download and prepare the dataset from Kaggle.
2. **Preprocessing:** Clean data, handle outliers, encode features, and scale values.
3. **EDA:** Visualize data with histograms, boxplots, and heatmaps to find trends and patterns.
4. **Feature Engineering:** Create new features (e.g., transaction hour, log amount), select the most relevant ones, and transform data.
5. **Modeling:** Train and evaluate multiple models (Logistic Regression, Random Forest, XGBoost, Neural Network).
6. **Evaluation:** Use metrics like accuracy, F1-score, ROC-AUC, and confusion matrix.
7. **Deployment:** Deploy the model as a Flask API (e.g., on Render) and connect it to the web frontend.

---

## 💻 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python (Flask), scikit-learn, joblib
- **Visualization:** Matplotlib, Seaborn (for EDA)
- **Deployment:** Render (Flask API), GitHub Pages (static frontend)
- **Dataset:** Kaggle Credit Card Fraud Detection

---

## 🖥️ System Requirements

- **RAM:** 4 GB minimum (8 GB recommended)
- **Python:** 3.8+
- **Node.js:** 16+ (if using npm packages)
- **IDE:** VS Code, PyCharm, or Jupyter Notebook
- **Browser:** Chrome, Firefox, or Edge

---

## ⚙️ Installation & Usage

1. **Clone the repository:**
    ```bash
    git clone https://github.com/SickPsycho06/AI-powered-credit-card-fraud-detection-and-prevention.git
    cd AI-powered-credit-card-fraud-detection-and-prevention
    ```

2. **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3. **Train the model (if needed):**
    ```bash
    python train_model.py
    ```

4. **Run the Flask backend:**
    ```bash
    python app.py
    ```

5. **Open `index.html` in your browser for the frontend.**

---

## 🌐 Deployment

- **Backend:** Deployed as a Flask API on [Render](https://render.com/) (or similar).
- **Frontend:** Static HTML/CSS/JS, can be hosted on GitHub Pages or any static site host.

---

## 👨‍💻 Contributors

- **Priskilla S** – Project Coordinator  
- **Deno Crispin C** – Developer & Backend Specialist  
- **Kahled M** – Designer & Frontend Developer  

---

## 📄 License

This project is for educational and research purposes. See [LICENSE](LICENSE) for details.

---

## 📬 Contact

For technical support or collaboration, please open an issue or contact the team via the [GitHub repository](https://github.com/SickPsycho06/AI-powered-credit-card-fraud-detection-and-prevention.git).

---
