import fs from 'fs';
import csv from 'csvtojson';

const readable = fs.createReadStream(
  'csvdirectory/csvfile.csv', {encoding: 'utf8'});
const writable = fs.createWriteStream('txtfile.txt', {encoding: 'utf8'});

csv({output:"json"})
  .fromStream(readable)
  .subscribe(async (csvLine)=>{
    await writable.write(JSON.stringify(csvLine) + '\n');
  })

