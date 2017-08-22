import {ValidationRules} from 'aurelia-validation';

enum SocialProfileType {
  GITHUB = 'GitHub',
  TWITTER = 'Twitter',
}

export class SocialProfile {

  type: SocialProfileType = SocialProfileType.GITHUB;
  username = '';

  constructor() {
    ValidationRules
      .ensure('type')
        .required()
        .satisfies(value => this.types.indexOf(value) >= 0)
      .ensure('username')
        .required()
        .maxLength(100)
      .on(this);
  }

  static fromObject(src: SocialProfile) {
    return Object.assign(new SocialProfile, src);
  }

  get types() {
    return Object.values(SocialProfileType);
  }
}

