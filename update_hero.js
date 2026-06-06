const fs = require('fs');

const path = '/home/denny/Documents/Projects/EzShift/Frontend/src/Component/Client/Dashboard/ClientDashboardHeroSection.jsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  // Layout backgrounds
  { regex: /bg-gradient-to-br from-slate-50 via-blue-50\/30 to-indigo-50\/50/g, replacement: "bg-gray-50" },
  { regex: /bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700/g, replacement: "bg-white border-b border-gray-200" },
  { regex: /text-white/g, replacement: "text-gray-900" },
  { regex: /bg-black\/20/g, replacement: "bg-transparent" },
  { regex: /bg-white\/20 backdrop-blur-sm border-white\/30/g, replacement: "bg-primary-light text-primary border-primary/20" },
  { regex: /bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent/g, replacement: "text-gray-900" },
  { regex: /bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent/g, replacement: "text-primary" },
  { regex: /text-blue-100/g, replacement: "text-gray-600" },
  { regex: /bg-white text-primary/g, replacement: "bg-primary text-white" },
  { regex: /border-2 border-white text-white/g, replacement: "border-2 border-primary text-primary" },
  { regex: /hover:bg-white hover:text-primary/g, replacement: "hover:bg-primary hover:text-white" },
  { regex: /text-yellow-300/g, replacement: "text-primary font-bold" },
  
  // Why choose us
  { regex: /bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent/g, replacement: "text-gray-900" },
  { regex: /bg-gradient-to-br from-[a-z]+-500\/10 to-[a-z]+-500\/10/g, replacement: "bg-white shadow-sm" },
  
  // CTA
  { regex: /bg-gradient-to-r from-blue-600 to-purple-600 text-white/g, replacement: "bg-primary text-white rounded-2xl shadow-sm my-10 mx-auto max-w-7xl" },
  { regex: /bg-gradient-to-br from-gray-50 to-blue-50\/30/g, replacement: "bg-white" },
  { regex: /bg-gray-50/g, replacement: "bg-gray-50/50" }
];

replacements.forEach(({ regex, replacement }) => {
  content = content.replace(regex, replacement);
});

// Since we replaced text-white with text-gray-900 globally, 
// we need to fix it back for the CTA section and buttons which we want to keep white.
content = content.replace(/bg-primary text-gray-900/g, "bg-primary text-white");
content = content.replace(/hover:text-white/g, "hover:text-white");
content = content.replace(/text-gray-900 px-10 py-4 bg-white/g, "text-primary px-10 py-4 bg-white");

fs.writeFileSync(path, content);
console.log("Updated ClientDashboardHeroSection.jsx");
