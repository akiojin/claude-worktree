#!/usr/bin/env node

import('../dist/index.js').then(module => {
  module.main().catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
});