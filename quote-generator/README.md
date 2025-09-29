# Quote Generator

A beautiful, minimal random motivational quote generator built with Next.js and Tailwind CSS.

## Features

- 🎯 Fetches random motivational quotes from an external API
- 🔄 Fallback to curated local quotes when API is unavailable
- 🎨 Beautiful, minimal design with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Built with Next.js 14 and TypeScript
- 🎭 Smooth animations and hover effects

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system.

### Installation

1. Navigate to the project directory:
   ```bash
   cd quote-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

The app tries to fetch quotes from the [Type.fit API](https://type.fit/api/quotes). If the API is unavailable, it falls back to a curated collection of motivational quotes stored locally.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

