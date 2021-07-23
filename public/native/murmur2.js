/* eslint-disable global-require */

const os = require('os');

const arch = process.arch.startsWith('arm') ? `-${process.arch}` : '';
const addon = `./${os.platform()}/murmur2${arch}.node`;

const addonPromise = filePath => {
  return new Promise((resolve, reject) => {
    addon.thread_callback(filePath, (err, value) => {
      if (err) reject(err);
      resolve(value);
    });
  });
};

module.exports = addonPromise;
