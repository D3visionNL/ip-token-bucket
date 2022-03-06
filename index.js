// Require dependencies
const TokenBucket = require("./lib/TokenBucket");

// Main class
class IPTokenBucket {
  constructor(capacity, fillPerSecond) {
    this.buckets = new Map();
    this.capacity = capacity || 5;
    this.fillPerSecond = fillPerSecond || 1;
  }

  // Take a token out of IP's bucket
  take(ipAddress) {
    // Check if ip doesn't have a bucket yet
    if (!this.buckets.has(ipAddress)) {
      // Set a new bucket for ip
      this.buckets.set(
        ipAddress,
        new TokenBucket(this.capacity, this.fillPerSecond)
      );
    }

    // Get ip's bucket
    const bucketForIP = this.buckets.get(ipAddress);

    // Return take value (boolean)
    return bucketForIP.take();
  }
}

// Export class
module.exports = IPTokenBucket;
