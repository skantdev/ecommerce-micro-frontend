module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Formatting
        'refactor', // Code refactoring
        'test',     // Tests
        'chore',    // Maintenance
        'perf',     // Performance
        'ci',       // CI/CD
        'build',    // Build system
        'revert',   // Revert commit
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'host',
        'auth',
        'home',
        'products',
        'cart',
        'checkout',
        'orders',
        'profile',
        'admin',
        'ui',
        'hooks',
        'utils',
        'types',
        'theme',
        'store',
        'api',
        'config',
        'constants',
        'deps',
        'docs',
        'ci',
      ],
    ],
    'subject-case': [0],
    'subject-max-length': [2, 'always', 100],
  },
};
