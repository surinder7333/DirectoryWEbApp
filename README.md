Directory Listing


Project Overview
A Directory Listing Web Application built using React, Redux Toolkit, Node.js, Express.js, and MongoDB. This application allows users to manage products, filter and sort listings, perform quick edits, and apply bulk updates.

Technology Stack
Frontend: React, Redux Toolkit

Backend: Node.js, Express.js

Database: MongoDB

Version Control: Git, GitHub

Setup Instructions
1. Clone the Repository
git clone https://github.com/surinder7333/DirectoryWEbApp.git
cd DirectoryWEbApp

2. Install Dependencies
Backend Setup
cd backend
npm install

Frontend Setup

cd frontend
npm install

. Configure Environment Variables
Create a .env file inside the backend folder and add:
PORT=8080
MONGO_URI=<your_mongodb_connection_string>

4. Seed Initial Data
 Seed Initial Data
To populate the database with sample product, material, and grade data, run:
cd backend
npm run seed

5. Start the Application
Run Backend

cd backend
npm start

Backend runs on http://localhost:8080

Run Frontend

cd frontend
npm start

Frontend runs on http://localhost:5173

Features
1. Product Listing (Home Page)
✔ Displays a list of products with filtering and sorting options
✔ Supports bulk actions on selected products

2. Database Collections
✔ Product Collection: Stores product types (Pipes, Tubing, etc.)
✔ Material Collection: Stores materials (Stainless Steel, Carbon Steel, etc.)
✔ Grade Collection: Stores grades (A105, 304, etc.)
✔ Product-Combination Collection: Stores product-material-grade combinations with additional details

3. Product Management
✔ Add New Products via a modal form
✔ Quick Edit feature to update details like shape, length, thickness, and price
✔ Bulk Edit feature to update multiple products simultaneously

