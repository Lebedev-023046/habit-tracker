export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'scope-empty': [0],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
  },
  prompt: {
    messages: {
      type: 'Select the commit type (feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert)',
      scope: 'Add a scope (optional):',
      subject: 'Describe the changes (short):',
    },
  },
};
