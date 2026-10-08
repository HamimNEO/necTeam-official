# NEC TEAM — Official Web Portal

> **Your team. One clear workspace.**  
> An all-in-one workforce operations, CRM, attendance, and team collaboration platform built for high-performing teams by **NEONECY**.

[![Deploy to GitHub Pages](https://github.com/HamimNEO/necTeam-official/actions/workflows/deploy.yml/badge.svg)](https://github.com/HamimNEO/necTeam-official/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live_Site-GitHub_Pages-2ea44f?style=flat&logo=github)](https://hamimneo.github.io/necTeam-official/)
[![Company](https://img.shields.io/badge/Company-NEONECY-5865F2?style=flat)](https://neonecy.com/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 👨‍💻 Developer & Leadership

<div align="center">

### **MD. ABDUL HAMIM**
**LEAD FLUTTER DEVELOPER**  
**NEONECY**

[![Website](https://img.shields.io/badge/Official_Website-neonecy.com-3435ed?style=for-the-badge&logo=google-chrome&logoColor=white)](https://neonecy.com/)
[![GitHub Profile](https://img.shields.io/badge/GitHub-HamimNEO-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/HamimNEO)
[![Direct Contact](https://img.shields.io/badge/Email-bingi.startup%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:bingi.startup@gmail.com)

</div>

---

## 🌐 Website Sitemap & Section URLs

The official web portal is live on GitHub Pages with dedicated links to every section and policy document:

### 🏠 Landing Page Sections

| Section | Description | Live Direct Link |
| :--- | :--- | :--- |
| **Official Homepage** | Main landing gateway & overview | [View Homepage](https://hamimneo.github.io/necTeam-official/) |
| **Interactive App Preview** | 3D screen deck showcasing Auth, Staff & Admin views | [View App Preview](https://hamimneo.github.io/necTeam-official/#main) |
| **Core Workflow Strip** | Quick highlights of People, Attendance, Leads & Chat | [View Workflows](https://hamimneo.github.io/necTeam-official/#features) |
| **App Features Grid** | Deep dive into the 6 foundational modules of NEC TEAM | [View Features](https://hamimneo.github.io/necTeam-official/#features) |
| **Trust, Security & Privacy** | Overview of data safeguards and compliance transparency | [View Trust Center](https://hamimneo.github.io/necTeam-official/#privacy) |
| **Frequently Asked Questions** | Answers regarding testing, availability, and privacy | [View FAQ](https://hamimneo.github.io/necTeam-official/#faq) |
| **Store & Pre-Release** | Coming soon download modals for Google Play & App Store | [View Download](https://hamimneo.github.io/necTeam-official/#download) |
| **Featured Showcase** | Full-width high-definition app feature banner | [View Showcase](https://hamimneo.github.io/necTeam-official/#download) |
| **About NEONECY** | Company vision and link to parent site [neonecy.com](https://neonecy.com/) | [View About Section](https://hamimneo.github.io/necTeam-official/#about) |

### 📜 Information, Support & Policy Pages

| Page | Scope & Content | Direct URL |
| :--- | :--- | :--- |
| **Privacy Policy** | Complete data handling practices, Firebase details & security | [Privacy Policy](https://hamimneo.github.io/necTeam-official/privacy-policy/) |
| **Terms & Conditions** | Ground rules, acceptable use, and pre-release test terms | [Terms & Conditions](https://hamimneo.github.io/necTeam-official/terms-and-conditions/) |
| **Account & Data Deletion** | Local wipe guide & live EmailJS automated deletion request form | [Account & Data Deletion](https://hamimneo.github.io/necTeam-official/data-deletion/) |
| **Data Collection** | Granular summary of permissions, inputs, and cloud services | [Data Collection](https://hamimneo.github.io/necTeam-official/data-collection/) |
| **Support & Contact** | Direct channels, bug submission guidelines, and inquiries | [Support & Contact](https://hamimneo.github.io/necTeam-official/support/) |
| **Official Company Website** | NEONECY corporate homepage & updates | [neonecy.com](https://neonecy.com/) |

---

## 🚀 Key Highlights of NEC TEAM

1. **People & Role Management**: Dual-experience architecture tailoring dedicated portals for Staff and Administrators.
2. **Attendance & Time Tracking**: Seamless check-ins, leave approvals, overtime tracking, and monthly overview summaries.
3. **Leads & Pipeline CRM**: Streamlined follow-ups, client relationship logs, and status queues.
4. **Meal & Lunch Coordination**: Staff can submit daily dietary choices; management gets aggregated counts with zero hassle.
5. **Team Conversations**: Rich in-app messaging, attachments, reactions, and team coordination.
6. **Built-in Compliance & Privacy**: Zero third-party tracker bloat, transparent local storage practices, and EmailJS-powered deletion requests.

---

## 🛠️ Technology Stack & Architecture

- **UI & Logic:** React 19, JavaScript ESNext
- **Bundler & Build Tool:** Vite 6 with Rolldown architecture
- **Design System:** Tailored Vanilla CSS (glassmorphism, vibrant gradients, micro-animations, mobile-first responsive layout)
- **Email Delivery Service:** EmailJS Browser SDK (`@emailjs/browser`)
- **SEO & Static Pre-rendering:** Multi-page SSR static generator (`scripts/generate-pages.mjs`) generating static crawlable HTML for root and all 5 policy routes
- **CI/CD & Hosting:** GitHub Actions workflow (`.github/workflows/deploy.yml`) deploying directly to **GitHub Pages**

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Clone the Repository
```bash
git clone https://github.com/HamimNEO/necTeam-official.git
cd necTeam-official
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
```
Ensure your EmailJS keys are set:
```env
VITE_EMAILJS_SERVICE_ID=service_22pg0de
VITE_EMAILJS_TEMPLATE_ID=template_x1vivzb
VITE_EMAILJS_PUBLIC_KEY=jnbpVMMxod5JhAL7B
```

### 5. Run the Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 6. Build for Production
```bash
npm run build
```
This triggers:
1. `prebuild`: Executes `scripts/generate-pages.mjs` to generate search-engine-ready static HTML documents and copies production assets into `/public/assets`.
2. `build`: Bundles and minifies all assets into the `/dist` directory with relative asset paths ready for production or GitHub Pages.

---

## 🚢 GitHub Pages Hosting Setup

This repository includes an automated GitHub Actions deployment workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

To activate GitHub Pages hosting:
1. Open your repository on GitHub: `https://github.com/HamimNEO/necTeam-official`
2. Navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Every push to the `main` branch will automatically build and publish the live site to:
   👉 **`https://hamimneo.github.io/necTeam-official/`**

---

## 📄 License & Intellectual Property

© 2026 **NEONECY**. All rights reserved.  
NEC TEAM is an official product developed and maintained by **NEONECY**.
