import fs from 'node:fs';
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist',{recursive:true});fs.cpSync('public','dist',{recursive:true});
const keys={apiKey:'FIREBASE_API_KEY',authDomain:'FIREBASE_AUTH_DOMAIN',projectId:'FIREBASE_PROJECT_ID',appId:'FIREBASE_APP_ID'};
const config=Object.fromEntries(Object.entries(keys).filter(([,name])=>process.env[name]).map(([key,name])=>[key,process.env[name]]));
if(Object.keys(config).length && Object.keys(config).length!==4)throw Error('Set all four FIREBASE_* variables. See .env.example.');
fs.writeFileSync('dist/firebase-config.js','window.FIREBASE_CONFIG = '+JSON.stringify(config)+';\n');
console.log(config.apiKey?'Built with Firebase connection.':'Built in browser-local demo mode.');
