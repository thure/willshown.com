define([
  'moment'
], function(moment){

  var birthday = moment('3 August 1988', 'D MMMM YYYY'),
      ageInFortnights = Math.round(moment().diff(birthday, 'days') / 14);

  return {
    stats: [
      {
        name: 'Cognitive style',
        value: 'INTP'
      },
      {
        name: 'Age in fortnights',
        value: ageInFortnights
      },
      {
        name: 'Height in cm',
        value: 191
      }
    ],
    links: [
      {
        big: true,
        link: 'email',
        href: 'mailto:w@willshown.com'
      },
      {
        big: true,
        link: 'phone',
        href: 'tel:+17073569455'
      },
      {
        link: 'linkedin',
        href: 'https://www.linkedin.com/in/willshown'
      },
      {
        link: 'twitter',
        href: 'https://twitter.com/wwwillshown'
      },
      {
        link: 'instagram',
        href: 'http://instagram.com/willhig'
      },
      {
        link: 'github',
        href: 'https://github.com/thure'
      },
      {
        link: 'stackoverflow',
        href: 'http://stackoverflow.com/users/392113/thure'
      },
      {
        link: 'lastfm',
        href: 'http://www.last.fm/user/willhig'
      }
    ]
  };

});