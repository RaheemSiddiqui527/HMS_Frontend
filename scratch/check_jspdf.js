
const jspdf = require('jspdf');
console.log('Keys in jspdf:', Object.keys(jspdf));
if (jspdf.jsPDF) console.log('Found jsPDF named export');
if (jspdf.default) console.log('Found default export');
