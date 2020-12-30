require('dotenv').config();

const throng = require('throng');
const os = require('os');

const { useClusters, port, clusterWorkers } = require('./config/app');
const app = require('./app');

function startApp() {
  app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
  });
}

if (useClusters) {
  const throngWorkers = clusterWorkers || os.cpus().length;
  throng(throngWorkers, startApp);
} else {
  startApp();
}
