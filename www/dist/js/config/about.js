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
        alt: 'Email',
        href: 'mailto:w@willshown.com'
      },
      {
        big: true,
        link: 'phone',
        alt: 'Call',
        href: '#',
        onclick: 'window.dialPhone(event)'
      },
      {
        link: 'linkedin',
        alt: 'LinkedIn',
        href: 'https://www.linkedin.com/in/willshown'
      },
      {
        link: 'twitter',
        alt: 'Twitter',
        href: 'https://twitter.com/wwwillshown'
      },
      {
        link: 'instagram',
        alt: 'Instagram',
        href: 'http://instagram.com/willhig'
      },
      {
        link: 'github',
        alt: 'Github',
        href: 'https://github.com/thure'
      },
      {
        link: 'stackoverflow',
        alt: 'StackOverflow',
        href: 'http://stackoverflow.com/users/392113/thure'
      },
      {
        link: 'lastfm',
        alt: 'Last.fm',
        href: 'http://www.last.fm/user/willhig'
      }
    ]
  };

});