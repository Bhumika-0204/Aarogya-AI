# Aarogya AI

A modern, comprehensive web application for managing healthcare needs using advanced AI technologies. It offers features ranging from wellness tracking, doctor consultations, to intelligent chatbot diagnostics.

## 🚀 Features

- **Personalized Healthcare Dashboard**: Intuitive interface for daily wellness tracking and metrics.
- **AI-Powered Diagnostics**: Integrated chatbot for initial health assessments and query resolution.
- **Doctor Directory and Appointments**: Browse and connect with medical professionals seamlessly.
- **Secure Authentication**: Built-in authentication utilizing Firebase for robust user management.
- **High Performance & Responsive UI**: Fast build tool (Vite) combined with beautiful component design (Tailwind CSS, shadcn/ui).

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+ with Vite
- **Language**: TypeScript throughout the application
- **Styling & UI**: Tailwind CSS 3, shadcn/ui, Radix UI Primitives, Framer Motion
- **Backend/Services**: Node.js ecosystem, Firebase (Authentication & Storage)
- **State Management & Data fetching**: React Context, Zustand, React Query
- **Routing**: React Router DOM

## ⚙️ Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Make sure you fill in all required values in the `.env` file, especially your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```
   *(Note: The actual `.env` file containing secrets is securely ignored by Git.)*

## 📥 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Aarogya-AI
   ```

2. **Install dependencies**
   Ensure you have Node.js (v22+) installed.
   ```bash
   npm install
   ```

## 💻 Usage

To start the local development server with hot-module replacement (HMR):

```bash
npm run dev
```
The application will be accessible at `http://localhost:5173/` by default.

**To build for production:**
```bash
npm run build
```

**To test the app locally:**
```bash
npm run test
```

## 📂 Folder Structure

```
Aarogya-AI/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── api/                # API route definitions
│   ├── components/         # Reusable React components (aarogya views, UI library)
│   ├── context/            # React Context files
│   ├── layouts/            # Page layouts
│   ├── lib/                # Utility functions and library wrappers (e.g., Firebase)
│   ├── pages/              # Application pages and routing views
│   ├── styles/             # Global CSS and Tailwind directives
│   ├── test/               # Setup files for testing
│   ├── App.tsx             # Root application component
│   └── main.tsx            # React application entry point
├── .env.example            # Environment variables template
├── .gitignore              # Files and directories ignored by version control
├── package.json            # Project dependencies and operational scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler configuration
```

## 📸 Screenshots / Demo

*(Add screenshots of the Aarogya AI platform here once available)*
- Placeholder 1
- Placeholder 2

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
