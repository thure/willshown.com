define([
  'underscore',
  'moment'
], function (_, moment) {

  var birthday = moment('3 August 1988', 'D MMMM YYYY'),
      ageInFortnights = Math.round(moment().diff(birthday, 'days') / 14);

  return {
    stats : [
      {
        name : 'Cognitive style',
        value: 'INTP'
      },
      {
        name : 'Age in fortnights',
        value: ageInFortnights
      },
      {
        name : 'Height in cm',
        value: 191
      },
      {
        name : 'Hireable',
        value: function (val) {
          return val ? 'Yes' : 'Not at the moment'
        },
        fetch: {
          url : 'https://api.github.com/users/thure',
          prop: 'hireable'
        }
      },
      {
        name : 'Living in',
        value: 'Seattle'
      }
    ],
    résumé: [
      {
        role : 'UI Engineer',
        group: 'Stand In',
        start: 'October 2014',
        end  : 'December 2014',
        notes: [
          'Assisted in the development of Stand In’s standalone design prototyping&nbsp;tool'
        ]
      },
      {
        role : 'UX Designer II',
        group: 'Microsoft OSD: AppEx, ICE, and MSN',
        start: 'January 2013',
        end  : 'October 2014',
        notes: [
          'Contributed interaction and motion designs through prototypes of the design team’s&nbsp;vision',
          'Spearheaded the team’s transition from static design to responsive&nbsp;design',
          'Created an editable point-of-reference prototype by which the design team delivered their&nbsp;designs',
          'Led workshops on responsive design and interaction&nbsp;design',
          'Led UI development and assisted in the design of a special R&D project for Windows&nbsp;10'
        ]
      },
      {
        role : 'Lead UX Designer & UI Engineer',
        group: 'Dressler LLC',
        start: 'June 2012',
        end  : 'November 2012',
        notes: [
          'Led design and development of the company’s first web&nbsp;app',
          'Created responsive media-rich brochureware&nbsp;websites'
        ]
      },
      {
        role : 'UI Engineer',
        group: 'Apigee',
        start: 'September 2011',
        end  : 'June 2012',
        notes: [
          'Prototyped and assisted in the design and development of Apigee’s enterprise web&nbsp;application'
        ]
      },
      {
        role : 'UI Engineer',
        group: 'Townhog',
        start: 'March 2011',
        end  : 'August 2011',
        notes: [
          'Engineered  email templates and editions of TownHog’s daily deal features for pixel-perfect display on all&nbsp;browsers'
        ]
      },
      {
        role : 'Volunteer Web Developer',
        group: 'Queer McGill',
        start: 'September 2008',
        end  : 'April 2010',
        notes: [
          'Designed and developed Queer McGill’s first web application for coordinating with its constituency and planning&nbsp;events'
        ]
      }
    ],
    links : [
      [
        {
          link: 'email',
          alt : 'Email',
          href: 'mailto:w@willshown.com'
        },
        {
          link   : 'phone',
          alt    : 'Call',
          href   : '#',
          onclick: 'window.dialPhone(event)'
        }
      ],
      [
        {
          link: 'linkedin',
          alt : 'LinkedIn',
          href: 'https://www.linkedin.com/in/willshown'
        },
        {
          link: 'twitter',
          alt : 'Twitter',
          href: 'https://twitter.com/wwwillshown'
        },
        {
          link: 'instagram',
          alt : 'Instagram',
          href: 'http://instagram.com/willhig'
        }
      ],
      [
        {
          link: 'github',
          alt : 'Github',
          href: 'https://github.com/thure'
        },
        {
          link: 'stackoverflow',
          alt : 'StackOverflow',
          href: 'http://stackoverflow.com/users/392113/thure'
        },
        {
          link: 'lastfm',
          alt : 'Last.fm',
          href: 'http://www.last.fm/user/willhig'
        }
      ]
    ]
  };

});