define([
  'jquery',
  'underscore',
  'ajax',
  'config/about',
  'text!amd/about.ejs',
  'text!amd/about-aside.ejs'
], function ($, _, ajax, aboutCONFIG, aboutEJS, asideEJS) {

  var getDeep = function (obj, prop) {
    if (_.isArray(prop)) {
      var cur = obj;
      for (var i = 0; i < prop.length; i += 1) {
        cur = cur[prop[i]];
      }
      return cur;
    } else {
      return obj[prop];
    }
  };

  return new function () {
    var self = this,
        temp = _.template(aboutEJS),
        asideTemp = _.template(asideEJS);

    this.loadStats = function () {

      var urls = _.reduce(aboutCONFIG.stats, function (memo, stat, i) {
        if (_.has(stat, 'fetch')) {
          if (!_.has(memo, stat.fetch.url)) {
            memo[stat.fetch.url] = {};
          }
          memo[stat.fetch.url][i] = stat.fetch.prop;
        }
        return memo;
      }, {});

      _.each(urls, function (props, url) {
        ajax({
          url   : url,
          expect: 'json'
        }).then(function (response) {
          _.each(props, function (prop, i) {
            var stat = aboutCONFIG.stats[parseInt(i)];
            self.$el.find('li[data-name="' + stat.name + '"] .value').html(
              stat.value(getDeep(response, prop))
            )
          });
        });
      });

    };

    this.render = function () {
      var $el = $(temp(_.extend({
        aside: asideTemp(aboutCONFIG)
      }, aboutCONFIG))),
          $externEl = $(asideTemp(aboutCONFIG));
      $('body > main > section[data-page="about"]').append($el);
      this.bind($el);
    };

    this.bind = function ($el) {
      this.$el = $el;
      this.loadStats();
    };

  };

});