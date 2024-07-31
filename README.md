# Mirror 🪞

Welcome to the `mirror` repository! This project provides a robust and customizable template for creating a sleek, modern and professional look portfolio website. The template is perfect for developers with a github account to showcase their projects. Most of the information comes from github, thus minimal configuration is required to run.

## Showcase

## Getting Started

### Prerequisites

Everything you need to build this project are listed below:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Fork and clone

Fork the repository and clone to local to run:

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/mirror.git
cd mirror
```

### Installation

Install the project dependencies by running command below.

```bash
npm install
```

### Running the Project

```bash
npm run start
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

## Usage

### Customize the config file in `config` [directory](https://github.com/songlim327/mirror/tree/master/src/config/config.ts)

Eg:

```typescript
export const config: Record<string, string> = {
    name: 'Song Lim',
    github: 'songlim327',
    email: 'songlim327@gmail.com',
    profilePicture: 'https://avatars.githubusercontent.com/u/36408539?v=4',
    description: 'Hi, good to see you here. I am Song Lim, a currently full time software engineer, is passionate and dedicated in exploring and crafting innovative solutions, delivering high-quality and efficient code. I thrive on continuous learning and explore the latest technologies and industry trends.',
    linkedin: 'https://www.linkedin.com/in/songlim-327/',
    facebook: '',
    stackoverflow: '',
    twitter: 'https://x.com/songlim666',
    resume: ''
} as const;
```

## Package used 📦

| Packages               |
| ---------------------- |
| svelte                 |
| tailwindcss            |
| @tanstack/svelte-query |
| lucide-svelte          |
| typed.js               |
| shadcn-svelte          |
