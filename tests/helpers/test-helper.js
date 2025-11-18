
function GenerateRandomEmail() {
  const timestamp = Date.now();
  // Using a random string prefix to ensure uniqueness across test runs and avoid potential caching issues
  const randomString = Math.random().toString(36).substring(2, 7);
  return `testuser_${randomString}_${timestamp}@testdomain.com`;
}
function generateUniqueStoreName(baseName = "DutyFreeStore") {
  const timestamp = Date.now(); // current time in milliseconds
  return `${baseName}_${timestamp}`;
}
module.exports={generateUniqueStoreName};


// CRITICAL: Must use module.exports for the require() call on line 3 of your test file to succeed.
module.exports = {
  GenerateRandomEmail
};