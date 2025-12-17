# 📦 Inventory Management System

A simple and scalable **Inventory Management System** built using **React**, **FastAPI**, and **Supabase**.  
This system helps manage warehouses, stock, receipts, deliveries, and internal adjustments with a clean UI and modern backend.

---

### 🚀 Tech Stack
#### Frontend
- React.js
- Tailwind CSS
#### Backend
- FastAPI 
- PostgreSQL
#### Database 
- Supabase
  - PostgreSQL Database


---

### ✨ Features

#### 📊 Dashboard
- Receipt statistics
- Delivery statistics
- Inventory overview

#### 🏢 Warehouse Management
- Warehouse list
- Single warehouse detail page
- Warehouse-wise stock view

#### 📦 Stock Management
- View stock per product
- Update stock quantities
- Internal stock adjustments

#### 🔄 Operations
- **Receipts**
  - Receipt list
  - Single receipt detail page
- **Deliveries**
  - Delivery list
  - Single delivery operation page
- **Internal Adjustments**
  - Inventory corrections

#### 🕒 Move History
- Complete stock movement history
- Ledger-style tracking

#### 👤 User Settings
- User profile management
- Role-based access (Inventory Manager / Warehouse Staff)

#### 🧭 Navigation
- Dashboard  
- Operations  
  - Receipts  
  - Delivery  
  - Adjustment  
- Stock  
- Move History  
- Settings  

---


### ⚙️ Setup Guide

#### 1️. Clone the Repository
```bash
git clone https://github.com/VriVa/StockMaster-IMS.git
cd inventory-management-system
```
#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
#### Frontend runs at :
http://localhost:5173

#### 3. Backend Setup
Create virtual environment
```bash
cd app
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```
Install dependencies
```bash
pip install -r requirements.txt
```
Run Server
```bash
uvicorn app.main:app --reload
```
Backend runs at:
http://localhost:8000

#### 4. Supabase Setup
1. Create a project on Supabase
2. Copy: Database URL
3. Create a .env file:
```bash
PG_DL=postgresql://username:password@host:port/dbname
```
#### 5. Authentication
Handled via Clerk.

#### Developed By Vriddhi Vashi, Aaryan Mantri, Aishani Singh and Jash Shah.




