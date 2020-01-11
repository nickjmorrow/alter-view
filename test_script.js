const path = require('path');
const fs = require('fs');

const folderPath = path.join(__dirname, 'src');

fs.readdir(folderPath, (err, files) => {
	files.forEach(file => console.log(file));
});
