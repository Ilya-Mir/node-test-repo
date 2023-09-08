const childProcess = require('child_process');
const fs = require('fs');

const isWin = process.platform === 'win32';

let minuteTimer = 0;
let osProcessInfo;

const execProcess = (command, timer) => {
  childProcess.exec(command, (error, stdout, stderr) => {
    console.clear();
    console.log(`${stdout}`);

    if (minuteTimer === 60000) {
      fs.appendFile('activityMonitor.log', `${Math.floor(new Date().getTime() / 1000)}: ${stdout}`, (err) => {
        if (err) throw err;
      });
      minuteTimer = 0;
    }

    if (error !== null) {
      console.log(`error: ${error}`);
    }
  });
};
setInterval(() => {
  minuteTimer += 100;

  if (isWin) {
    osProcessInfo = execProcess("powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"", minuteTimer);
  } else {
    osProcessInfo = execProcess("ps -A -o %cpu,%mem,comm | sort -nr | head -n 1", minuteTimer);
  }
}, 100);
