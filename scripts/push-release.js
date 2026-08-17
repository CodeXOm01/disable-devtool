
const {exec} = require('./build/utils');

async function delTag (tagName) {
  await exec(`git tag -d ${tagName}`);
  await exec(`git push origin :refs/tags/${tagName}`);
}



async function main () {
  const argv = process.argv.slice(2);
  
  const tagName = argv[0];
  if (argv[1] !== 'no-del') {
    console.log(`Start delete tag ${tagName}...`);
    await delTag(tagName);
  }
  console.log(`Start create tag ${tagName}...`);
  await exec(`git tag -m "version ${tagName}" ${tagName} master`);
  console.log(`Start push tag ${tagName}...`);
  await exec('git push --tags');
  console.log('Finished!');
}

main();