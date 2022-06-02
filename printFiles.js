const fs = require('fs');
const path = require('path');

const readdir = (p, done, a = [], i = 0) =>
	fs.readdir(
		p,
		(e, d = []) =>
			d.map(f =>
				readdir(
					a[a.push(path.join(p, f)) - 1],
					() => ++i == d.length && done(a),
					a
				)
			).length || done(a)
	);

const writeToFile = files => {
	const outStream = path.resolve(__dirname, 'outfile.txt');
	const allFiles = [];

	fs.writeFileSync(outStream, '');

	for (const f of files) {
		if (fs.lstatSync(f).isDirectory()) continue;
		allFiles.push(f);
	}

	for (const f of allFiles) {
		const text = fs.readFileSync(f, {
			encoding: 'utf-8',
		});

		const relativeFilePath = f.replace(__dirname, '');

		let data = '>>>>  ' + relativeFilePath + '  <<<<\n\n' + text + '\n\n';

		fs.appendFileSync(outStream, data, err => {});
	}
};

readdir(path.resolve(__dirname, 'src'), writeToFile);
