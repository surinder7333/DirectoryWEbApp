# Project Information

This is a web application for managing products, materials, and grades. It allows users to add products, update details using quick edit, filter the product list, and perform bulk actions. The project is built using **React, Redux Toolkit, Node.js, Express, and MongoDB**.

---

## 🚀 Features

### ✅ Product List (Home Page)
- View the list of products with filtering and sorting options.
- Filter by **Product Type** and **Material**.
- Perform **Bulk Edit** to update multiple products at once.
- **Quick Edit** to update product details inline.
- Show **Product Count**.

### ✅ Product Management
- Store products, materials, and grades in separate MongoDB collections.
- Combine selected **Product, Material, and Grade** to generate a **final product name**.
- Maintain a **product combination collection** with price, currency, shape, length, and thickness.

### ✅ Product Editing
- Expand a row using **Quick Edit** to modify shape, length, price, etc.
- Update details and reflect changes in the listing.

### ✅ Tech Stack
- **Frontend:** React + Redux Toolkit
- **Backend:** Node.js + Express
- **Database:** MongoDB

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/product-management.git
cd product-management


 Install Dependencies
Frontend Setup
sh
Copy
Edit
cd client
npm install
Backend Setup
sh
Copy
Edit
cd server
npm install
⚙️ Running the Application
3️⃣ Start the Backend Server
sh
Copy
Edit
cd server
npm start
The backend runs on http://localhost:8080 or https://directorywebapp.onrender.com

4️⃣ Start the Frontend
sh
Copy
Edit
cd client
npm start
The frontend runs on http://localhost:5173

│
│── README.md              # Project Documentation
📌 How to Use
1️⃣ Adding a Product
Click "Add Product".

Select a Product Type, Material, and Grade.

Submit to generate a final product combination.

2️⃣ Quick Edit
Click "Quick Edit" on any product.

Modify details like Shape, Length, Price.

Click Update to save.

3️⃣ Bulk Edit
Select multiple products.

Apply bulk updates to selected items.

🛠 API Endpoints
Method	Endpoint	Description
GET	/api/products	Fetch all products
POST	/api/products	Add a new product
PUT	/api/products/:id	Update product details
DELETE	/api/products/:id	Delete a product
GET	/api/materials	Fetch all materials
GET	/api/grades	Fetch all grades
💡 Troubleshooting
MongoDB Connection Error?

Ensure MongoDB is running locally or provide a correct connection string.

React App Not Starting?

Check if ports 5173 (frontend) and 5000 (backend) are free.

Backend API Not Responding?

Use Postman or cURL to test API endpoints.

