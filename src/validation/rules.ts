import {ValidationRules} from 'aurelia-validation';

ValidationRules.customRule(
  'date',
  value => value === null || value === undefined || value === ''
    || !isNaN(Date.parse(value)),
  '${$displayName} must be a valid date.'
);

ValidationRules.customRule(
  'notEmpty',
  value => value && value.length && value.length > 0,
  '${$displayName} must contain at least one item.'
);

ValidationRules.customRule(
  'maxFileSize',
  (value, obj, maxMegabyte) => !(value instanceof FileList)
    || value.length === 0
    || Array.from(value).every(file => file.size <= maxMegabyte * 1024 ** 2),
  '${$displayName} must be smaller than ${$config.maxMegabyte} MB.',
  maxMegabyte => ({ maxMegabyte })
);

function hasOneOfExtensions(file: File, extensions: string[]) {
  const fileName = file.name.toLowerCase();
  return extensions.some(ext => fileName.endsWith(ext));
}

function allHaveOneExtensions(files: FileList, extensions: string[]) {
  extensions = extensions.map(ext => ext.toLowerCase());
  return Array.from(files).every(file => hasOneOfExtensions(file, extensions));
}

ValidationRules.customRule(
  'fileExtension',
  (value, obj, extensions) => !(value instanceof FileList)
    || value.length === 0
    || allHaveOneExtensions(value, extensions),
  '${$displayName} must have one of the following extensions: '
    + '${$config.extensions.join(\', \')}.',
  extensions => ({ extensions })
);
