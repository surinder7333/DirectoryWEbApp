Assignment: Directory Listing
Project Overview
its a  Directory Listing Web Application using React, Redux Toolkit, Node.js, Express.js, and MongoDB. The application allows users to manage products, apply filters, and perform quick edits efficiently.

Technology Stack
Frontend: React, Redux Toolkit

Backend: Node.js, Express.js

Database: MongoDB

Version Control: Git, GitHub

Setup Instructions
1. Clone the Repository
sh
Copy
Edit
git clone https://github.com/surinder7333/DirectoryWEbApp.git
cd DirectoryWEbApp
2. Install Dependencies
Backend Setup
sh
Copy
Edit
cd backend
npm install
Frontend Setup
sh
Copy
Edit
cd ../frontend
npm install
3. Configure Environment Variables
Create a .env file in the backend folder and add:
the mongo connection string and port.
4. Start the Application
5. for basic product, material, grades seed data run the npm run seed command
Run Backend
sh
Copy
Edit
cd backend
npm start
Backend runs on http://localhost:8080

Run Frontend
sh
Copy
Edit
cd frontend
npm start
Frontend runs on http://localhost:5173

Features to Implement
1. Product Listing (Home Page)
Display a list of products with filtering and sorting options.

Allow bulk actions on multiple selected products.

2. Database Collections
Product Collection: Store product types (Pipes, Tubing, etc.).

Material Collection: Store materials (Stainless Steel, Carbon Steel, etc.).

Grade Collection: Store grades (A105, 304, etc.).

Product-Combination Collection: Store product-material-grade combinations with additional details.

3. Product Addition & Editing
Add new products with a modal form.

Quick edit feature to update details like shape, length, thickness, and price.

Bulk edit feature to update multiple products simultaneously
