📢 UniNotify – College Opportunity Aggregator Platform

UniNotify is a web-based platform that centralizes all college-related opportunities and announcements in one place. It helps students stay updated with internships, hackathons, placements, workshops, scholarships, and events without relying on scattered group chats.

🚀 Features
📂 Categorized Opportunities
Organizes updates into structured sections like internships, hackathons, placements, workshops, and more.
🔐 Authentication & Authorization
Secure login system with Role-Based Access Control (RBAC) (Admin & Student roles).
📧 Email Notifications
Integrated Nodemailer to send real-time email alerts for new opportunities.
🧑‍💻 User-Friendly Interface
Clean and simple UI built using server-side rendering with EJS.
⚙️ Admin Controls
Admins can add, update, and delete opportunities.
📊 Centralized Dashboard
Students can view all relevant opportunities in one place.
🛠️ Tech Stack
Backend: Node.js, Express.js
Frontend: EJS, HTML, CSS, JavaScript
Database: MongoDB
Authentication: Session-based / JWT (depending on your implementation)
Email Service: Nodemailer
📁 Project Structure
UniNotify/
│
├── models/         # Database schemas
├── routes/         # Application routes
├── controllers/    # Business logic
├── views/          # EJS templates
├── public/         # Static files (CSS, JS)
├── middleware/     # Auth & RBAC middleware
├── config/         # DB & email configuration
├── app.js          # Main server file
└── package.json
⚙️ Installation & Setup
Clone the repository
git clone https://github.com/your-username/uninotify.git
cd uninotify
Install dependencies
npm install
Setup environment variables
Create a .env file and add:
PORT=8080
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
SESSION_SECRET=your_secret_key
Run the application
npm start
Open in browser:
http://localhost:8080
🔐 Roles
Admin
Manage opportunities (CRUD)
Send notifications
Student
View opportunities
Receive email alerts
📸 Screenshots (Optional)

Add screenshots of your project here

🎯 Future Enhancements
🔔 Push notifications
📱 Mobile responsiveness improvements
🔍 Advanced search & filters
🌐 Deployment (AWS / Vercel)
🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

📬 Contact

Arman Shaikh
📧 armanshaikh0710@gmail.com

⭐ Support

If you like this project, give it a ⭐ on GitHub!
