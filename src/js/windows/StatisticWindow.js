class StatisticWindow {

  createWindow() {
    this.botStatisticWindow = WindowFactory.createWindow({
      width: 320,
      text: chrome.i18n.getMessage("statistic")
    });
    this.connected = false;

    let defaultStat = {
      startTime: new Date(),
      credits: 0,
      uridium: 0,
      energy: 0,
      ammo: 0,
      experience: 0,
      honor: 0,
      rank: 0,
      death: 0,
      speed: 0,
    };

    this.stats = Object.assign({}, defaultStat);

    let options = [{
        name: 'startTime',
        labelText: chrome.i18n.getMessage("startat"),
        spanText: this.stats.startTime.toLocaleString(navigator.languages[0]),
        appendTo: this.botStatisticWindow
      },
      {
        name: 'credits',
        labelText: chrome.i18n.getMessage("credits"),
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'uridium',
        labelText: chrome.i18n.getMessage("uridium"),
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'energy',
        labelText: chrome.i18n.getMessage("ggenergy"),
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'ammo',
        labelText: chrome.i18n.getMessage("ammo"),
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'experience',
        labelText: chrome.i18n.getMessage("experiencie"),
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'honor',
        labelText: chrome.i18n.getMessage("honor"),
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'rank',
        labelText: chrome.i18n.getMessage("rank"),
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'death',
        labelText: chrome.i18n.getMessage("death"),
        spanText: '0',
        appendTo: this.botStatisticWindow
      },
      {
        name: 'speed',
        labelText: chrome.i18n.getMessage("speed"),
        spanText: '0.00 uri/min.',
        appendTo: this.botStatisticWindow
      },{
        name: 'runtime',
        labelText: chrome.i18n.getMessage("runtime"),
        spanText: '00:00:00',
        appendTo: this.botStatisticWindow
      }
    ];

    options.forEach((option) => {
      this[option.name] = ControlFactory.info(option);
    });

    this.resetBtn = ControlFactory.btn({
      labelText: chrome.i18n.getMessage("reset"),
      appendTo: ControlFactory.emptyDiv(this.botStatisticWindow)
    });

    let standardListeners = [{
        event: 'addCredits',
        el: 'credits',
        detailEl: 'credits'
      },
      {
        event: 'addUridium',
        el: 'uridium',
        detailEl: 'uridium'
      },
      {
        event: 'addGgEnergy',
        el: 'energy',
        detailEl: 'energy'
      },
      {
        event: 'addAmmo',
        el: 'ammo',
        detailEl: 'ammo'
      },
      {
        event: 'addExperience',
        el: 'experience',
        detailEl: 'experience'
      },
      {
        event: 'addHonor',
        el: 'honor',
        detailEl: 'honor'
      },
      {
        event: 'deathCounter',
        el: 'death',
        detailEl: 'death'
      }
    ];

    standardListeners.forEach((item) => {
      this.setStandardEventListener(item);
    });

    $(this.resetBtn).on('click', (ev) => {
      ev.preventDefault(ev);

      this.stats = Object.assign({}, defaultStat);
      this.stats.startTime = new Date();

      Object.keys(this.stats).forEach((item) => {
        let el = $('span:last-child', this[item]);

        if ('startTime' == item) {
          el.html(this.stats[item].toLocaleString(navigator.languages[0]));
        } else {
          if ('death' == item) {
            el.html(parseInt(window.reviveCount));
          } else {
            el.html(this.stats[item]);
          }
        }
      });
    });

    $(window).on('connection', (e) => {
      this.connected = e.detail.connected;
    });

    $(window).on('logicEnd', () => {
      if (this.connected) {

        $('span:last-child', this.runtime).text(TimeHelper.diff(this.stats.startTime));

        $('span:last-child', this.speed).text(this.speedFormat(this.stats.uridium, this.stats.startTime));
      }
    });
  }

  speedFormat(uri, startTime) {

    let timeMinutes = TimeHelper.totalMinutes(startTime);
    let curFormat = window.globalSettings.speedFormat;

    let formats = {
      min: (uri / timeMinutes).toFixed(2),
      hour: ((uri / timeMinutes) * 60).toFixed(2),
    };

    let result = uri > 0 & timeMinutes > 0 ? formats[curFormat] : '0.00';
    result += `  uri/${curFormat}`;

    return result;
  }

  setStandardEventListener({
    event,
    el,
    detailEl
  }) {
    let htmlEl = this[el];
    $(window).on(event, (e) => {
      let el = $('span:last-child', htmlEl);
      if (detailEl == "experience") {
        this.stats.rank += parseInt(e.detail[detailEl]) / 10000;
        this.rank.text(chrome.i18n.getMessage("rank") + Math.floor(this.stats.rank));
      } else if (detailEl == "honor") {
        this.stats.rank += parseInt(e.detail[detailEl]) / 100;
        this.rank.text(chrome.i18n.getMessage("rank") + Math.floor(this.stats.rank));
      }
      this.stats[detailEl] += parseInt(e.detail[detailEl]);
      let collected = this.stats[detailEl];
      el.text(collected);
    });
  }
}